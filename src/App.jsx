import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// ── Brand Kit ──
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'JetBrains Mono', 'SF Mono', monospace";
const C = {
  bg: "#050505", card: "#0F0F0F", elevated: "#0A0A0A", surface: "#1A1A1A",
  text: "#EDEDED", textSec: "#A1A1A1", textMuted: "#666666",
  border: "rgba(255,255,255,0.06)", borderHover: "rgba(255,255,255,0.12)",
  indigo: "#6366F1", indigoLight: "#818CF8", blue: "#3B82F6",
  teal: "#06B6D4", green: "#10B981", orange: "#F59E0B", red: "#EF4444",
  purple: "#8B5CF6",
};

// ── Links ──
const LINKS = {
  blueprint: "https://mortgageblueprint.app",
  pricepoint: "https://mortgageblueprint.app", // PricePoint is inside Blueprint
  calendly: "https://calendly.com/teamgranger",
  substack: "https://threepointthursday.substack.com",
  email: "mailto:cgranger@focusmortgage.com",
  apply: "https://arive.com", // Arive LOS application link
  focusMortgage: "https://focusmortgage.com",
  nmls: "https://www.nmlsconsumeraccess.org/TuringTestPage.aspx?ReturnUrl=/EntityDetails.aspx/COMPANY/952015",
};

// ── Shared Components ──
const Nav = () => {
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => setMenuOpen(false), [loc]);
  const navLinks = [
    ["/", "Home"], ["/blueprint", "Blueprint"], ["/pricepoint", "PricePoint"],
    ["/newsletter", "Newsletter"], ["/about", "About"],
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>CG</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Chris Granger</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: C.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: MONO }}>Focus Mortgage</div>
          </div>
        </Link>
        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="desktop-nav">
          {navLinks.map(([to, label]) => (
            <Link key={to} to={to} style={{ padding: "6px 14px", fontSize: 13, fontWeight: loc.pathname === to ? 700 : 500,
              color: loc.pathname === to ? C.text : C.textSec, textDecoration: "none", borderRadius: 8,
              background: loc.pathname === to ? "rgba(255,255,255,0.06)" : "transparent", transition: "all 0.2s" }}>{label}</Link>
          ))}
          <a href={LINKS.apply} target="_blank" rel="noopener" style={{ marginLeft: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600,
            background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, color: "#fff", textDecoration: "none",
            borderRadius: 9999, boxShadow: `0 0 20px rgba(99,102,241,0.3)`, transition: "all 0.2s" }}>Apply Now</a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ background: "none", border: "none", color: C.text, fontSize: 24, cursor: "pointer", padding: 4, display: "none" }}>
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-dropdown" style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(([to, label]) => (
            <Link key={to} to={to} style={{ padding: "12px 16px", fontSize: 15, fontWeight: 600, color: loc.pathname === to ? C.indigo : C.text,
              textDecoration: "none", borderRadius: 10, background: loc.pathname === to ? `${C.indigo}15` : "transparent" }}>{label}</Link>
          ))}
          <a href={LINKS.apply} target="_blank" rel="noopener" style={{ marginTop: 8, padding: "14px 20px", fontSize: 15, fontWeight: 700, textAlign: "center",
            background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, color: "#fff", textDecoration: "none", borderRadius: 12 }}>Apply Now</a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer style={{ background: C.elevated, borderTop: `1px solid ${C.border}`, padding: "60px 24px 40px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 12 }}>Chris Granger</div>
          <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.8 }}>
            Mortgage Broker<br />
            Focus Mortgage<br />
            <span style={{ fontFamily: MONO, fontSize: 11, color: C.textMuted }}>NMLS #952015</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: MONO, marginBottom: 12 }}>Tools</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link to="/blueprint" style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>Mortgage Blueprint</Link>
            <Link to="/pricepoint" style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>PricePoint</Link>
            <a href={LINKS.apply} target="_blank" rel="noopener" style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>Apply Online</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: MONO, marginBottom: 12 }}>Connect</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href={LINKS.email} style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>cgranger@focusmortgage.com</a>
            <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>Schedule a Call</a>
            <a href={LINKS.substack} target="_blank" rel="noopener" style={{ fontSize: 13, color: C.textSec, textDecoration: "none" }}>Three Point Thursday</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: MONO, marginBottom: 12 }}>Licensed In</div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.8, fontFamily: MONO }}>CA · OR · WA · NV · AZ · CO · HI · TX</div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6, maxWidth: 700 }}>
          This is not a commitment to lend. All loan programs, rates, terms, and conditions are subject to change without notice. Equal Housing Lender.
          <a href={LINKS.nmls} target="_blank" rel="noopener" style={{ color: C.textMuted, marginLeft: 4 }}>NMLS Consumer Access</a>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted }}>&copy; {new Date().getFullYear()} Chris Granger · Focus Mortgage</div>
      </div>
    </div>
  </footer>
);

