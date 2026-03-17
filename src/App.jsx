import { useState } from 'react'

const LINKS = {
  blueprint: 'https://blueprint.realstack.app?theme=dark',
  pricepoint: 'https://blueprint.realstack.app?mode=pricepoint&theme=dark',
  calendly: 'https://calendly.com/chrisgranger',
  substack: 'https://chrisgranger.substack.com',
  apply: 'https://2179191.my1003app.com/952015/register',
  email: 'mailto:cgranger@xperthomelending.com',
  phone: 'tel:4159878489',
  yelp: 'https://www.yelp.com/biz/chris-granger-xpert-home-lending-san-francisco-2',
  google: 'https://www.google.com/maps/place/Chris+Granger+-+Xpert+Home+Lending/@37.7737537,-122.2764211,17z/data=!4m8!3m7!1s0x808f81f3a067ec4d:0x41aad9cf5c9a7c9f!8m2!3d37.7737537!4d-122.2764211!9m1!1b1!16s%2Fg%2F11h5s4x2qy',
  experience: 'https://www.experience.com/reviews/chris-granger',
  zillow: 'https://www.zillow.com/lender-profile/chr1stogranger/',
  linkedin: 'https://www.linkedin.com/in/christogranger/',
}

const Icons = {
  Blueprint: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  Target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Home: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Dollar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ShieldCheck: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  Refresh: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Key: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  CreditCard: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-2px',marginRight:'6px'}}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Bolt: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Person: () => <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: 'Buying a Home', message: '' })
  const [formStatus, setFormStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return setFormStatus('error')
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', interest: 'Buying a Home', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch { setFormStatus('error') }
    setTimeout(() => setFormStatus(null), 5000)
  }

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="logo" onClick={() => scrollTo('hero')}>
            <svg viewBox="0 0 100 100" fill="none" style={{width:32,height:32,borderRadius:7,overflow:'hidden',flexShrink:0}}>
              <defs><linearGradient id="rs-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient></defs>
              <rect width="100" height="100" fill="url(#rs-bg)"/>
              <polygon points="50,4 8,22 50,17 92,22" fill="rgba(255,255,255,0.95)"/>
              <polygon points="50,17 92,22 92,26 50,21" fill="rgba(255,255,255,0.48)"/>
              <polygon points="50,17 8,22 8,26 50,21" fill="rgba(255,255,255,0.68)"/>
              <polygon points="8,30 50,25 92,30 50,35" fill="rgba(255,255,255,0.90)"/>
              <polygon points="8,30 50,35 50,38 8,33" fill="rgba(255,255,255,0.58)"/>
              <polygon points="50,35 92,30 92,33 50,38" fill="rgba(255,255,255,0.40)"/>
              <polygon points="8,44 50,39 92,44 50,49" fill="rgba(255,255,255,0.70)"/>
              <polygon points="8,44 50,49 50,52 8,47" fill="rgba(255,255,255,0.45)"/>
              <polygon points="50,49 92,44 92,47 50,52" fill="rgba(255,255,255,0.28)"/>
              <polygon points="8,58 50,53 92,58 50,63" fill="rgba(255,255,255,0.50)"/>
              <polygon points="8,58 50,63 50,66 8,61" fill="rgba(255,255,255,0.32)"/>
              <polygon points="50,63 92,58 92,61 50,66" fill="rgba(255,255,255,0.18)"/>
              <polygon points="8,72 50,67 92,72 50,77" fill="rgba(255,255,255,0.34)"/>
              <polygon points="8,72 50,77 50,80 8,75" fill="rgba(255,255,255,0.20)"/>
              <polygon points="50,77 92,72 92,75 50,80" fill="rgba(255,255,255,0.10)"/>
            </svg>
            <span className="logo-text">Chris Granger</span>
            <span className="logo-divider">/</span>
            <span className="logo-sub">Mortgage</span>
          </div>
          <nav className="nav">
            <a onClick={() => scrollTo('about')}>About</a>
            <a onClick={() => scrollTo('loans')}>Programs</a>
            <a onClick={() => scrollTo('calculator')}>Calculator</a>
            <a onClick={() => scrollTo('pricepoint')}>PricePoint</a>
            <a onClick={() => scrollTo('reviews')}>Reviews</a>
            <a onClick={() => scrollTo('newsletter')}>Newsletter</a>
            <a onClick={() => scrollTo('agents')}>Agents</a>
            <a onClick={() => scrollTo('contact')} className="nav-cta">Get Started</a>
          </nav>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div style={{background:'var(--bg-elevated)',borderBottom:'1px solid var(--border)',padding:'16px 24px',display:'flex',flexDirection:'column',gap:'12px'}}>
            {['about','loans','calculator','pricepoint','reviews','newsletter','agents'].map(id => (
              <a key={id} onClick={() => scrollTo(id)} style={{color:'var(--text-secondary)',fontSize:'0.9rem',cursor:'pointer',textTransform:'capitalize'}}>{id === 'loans' ? 'Programs' : id}</a>
            ))}
            <a href={LINKS.apply} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{marginTop:'8px',textAlign:'center'}}>Get Started</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-aurora">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="hero-grid"></div>
        <div className="container animate">
          <div className="label" style={{marginBottom:'24px'}}>NMLS #952015 &middot; 8 States Licensed</div>
          <h1>Your mortgage,<br/><span className="gradient">simplified.</span></h1>
          <p className="subtitle">1,000+ loans closed. I built the tools that make every dollar visible — so you make the best decision on the biggest purchase of your life.</p>
          <div className="btn-group" style={{justifyContent:'center'}}>
            <a onClick={() => scrollTo('calculator')} className="btn btn-shimmer btn-lg" style={{cursor:'pointer'}}>Build Your Blueprint</a>
            <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">Schedule a Call &rarr;</a>
          </div>
          <div className="hero-badges">
            <div className="hero-chip"><div className="dot"></div>290+ Five-Star Reviews</div>
            <div className="hero-chip"><div className="dot" style={{background:'var(--amber)'}}></div>Best Broker, Alameda</div>
            <div className="hero-chip"><div className="dot" style={{background:'var(--blue)'}}></div>1,000+ Loans Closed</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-row">
            <div><h3>1,000+</h3><p>Loans Closed</p></div>
            <div><h3>13+</h3><p>Years</p></div>
            <div><h3>8</h3><p>States</p></div>
            <div><h3>5.0</h3><p>Yelp Rating</p></div>
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label">Why work with me</div>
            <div className="glow-line"></div>
            <h2>The mortgage process,<br/>fixed.</h2>
            <p>I heard from hundreds of clients that the process was broken. So I built the tools to make it simple.</p>
          </div>
          <div className="bento">
            <div className="bento-item span-2">
              <div className="bento-icon" style={{background:'rgba(99,102,241,0.08)'}}><Icons.Blueprint /></div>
              <h3>Mortgage Blueprint</h3>
              <p>My signature tool — a supercharged calculator that maps out every dollar of your loan. Payment breakdown, tax savings, amortization, investment analysis, and side-by-side comparisons. No other broker gives you this.</p>
              <a onClick={() => scrollTo('calculator')} className="card-link" style={{cursor:'pointer'}}>Open the Blueprint &rarr;</a>
            </div>
            <div className="bento-item">
              <div className="bento-icon" style={{background:'rgba(6,182,212,0.08)'}}><Icons.Target /></div>
              <h3>Full Transparency</h3>
              <p>Every fee, every cost, every dollar — matching your official Loan Estimate. No surprises at closing.</p>
            </div>
            <div className="bento-item">
              <div className="bento-icon" style={{background:'rgba(16,185,129,0.08)'}}><Icons.Users /></div>
              <h3>30+ Lenders</h3>
              <p>As a broker, I shop your loan across the whole wholesale market. Banks offer one product — I offer the best one.</p>
            </div>
            <div className="bento-item">
              <div className="bento-icon" style={{background:'rgba(245,158,11,0.08)'}}><Icons.Star /></div>
              <h3>PricePoint</h3>
              <p>A game that tests your real estate instincts with real MLS data. City leaderboards. Built for fun.</p>
              <a onClick={() => scrollTo('pricepoint')} className="card-link" style={{cursor:'pointer'}}>Play now &rarr;</a>
            </div>
            <div className="bento-item">
              <div className="bento-icon" style={{background:'rgba(139,92,246,0.08)'}}><Icons.Mail /></div>
              <h3>Three Point Thursday</h3>
              <p>Weekly newsletter: rates, market data, and strategies. Hundreds of Bay Area professionals read it every Thursday.</p>
              <a onClick={() => scrollTo('newsletter')} className="card-link" style={{cursor:'pointer'}}>Subscribe &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="section" style={{borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label">Reviews</div>
            <div className="glow-line"></div>
            <h2>What clients say</h2>
          </div>
          <div className="review-row">
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"His spreadsheet is incredible. Chris walked us through every detail step by step. We never felt lost or confused."</p><div className="review-meta"><div className="review-avatar">FH</div><div><p className="review-author">First-Time Homebuyer</p><p className="review-source">Yelp</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"Chris possesses an incredible ability to connect people with outstanding products, even when other mortgage lenders say no."</p><div className="review-meta"><div className="review-avatar">BH</div><div><p className="review-author">Bay Area Homeowner</p><p className="review-source">Google</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"His Blueprint tool showed us exactly where every dollar was going — no surprises at closing. AMAZING experience."</p><div className="review-meta"><div className="review-avatar">RC</div><div><p className="review-author">Repeat Client</p><p className="review-source">Yelp</p></div></div></div>
          </div>
          <div style={{textAlign:'center',marginTop:'32px'}}><a onClick={() => scrollTo('reviews')} className="btn btn-secondary" style={{cursor:'pointer'}}>Read all 290+ reviews &rarr;</a></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="aurora"></div>
        <div className="container">
          <h2>Ready to<br/><span className="gradient" style={{background:'linear-gradient(135deg,var(--accent-bright),var(--blue),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>map out your loan?</span></h2>
          <p>First-time buyer, move-up, investor — let's build your Blueprint.</p>
          <div className="btn-group" style={{justifyContent:'center'}}>
            <a onClick={() => scrollTo('calculator')} className="btn btn-accent btn-lg" style={{cursor:'pointer'}}>Build Your Blueprint &rarr;</a>
            <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">Schedule a Call</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid-v3">
            <div style={{aspectRatio:'1',borderRadius:'var(--radius-xl)',background:'var(--bg-card)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Icons.Person />
            </div>
            <div>
              <div className="label">About</div>
              <h2 style={{fontSize:'2.4rem',margin:'16px 0 20px'}}>Hi, I'm Chris.</h2>
              <p style={{color:'var(--text-secondary)',marginBottom:'16px',fontSize:'0.95rem',lineHeight:'1.7'}}>Mortgage broker since 2012. Over 1,000 loans. Based in the Bay Area. I built <strong style={{color:'var(--text-primary)'}}>Mortgage Blueprint</strong> because the industry was designed to confuse people — and I wanted to fix that.</p>
              <p style={{color:'var(--text-secondary)',marginBottom:'28px',fontSize:'0.95rem',lineHeight:'1.7'}}>As a broker (not a bank), I shop your loan across 30+ wholesale lenders. I'm not selling you a product — I'm building you a plan.</p>
              <div className="btn-group">
                <a onClick={() => scrollTo('contact')} className="btn btn-primary" style={{cursor:'pointer'}}>Work with me</a>
                <a onClick={() => scrollTo('calculator')} className="btn btn-secondary" style={{cursor:'pointer'}}>Try the Blueprint</a>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'24px'}}>
                {['CA','OR','WA','NV','AZ','CO','HI','TX'].map(s => (
                  <span key={s} className="program-tag" style={{background:'var(--bg-surface)',borderColor:'var(--border)',color:'var(--text-secondary)'}}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOAN PROGRAMS */}
      <section className="light-section" id="loans">
        <div className="container">
          <div className="section-header">
            <div className="label">Loan Programs</div>
            <div className="glow-line"></div>
            <h2>Find the right loan.</h2>
            <p>Dozens of lenders. Hundreds of products. Here are the ones I use most.</p>
          </div>
          <div className="program-grid">
            <div className="program-card"><h3><Icons.Home />Conventional</h3><p>Good credit, steady income. The workhorse loan.</p><div><span className="program-tag">3% down</span><span className="program-tag">Fixed & ARM</span><span className="program-tag">Up to $766K</span></div></div>
            <div className="program-card"><h3><Icons.Dollar />Jumbo</h3><p>Bay Area homes above conforming limits.</p><div><span className="program-tag">$766K+</span><span className="program-tag">IO available</span><span className="program-tag">Up to $3M+</span></div></div>
            <div className="program-card"><h3><Icons.Shield />FHA</h3><p>Flexible qualifying for first-time buyers.</p><div><span className="program-tag">3.5% down</span><span className="program-tag">580+ FICO</span><span className="program-tag">Gift funds OK</span></div></div>
            <div className="program-card"><h3><Icons.ShieldCheck />VA</h3><p>Zero-down for vets and active military.</p><div><span className="program-tag">$0 down</span><span className="program-tag">No MI</span><span className="program-tag">Competitive</span></div></div>
            <div className="program-card"><h3><Icons.Refresh />Refinance</h3><p>Lower rate, shorter term, cash out, drop PMI.</p><div><span className="program-tag">Rate & term</span><span className="program-tag">Cash-out</span><span className="program-tag">Streamline</span></div></div>
            <div className="program-card"><h3><Icons.Activity />Investment</h3><p>Single-family, multi-unit, DSCR loans.</p><div><span className="program-tag">DSCR</span><span className="program-tag">1-4 units</span><span className="program-tag">ROI analysis</span></div></div>
            <div className="program-card"><h3><Icons.Key />First-Time Buyer</h3><p>Programs to make Bay Area homeownership real.</p><div><span className="program-tag">DPA</span><span className="program-tag">3% down</span><span className="program-tag">Blueprint</span></div></div>
            <div className="program-card"><h3><Icons.CreditCard />Non-QM</h3><p>Self-employed, 1099, bank statements, foreign national.</p><div><span className="program-tag">Bank stmt</span><span className="program-tag">1099</span><span className="program-tag">Asset depletion</span></div></div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section" id="calculator" style={{textAlign:'center'}}>
        <div className="container">
          <div className="label">Mortgage Blueprint</div>
          <h2 style={{fontSize:'2.4rem',margin:'16px 0'}}>The calculator that<br/>shows <span className="gradient" style={{background:'linear-gradient(135deg,var(--accent-bright),var(--teal))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>everything.</span></h2>
          <p style={{color:'var(--text-secondary)',maxWidth:'500px',margin:'0 auto 32px'}}>Payment breakdown. Tax savings. Amortization. Side-by-side comparisons. The same tool I use with every client.</p>
          <div className="btn-group" style={{justifyContent:'center',marginBottom:'48px'}}>
            <a href={LINKS.blueprint} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Open in new tab &#8599;</a>
            <a onClick={() => scrollTo('contact')} className="btn btn-accent" style={{cursor:'pointer'}}>Get a custom Blueprint &rarr;</a>
          </div>
        </div>
        <div className="embed-placeholder" style={{height:'900px'}}>
          <iframe src={LINKS.blueprint} title="Mortgage Blueprint" allow="clipboard-write" loading="lazy" style={{width:'133.33%',height:'133.33%',transform:'scale(0.75)',transformOrigin:'top left',border:'none'}} />
        </div>
      </section>

      {/* PRICEPOINT */}
      <section className="section" id="pricepoint" style={{textAlign:'center',borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <div className="label">PricePoint</div>
          <h2 style={{fontSize:'2.4rem',margin:'16px 0'}}>Think you know<br/>Bay Area prices?</h2>
          <p style={{color:'var(--text-secondary)',maxWidth:'460px',margin:'0 auto 48px'}}>Real homes. Real MLS data. Guess the price. Compete on leaderboards.</p>
        </div>
        <div className="embed-placeholder">
          <iframe src={LINKS.pricepoint} title="PricePoint" allow="clipboard-write" loading="lazy" />
        </div>
      </section>

      {/* FULL REVIEWS */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-header">
            <div className="label">Client Reviews</div>
            <div className="glow-line"></div>
            <h2>290+ five-star reviews.</h2>
          </div>
          <div className="stats-row" style={{marginBottom:'48px'}}>
            <div><h3>5.0</h3><p>Rating</p></div>
            <div><h3>290+</h3><p>Reviews</p></div>
            <div><h3>100%</h3><p>5-Star</p></div>
            <div><h3>1K+</h3><p>Clients</p></div>
          </div>
          <div className="review-row">
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"His spreadsheet is incredible. Chris walked us through every detail step by step."</p><div className="review-meta"><div className="review-avatar">FH</div><div><p className="review-author">First-Time Buyer</p><p className="review-source">Yelp</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"Incredible ability to connect people with products, even when other lenders say no."</p><div className="review-meta"><div className="review-avatar">BH</div><div><p className="review-author">Homeowner</p><p className="review-source">Google</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"Blueprint showed us exactly where every dollar was going. No surprises."</p><div className="review-meta"><div className="review-avatar">RC</div><div><p className="review-author">Repeat Client</p><p className="review-source">Yelp</p></div></div></div>
          </div>
          <div className="review-row" style={{marginTop:'16px'}}>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"The only lender I trust with my clients. Communication is top-notch, tools are next-level."</p><div className="review-meta"><div className="review-avatar">SA</div><div><p className="review-author">SF Agent</p><p className="review-source">Yelp</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"Closed our jumbo in under 3 weeks when our lender dropped the ball. Saved our purchase."</p><div className="review-meta"><div className="review-avatar">SB</div><div><p className="review-author">SF Buyer</p><p className="review-source">Yelp</p></div></div></div>
            <div className="review-card"><div className="review-stars">★★★★★</div><p className="review-text">"Refinance analysis saved us $400/mo. Showed exactly when we'd break even. No one else came close."</p><div className="review-meta"><div className="review-avatar">OH</div><div><p className="review-author">Oakland Homeowner</p><p className="review-source">Yelp</p></div></div></div>
          </div>
          <div style={{textAlign:'center',marginTop:'32px',display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href={LINKS.experience} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">All 290+ reviews &rarr;</a>
            <a href={LINKS.yelp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Yelp &rarr;</a>
            <a href={LINKS.google} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Google &rarr;</a>
            <a href={LINKS.zillow} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Zillow &rarr;</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section" id="newsletter" style={{borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label">Newsletter</div>
            <div className="glow-line"></div>
            <h2>Three Point Thursday</h2>
            <p>Rates, market data, and strategies — every Thursday morning.</p>
          </div>
          <div className="newsletter-card">
            <h3 style={{fontSize:'1.2rem',fontWeight:'700',marginBottom:'12px',letterSpacing:'-0.02em'}}>Join hundreds of Bay Area pros</h3>
            <p style={{color:'var(--text-secondary)',fontSize:'0.88rem',marginBottom:'24px'}}>Three actionable insights. One email. Every Thursday.</p>
            <div style={{background:'var(--bg-base)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'24px',overflow:'hidden'}}>
              <iframe src="https://chrisgranger.substack.com/embed" width="100%" height="150" style={{border:'none',background:'transparent'}} title="Subscribe to Three Point Thursday" loading="lazy" />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginTop:'24px',textAlign:'left'}}>
              <div style={{padding:'16px',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <p style={{fontSize:'0.75rem',fontWeight:'700',marginBottom:'4px'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-1px',marginRight:'4px'}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  Rate Check
                </p>
                <p style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>Where rates are and where they're heading</p>
              </div>
              <div style={{padding:'16px',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <p style={{fontSize:'0.75rem',fontWeight:'700',marginBottom:'4px'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-1px',marginRight:'4px'}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  Market Data
                </p>
                <p style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>Analysis and trends that affect your wallet</p>
              </div>
              <div style={{padding:'16px',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <p style={{fontSize:'0.75rem',fontWeight:'700',marginBottom:'4px'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-1px',marginRight:'4px'}}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  Strategy
                </p>
                <p style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>Actionable tips you can use this week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENT RESOURCES */}
      <section className="section" id="agents" style={{borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label">For Agents</div>
            <div className="glow-line"></div>
            <h2>Your clients deserve<br/>better lending.</h2>
            <p>I built my business on agent partnerships. Here's how we work together.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card"><div className="icon"><Icons.Blueprint /></div><h3>Blueprint for clients</h3><p>Custom scenarios. Full payment breakdown. Your buyers walk into offers informed.</p></div>
            <div className="feature-card"><div className="icon"><Icons.Bolt /></div><h3>Fast pre-approvals</h3><p>Thorough review, not a rubber stamp. Listing agents trust my letters.</p></div>
            <div className="feature-card"><div className="icon"><Icons.Phone /></div><h3>Real-time updates</h3><p>Proactive communication at every milestone. No chasing.</p></div>
            <div className="feature-card"><div className="icon"><Icons.Star /></div><h3>PricePoint</h3><p>Use at open houses. Guests guess prices. Generates leads for both of us.</p></div>
            <div className="feature-card"><div className="icon"><Icons.Users /></div><h3>30+ lenders</h3><p>More approvals, better rates, creative solutions. First-time to $3M+ jumbo.</p></div>
            <div className="feature-card"><div className="icon"><Icons.Mail /></div><h3>TPT Newsletter</h3><p>Weekly talking points for buyer consultations. Stay sharp on rates.</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact" style={{borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label">Get Started</div>
            <div className="glow-line"></div>
            <h2>Let's map out<br/>your loan.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-side">
              <div className="contact-card">
                <h4>Phone</h4>
                <a href={LINKS.phone}>(415) 987-8489</a>
              </div>
              <div className="contact-card">
                <h4>Email</h4>
                <a href={LINKS.email}>cgranger@xperthomelending.com</a>
              </div>
              <div className="contact-card">
                <h4>Location</h4>
                <p>Alameda & San Francisco, CA</p>
              </div>
              <div className="contact-card" style={{background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(59,130,246,0.05))',borderColor:'rgba(99,102,241,0.2)'}}>
                <h4 style={{color:'var(--accent-light)'}}>Schedule a Call</h4>
                <p style={{marginBottom:'12px'}}>15-min discovery or 30-min deep dive.</p>
                <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{fontSize:'0.8rem',padding:'10px 20px',width:'100%',justifyContent:'center'}}>Open Calendly &rarr;</a>
              </div>
              <div className="contact-card">
                <h4>Ready to Apply?</h4>
                <p style={{marginBottom:'12px'}}>Secure online loan application.</p>
                <a href={LINKS.apply} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{fontSize:'0.8rem',padding:'10px 20px',width:'100%',justifyContent:'center'}}>Start Application</a>
              </div>
            </div>
            <form className="contact-form-card" onSubmit={handleSubmit}>
              <h3>Send a message</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name *</label>
                <input id="contact-name" className="form-input" type="text" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email *</label>
                  <input id="contact-email" className="form-input" type="email" placeholder="you@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone</label>
                  <input id="contact-phone" className="form-input" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-interest">Interested In</label>
                <select id="contact-interest" className="form-select" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                  <option>Buying a Home</option>
                  <option>Refinancing</option>
                  <option>Pre-Approval</option>
                  <option>Investment Property</option>
                  <option>Jumbo Loan</option>
                  <option>First-Time Buyer</option>
                  <option>Agent Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="form-textarea" placeholder="Tell me about your situation..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-accent btn-lg" style={{width:'100%',marginTop:'4px',border:'none',cursor:'pointer'}} disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : 'Send Message \u2192'}
              </button>
              {formStatus === 'success' && <p style={{fontFamily:'var(--mono)',fontSize:'0.75rem',color:'#10B981',textAlign:'center',marginTop:'12px'}}>Message sent! I'll be in touch shortly.</p>}
              {formStatus === 'error' && <p style={{fontFamily:'var(--mono)',fontSize:'0.75rem',color:'#EF4444',textAlign:'center',marginTop:'12px'}}>Something went wrong. Please try again or email me directly.</p>}
              {!formStatus && <p style={{fontFamily:'var(--mono)',fontSize:'0.6rem',color:'var(--text-muted)',textAlign:'center',marginTop:'12px'}}>Your information is encrypted and never shared.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo" style={{marginBottom:'4px'}}>
                <svg viewBox="0 0 100 100" fill="none" style={{width:28,height:28,borderRadius:6,overflow:'hidden',flexShrink:0}}>
                  <defs><linearGradient id="rs-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient></defs>
                  <rect width="100" height="100" fill="url(#rs-bg2)"/>
                  <polygon points="50,4 8,22 50,17 92,22" fill="rgba(255,255,255,0.95)"/>
                  <polygon points="50,17 92,22 92,26 50,21" fill="rgba(255,255,255,0.48)"/>
                  <polygon points="50,17 8,22 8,26 50,21" fill="rgba(255,255,255,0.68)"/>
                  <polygon points="8,30 50,25 92,30 50,35" fill="rgba(255,255,255,0.90)"/>
                  <polygon points="8,30 50,35 50,38 8,33" fill="rgba(255,255,255,0.58)"/>
                  <polygon points="50,35 92,30 92,33 50,38" fill="rgba(255,255,255,0.40)"/>
                  <polygon points="8,44 50,39 92,44 50,49" fill="rgba(255,255,255,0.70)"/>
                  <polygon points="8,44 50,49 50,52 8,47" fill="rgba(255,255,255,0.45)"/>
                  <polygon points="50,49 92,44 92,47 50,52" fill="rgba(255,255,255,0.28)"/>
                  <polygon points="8,58 50,53 92,58 50,63" fill="rgba(255,255,255,0.50)"/>
                  <polygon points="8,58 50,63 50,66 8,61" fill="rgba(255,255,255,0.32)"/>
                  <polygon points="50,63 92,58 92,61 50,66" fill="rgba(255,255,255,0.18)"/>
                  <polygon points="8,72 50,67 92,72 50,77" fill="rgba(255,255,255,0.34)"/>
                  <polygon points="8,72 50,77 50,80 8,75" fill="rgba(255,255,255,0.20)"/>
                  <polygon points="50,77 92,72 92,75 50,80" fill="rgba(255,255,255,0.10)"/>
                </svg>
                <span className="logo-text">Chris Granger</span>
              </div>
              <p>Bay Area mortgage broker. Alameda, San Francisco, and beyond. 1,000+ loans since 2012.</p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul className="footer-links">
                <li><a onClick={() => scrollTo('about')} style={{cursor:'pointer'}}>About</a></li>
                <li><a onClick={() => scrollTo('loans')} style={{cursor:'pointer'}}>Loan Programs</a></li>
                <li><a onClick={() => scrollTo('calculator')} style={{cursor:'pointer'}}>Calculator</a></li>
                <li><a onClick={() => scrollTo('pricepoint')} style={{cursor:'pointer'}}>PricePoint</a></li>
                <li><a onClick={() => scrollTo('reviews')} style={{cursor:'pointer'}}>Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a onClick={() => scrollTo('newsletter')} style={{cursor:'pointer'}}>Three Point Thursday</a></li>
                <li><a onClick={() => scrollTo('agents')} style={{cursor:'pointer'}}>Agent Resources</a></li>
                <li><a onClick={() => scrollTo('contact')} style={{cursor:'pointer'}}>Contact</a></li>
                <li><a href={LINKS.calendly} target="_blank" rel="noopener noreferrer">Calendly</a></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul className="footer-links">
                <li><a href={LINKS.phone}>(415) 987-8489</a></li>
                <li><a href={LINKS.email}>cgranger@xperthomelending.com</a></li>
                <li style={{marginTop:'6px'}}>
                  <a href={LINKS.yelp} target="_blank" rel="noopener noreferrer" style={{marginRight:'10px'}}>Yelp</a>
                  <a href={LINKS.google} target="_blank" rel="noopener noreferrer" style={{marginRight:'10px'}}>Google</a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{marginRight:'10px'}}>LinkedIn</a>
                  <a href={LINKS.substack} target="_blank" rel="noopener noreferrer">Substack</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Chris Granger &middot; Xpert Home Lending</span>
            <span style={{fontFamily:'var(--mono)'}}>NMLS #952015</span>
          </div>
          <div className="footer-legal">Licensed mortgage broker (NMLS #952015) operating through Xpert Home Lending, Inc. Licensed in CA, OR, WA, NV, AZ, CO, HI, TX. All loans subject to credit approval. Equal Housing Lender.</div>
        </div>
      </footer>
    </>
  )
}
