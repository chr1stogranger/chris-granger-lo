/**
 * /api/contact.js: handles the website contact form and emails the lead via Resend.
 *
 * Env vars (set in Vercel > Settings > Environment Variables):
 *   RESEND_API_KEY  (required) Resend API key for the realstack.app sending domain
 *   CONTACT_TO      (optional) inbox that receives leads, defaults to cgranger@xperthomelending.com
 */

const FROM = 'Chris Granger Website <blueprint@realstack.app>'
const DEFAULT_TO = 'cgranger@xperthomelending.com'

// In-memory per-IP rate limit (per lambda instance, enough to stop naive flooding).
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 min
const RATE_MAX = 5
const rateMap = new Map()
function rateLimited(ip) {
  const now = Date.now()
  if (rateMap.size > 5000) rateMap.clear() // cap memory
  const entry = rateMap.get(ip)
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { start: now, count: 1 })
    return false
  }
  entry.count++
  return entry.count > RATE_MAX
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(v, max) {
  return (typeof v === 'string' ? v : '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    res.setHeader('Retry-After', '600')
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const body = req.body || {}

  // Honeypot: humans never see this field. Bots fill it. Pretend success.
  if (body.company && String(body.company).trim()) {
    return res.status(200).json({ ok: true })
  }

  const name = clean(body.name, 100)
  const email = clean(body.email, 254)
  const phone = clean(body.phone, 30)
  const interest = clean(body.interest, 60) || 'General'
  const message = (typeof body.message === 'string' ? body.message : '').trim().slice(0, 2000)

  if (!name) return res.status(400).json({ error: 'Name is required' })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY not configured')
    return res.status(503).json({ error: 'not_configured' })
  }
  const to = process.env.CONTACT_TO || DEFAULT_TO

  const subject = `New website lead: ${name} (${interest})`
  const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eef0f4;color:#737373;font-size:12px;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eef0f4;color:#171717;font-size:15px">${value}</td>
    </tr>`

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f4f5f8;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px">
    <div style="background:#0a1120;border-radius:12px 12px 0 0;padding:18px 24px;color:#ffffff;font-weight:700;font-size:16px;letter-spacing:-0.02em">
      Chris Granger <span style="color:#3B6BF5">/</span> New website lead
    </div>
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:8px 10px 18px">
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', esc(name))}
        ${row('Email', `<a href="mailto:${esc(email)}" style="color:#3B6BF5;text-decoration:none">${esc(email)}</a>`)}
        ${row('Phone', phone ? esc(phone) : '<span style="color:#a3a3a3">Not provided</span>')}
        ${row('Interest', esc(interest))}
        ${row('Message', message ? esc(message).replace(/\n/g, '<br>') : '<span style="color:#a3a3a3">No message</span>')}
        ${row('Submitted', esc(submitted) + ' PT')}
      </table>
      <p style="margin:16px 14px 0;color:#737373;font-size:12px">Reply to this email to respond directly to ${esc(name)}.</p>
    </div>
  </div>
</body></html>`

  const text = [
    `New website lead: ${name} (${interest})`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Interest: ${interest}`,
    `Message: ${message || 'No message'}`,
    `Submitted: ${submitted} PT`,
  ].join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM, to: [to], reply_to: email, subject, html, text }),
    })
    if (!r.ok) {
      const j = await r.json().catch(() => ({}))
      console.error('[contact] Resend error:', r.status, j)
      return res.status(502).json({ error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Fetch error:', err.message)
    return res.status(500).json({ error: 'send_failed' })
  }
}