const Pill = ({ children, color = C.indigo }) => (
  <span style={{ display: "inline-block", padding: "4px 12px", fontSize: 11, fontWeight: 600, fontFamily: MONO,
    letterSpacing: 1.5, textTransform: "uppercase", color, background: `${color}15`, borderRadius: 9999 }}>{children}</span>
);

const SectionTitle = ({ pill, title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: 48 }}>
    {pill && <div style={{ marginBottom: 12 }}><Pill>{pill}</Pill></div>}
    <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: C.text, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>{title}</h2>
    {sub && <p style={{ fontSize: 16, color: C.textSec, marginTop: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

const ToolCard = ({ title, desc, href, linkText, color = C.indigo, internal }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 24px",
    transition: "all 0.2s", cursor: "pointer" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
    </div>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>{title}</h3>
    <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: "0 0 16px" }}>{desc}</p>
    {internal ? (
      <Link to={href} style={{ fontSize: 13, fontWeight: 600, color, textDecoration: "none" }}>{linkText} &rarr;</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener" style={{ fontSize: 13, fontWeight: 600, color, textDecoration: "none" }}>{linkText} &rarr;</a>
    )}
  </div>
);

// ── Pages ──
const Home = () => (
  <>
    {/* HERO */}
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.indigo}15, transparent 70%)`, filter: "blur(80px)" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}10, transparent 70%)`, filter: "blur(80px)" }} />
      <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
        <Pill color={C.green}>Licensed in CA, OR, WA, NV, AZ, CO, HI, TX</Pill>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 900, color: C.text, letterSpacing: "-0.05em", lineHeight: 1.05, margin: "24px 0 16px" }}>
          Your mortgage,{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.indigoLight}, ${C.blue}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>made clear.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: C.textSec, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 36px" }}>
          I'm Chris Granger, a mortgage broker based in Alameda serving the San Francisco Bay Area.
          I build tools that turn confusing loan numbers into a clear plan.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/blueprint" style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700, color: "#fff",
            background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, borderRadius: 9999, textDecoration: "none",
            boxShadow: `0 0 30px rgba(99,102,241,0.3)`, transition: "all 0.2s" }}>Open Blueprint</Link>
          <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700,
            color: C.text, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none", transition: "all 0.2s" }}>Schedule a Call</a>
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: C.textMuted, fontFamily: MONO }}>NMLS #952015 · Focus Mortgage</div>
      </div>
    </section>

    {/* TOOLS SECTION */}
    <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle pill="Tools" title="Everything you need in one place" sub="Interactive tools I built to help you understand every number in your home purchase or refinance." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <ToolCard title="Mortgage Blueprint" desc="The supercharged mortgage calculator. See your full payment breakdown, costs to close, qualification check, tax savings, and amortization — all in real time." href="/blueprint" linkText="Open Blueprint" color={C.blue} internal />
        <ToolCard title="PricePoint" desc="A gamified real estate challenge. Guess home prices in your market, sharpen your eye, and compete on the leaderboard." href="/pricepoint" linkText="Play PricePoint" color={C.teal} internal />
        <ToolCard title="Three Point Thursday" desc="My weekly mortgage, real estate, and business newsletter. Market updates, strategy tips, and rate analysis every Thursday." href="/newsletter" linkText="Read the Newsletter" color={C.purple} internal />
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section style={{ padding: "80px 24px", background: C.elevated }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle pill="Process" title="How we work together" sub="From first conversation to closing day, here's what to expect." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {[
            ["01", "Discovery Call", "We hop on a quick call to understand your goals, timeline, and financial picture.", C.indigo],
            ["02", "Your Blueprint", "I build a personalized Mortgage Blueprint showing every number — payment, costs, qualification, and tax savings.", C.blue],
            ["03", "Get Pre-Approved", "With your Blueprint dialed in, we submit your application through Arive for a fast, smooth pre-approval.", C.teal],
            ["04", "Close with Confidence", "I quarterback the process from contract to keys, keeping you informed at every milestone.", C.green],
          ].map(([num, title, desc, color]) => (
            <div key={num} style={{ padding: "24px 20px" }}>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: MONO, color: `${color}40`, marginBottom: 12 }}>{num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle pill="Services" title="Loan programs for every situation" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {["Conventional", "FHA", "VA", "Jumbo", "USDA", "Bank Statement", "DSCR (Investor)", "Refinance", "HELOC", "Construction"].map(p => (
          <div key={p} style={{ padding: "16px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{p}</div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "80px 24px", background: C.elevated }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: C.text, letterSpacing: "-0.04em", margin: "0 0 16px" }}>Ready to get started?</h2>
        <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.6, marginBottom: 32 }}>
          Whether you're buying your first home, refinancing, or investing — let's build your Blueprint and map out a plan.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={LINKS.apply} target="_blank" rel="noopener" style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700, color: "#fff",
            background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, borderRadius: 9999, textDecoration: "none",
            boxShadow: `0 0 20px rgba(99,102,241,0.3)` }}>Apply Now</a>
          <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700,
            color: C.text, border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none" }}>Schedule a Call</a>
          <a href={LINKS.email} style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700,
            color: C.text, border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none" }}>Email Me</a>
        </div>
      </div>
    </section>
  </>
);

const BlueprintPage = () => (
  <section style={{ paddingTop: 80 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 0" }}>
      <SectionTitle pill="Calculator" title="Mortgage Blueprint"
        sub="The supercharged mortgage calculator. Enter your numbers and see your full picture — payment breakdown, costs to close, qualification, tax savings, and more." />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
        <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ padding: "10px 24px", fontSize: 13, fontWeight: 600, color: C.text,
          border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none" }}>Questions? Schedule a call</a>
        <a href={LINKS.apply} target="_blank" rel="noopener" style={{ padding: "10px 24px", fontSize: 13, fontWeight: 600, color: "#fff",
          background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, borderRadius: 9999, textDecoration: "none" }}>Ready to Apply</a>
      </div>
    </div>
    <div style={{ width: "100%", height: "calc(100vh - 160px)", minHeight: 600 }}>
      <iframe src={LINKS.blueprint} title="Mortgage Blueprint Calculator" style={{ width: "100%", height: "100%", border: "none" }}
        allow="clipboard-write" loading="lazy" />
    </div>
  </section>
);

const PricePointPage = () => (
  <section style={{ paddingTop: 80 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 0" }}>
      <SectionTitle pill="Game" title="PricePoint"
        sub="Think you know Bay Area real estate? Guess home prices, sharpen your market instincts, and compete on the leaderboard." />
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
        <Link to="/blueprint" style={{ padding: "10px 24px", fontSize: 13, fontWeight: 600, color: C.text,
          border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none" }}>Open Blueprint</Link>
        <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ padding: "10px 24px", fontSize: 13, fontWeight: 600, color: "#fff",
          background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, borderRadius: 9999, textDecoration: "none" }}>Schedule a Call</a>
      </div>
    </div>
    <div style={{ width: "100%", height: "calc(100vh - 160px)", minHeight: 600 }}>
      <iframe src={`${LINKS.pricepoint}?mode=pricepoint`} title="PricePoint Game" style={{ width: "100%", height: "100%", border: "none" }}
        allow="clipboard-write" loading="lazy" />
    </div>
  </section>
);

const NewsletterPage = () => (
  <section style={{ paddingTop: 80 }}>
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
      <SectionTitle pill="Newsletter" title="Three Point Thursday"
        sub="Your weekly mortgage, real estate, and business newsletter from your favorite local lender. Every Thursday." />

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 28px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>What you get each week</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Rate Check", "Where rates are trending, sourced from Mortgage News Daily."],
            ["Three Points", "Three curated topics covering market updates, loan product education, strategy tips, and Bay Area property spotlights."],
            ["Actionable Takeaways", "Every point ends with something you can actually do — not just information, but a plan."],
          ].map(([t, d]) => (
            <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.purple, marginTop: 8, flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t}</span>
                <span style={{ fontSize: 14, color: C.textSec }}> — {d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <a href={LINKS.substack} target="_blank" rel="noopener" style={{ display: "inline-block", padding: "14px 36px", fontSize: 16, fontWeight: 700, color: "#fff",
          background: `linear-gradient(135deg, ${C.purple}, ${C.indigo})`, borderRadius: 9999, textDecoration: "none",
          boxShadow: `0 0 20px rgba(139,92,246,0.3)`, transition: "all 0.2s" }}>Subscribe on Substack</a>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 12 }}>Free. Every Thursday. No spam.</p>
      </div>

      {/* Past issues embed */}
      <div style={{ marginTop: 48 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16 }}>Recent Issues</h3>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          <iframe src="https://threepointthursday.substack.com/embed" title="Three Point Thursday Newsletter"
            style={{ width: "100%", height: 400, border: "none" }} loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <section style={{ paddingTop: 80 }}>
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
      <SectionTitle pill="About" title="Meet Chris Granger" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 28px" }}>
          <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.8, margin: "0 0 16px" }}>
            I'm a mortgage broker based in Alameda, California, serving the San Francisco Bay Area and beyond.
            I work at Focus Mortgage where I'm building a practice centered on transparency, technology, and education.
          </p>
          <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.8, margin: "0 0 16px" }}>
            I believe the mortgage process should be clear, not confusing. That's why I build tools like
            Mortgage Blueprint — an interactive calculator that shows you every number in your deal, in real time.
            No hidden fees, no surprises.
          </p>
          <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.8, margin: 0 }}>
            Whether you're a first-time buyer in Alameda, refinancing in San Francisco, or investing across the Bay,
            I'll map out a plan and walk you through every step.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            ["Licensed States", "CA, OR, WA, NV, AZ, CO, HI, TX"],
            ["NMLS", "#952015"],
            ["Company", "Focus Mortgage"],
            ["Markets", "Alameda, San Francisco, Bay Area"],
          ].map(([label, val]) => (
            <div key={label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 18px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase", fontFamily: MONO, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 16px", letterSpacing: "-0.03em" }}>Let's talk about your goals</h3>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={LINKS.calendly} target="_blank" rel="noopener" style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700, color: "#fff",
              background: `linear-gradient(135deg, ${C.indigo}, ${C.blue})`, borderRadius: 9999, textDecoration: "none",
              boxShadow: `0 0 20px rgba(99,102,241,0.3)` }}>Schedule a Call</a>
            <a href={LINKS.email} style={{ padding: "14px 32px", fontSize: 15, fontWeight: 700,
              color: C.text, border: `1px solid ${C.border}`, borderRadius: 9999, textDecoration: "none" }}>Email Me</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Scroll to top on route change ──
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// ── App ──
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: FONT }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        body { background: ${C.bg}; margin: 0; }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-dropdown { display: none !important; }
        }
        html { scrollbar-width: thin; scrollbar-color: ${C.border} transparent; }
        html::-webkit-scrollbar { width: 6px; }
        html::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blueprint" element={<BlueprintPage />} />
          <Route path="/pricepoint" element={<PricePointPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
