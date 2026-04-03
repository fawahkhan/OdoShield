const G   = "#00DC82";
const GD  = "#00A86B";

const BG  = "#050A0F";
const T   = "#E8EDF2";
const FOOTER_LINKS = {
  Product:   ["How It Works", "For Dealers", "Pricing", "API Docs", "Changelog"],
  Company:   ["About", "Blog", "Careers", "Press Kit", "Contact"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Community: ["Twitter / X", "Discord", "GitHub", "Telegram"],
};
 
const TICKER_ITEMS = [
  { hash: "0x4a2f…9b1c", text: "MH01-AB-1234 · 62,000km anchored"  },
  { hash: "0x8d3e…2a7f", text: "DL5S-CD-1234 · Fraud flag raised"  },
  { hash: "0x1c9a…6e3b", text: "KA03-MN-5678 · Service verified"   },
  { hash: "0xf72c…1d4a", text: "TN07-BZ-9012 · Insurance matched"  },
  { hash: "0x39b1…8c5d", text: "GJ01-XX-3456 · 42,000km anchored"  },
  { hash: "0xc4e8…7f2a", text: "RJ14-CD-7890 · Hash mismatch ⚠"   },
];
 
export function Footer() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const year    = new Date().getFullYear();
 
  return (
    <>
      <style>{`
        @keyframes ticker        { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes liveBlink2    { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .footer-link { font-family:'Inter',sans-serif; font-size:13px; color:rgba(232,237,242,0.45); text-decoration:none; transition:color 0.18s; display:block; padding:3px 0; }
        .footer-link:hover { color:${G}; }
        .footer-social { width:34px; height:34px; border-radius:8px; border:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.18s; text-decoration:none; }
        .footer-social:hover { border-color:${G}30; background:${G}0d; }
      `}</style>
 
      <footer style={{ background: BG, color: T, fontFamily: "'Inter',sans-serif",
        borderTop: `1px solid ${G}18` }}>
 
        {/* Live blockchain ticker */}
        <div style={{ borderBottom: `1px solid ${G}10`, background: `${G}02`,
          padding: "9px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", width: "max-content",
            animation: "ticker 28s linear infinite" }}>
            {doubled.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "0 28px",
                fontFamily: "'DM Mono',monospace", fontSize: "10px", color: `${G}44`,
                letterSpacing: "0.04em" }}>
                <span style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${G}18`,
                  color: `${G}55`, borderRadius: "3px", padding: "1px 6px" }}>
                  {item.hash}
                </span>
                <span>{item.text}</span>
                <span style={{ marginLeft: "28px", color: `${G}18` }}>|</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* Main footer body */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 32px 36px" }}>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>
 
            {/* Brand col */}
            <div style={{ flex: "1 1 220px", minWidth: "200px" }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "14px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px",
                  background: `linear-gradient(135deg,${G},${GD})`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                  🛡
                </div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "20px",
                  letterSpacing: "-0.5px" }}>
                  Odo<span style={{ color: G }}>Shield</span>
                </span>
              </div>
 
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(232,237,242,0.42)",
                lineHeight: 1.72, marginBottom: "20px", maxWidth: "240px" }}>
                Blockchain-backed fraud detection for used vehicle buyers. Verify before you buy.
              </p>
 
              {/* Network badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "5px 12px", borderRadius: "100px",
                background: `${G}0d`, border: `1px solid ${G}28`,
                fontFamily: "'DM Mono',monospace", fontSize: "9px", color: G,
                letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: "20px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
                  animation: "liveBlink2 2s ease-in-out infinite" }} />
                Live on Polygon · Base
              </div>
 
              {/* Social icons */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { label: "X", path: "M4 4l16 16M20 4L4 20" },
                  { label: "D", path: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 14H16l-4-5.5V16H9.5V8H11l4 5.5V8h1.5v8z" },
                  { label: "G", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
                ].map(s => (
                  <a key={s.label} href="#" className="footer-social">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d={s.path} stroke="rgba(232,237,242,0.45)" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
 
            {/* Link columns */}
            {(Object.entries(FOOTER_LINKS) as [string, string[]][]).map(([cat, links]) => (
              <div key={cat} style={{ flex: "1 1 120px", minWidth: "110px" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: `${G}80`,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "14px",
                  fontWeight: 500 }}>
                  {cat}
                </div>
                {links.map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            ))}
          </div>
 
          {/* Bottom bar */}
          <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${G}20,transparent)`,
            marginBottom: "24px" }} />
 
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
              color: "rgba(232,237,242,0.25)", letterSpacing: "0.04em" }}>
              © {year} OdoShield Technologies Pvt. Ltd. · All rights reserved.
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
                color: `${G}55`, letterSpacing: "0.05em" }}>
                Built on Polygon + Base
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
                  boxShadow: `0 0 5px ${G}`, animation: "liveBlink2 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
                  color: `${G}80`, letterSpacing: "0.05em" }}>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}