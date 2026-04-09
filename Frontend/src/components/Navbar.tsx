import { useState, useEffect } from "react";
import { useTheme, useTokens } from "./ThemeContext";

const NAV_LINKS = ["How It Works", "For Dealers", "Pricing", "Docs"];

// ─── Theme Toggle Button ──────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  const tk = useTokens();
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    toggle();
    setTimeout(() => setPressed(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: "36px", height: "36px", borderRadius: "9px",
        border: `1px solid ${tk.border}`,
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.22s",
        transform: pressed ? "scale(0.88) rotate(15deg)" : "scale(1) rotate(0deg)",
        flexShrink: 0,
      }}
    >
      {/* Sun icon (light mode) */}
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        style={{
          position: "absolute",
          opacity: isDark ? 0 : 1,
          transform: isDark ? "scale(0.5) rotate(90deg)" : "scale(1) rotate(0deg)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <circle cx="12" cy="12" r="4" stroke="#0D1A12" strokeWidth="1.8"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="#0D1A12" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      {/* Moon icon (dark mode) */}
      <svg
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        style={{
          position: "absolute",
          opacity: isDark ? 1 : 0,
          transform: isDark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          stroke="#00DC82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark }                  = useTheme();
  const tk                          = useTokens();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled
    ? isDark ? "rgba(5,10,15,0.94)" : "rgba(244,247,245,0.96)"
    : isDark ? "rgba(5,10,15,0.55)" : "rgba(244,247,245,0.7)";

  const navBorder = scrolled
    ? isDark ? "1px solid rgba(0,220,130,0.12)" : "1px solid rgba(0,160,90,0.15)"
    : isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.06)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes navDrop  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes livePulse{ 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes mobileIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .odo-nav { animation: navDrop 0.5s ease both; font-family:'Inter',sans-serif; }

        .odo-navlink {
          font-size:13px; text-decoration:none;
          padding:5px 14px; border-radius:7px; transition:all 0.18s;
          font-weight:400; white-space:nowrap;
        }
        .odo-navlink:hover { background:rgba(0,220,130,0.08); color:#00DC82 !important; }

        .odo-login {
          font-size:13px; background:none; border:none; cursor:pointer;
          font-family:'Inter',sans-serif; transition:color 0.18s;
        }
        .odo-login:hover { color:#00DC82 !important; }

        .odo-cta {
          font-family:'Inter',sans-serif; font-size:13px; font-weight:600;
          padding:8px 18px; border-radius:8px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#00DC82,#00A86B); color:#050A0F;
          display:flex; align-items:center; gap:5px; transition:all 0.18s;
        }
        .odo-cta:hover { transform:translateY(-1px); box-shadow:0 6px 22px rgba(0,220,130,0.32); }

        .odo-ham { display:flex; flex-direction:column; gap:4.5px; background:none; border:none; cursor:pointer; padding:6px; }
        .odo-ham.open span:nth-child(1) { transform:translateY(6px) rotate(45deg); }
        .odo-ham.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .odo-ham.open span:nth-child(3) { transform:translateY(-6px) rotate(-45deg); }

        .odo-mobile-menu { animation: mobileIn 0.22s ease both; }

        .odo-mlink {
          display:block; padding:10px 14px; font-size:14px;
          text-decoration:none; border-radius:8px; transition:all 0.15s;
        }
        .odo-mlink:hover { background:rgba(0,220,130,0.07); color:#00DC82 !important; }

        /* Theme toggle wrapper hover */
        .odo-theme-btn:hover {
          border-color: rgba(0,220,130,0.4) !important;
          background: rgba(0,220,130,0.08) !important;
        }
      `}</style>

      <header
        className="odo-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: navBg,
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderBottom: navBorder,
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
          height: "56px", display: "flex", alignItems: "center", gap: "14px" }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center",
            gap: "9px", flexShrink: 0 }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "7px",
              background: "linear-gradient(135deg,#00DC82,#00A86B)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
              🛡
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "18px",
              color: tk.text, letterSpacing: "-0.5px", transition: "color 0.3s" }}>
              Odo<span style={{ color: "#00DC82" }}>Shield</span>
            </span>
          </a>

          {/* Center pill nav */}
          <nav style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "2px",
              padding: "4px 6px", borderRadius: "10px",
              background: tk.navBg, border: `1px solid ${tk.navBorder}`,
              transition: "all 0.3s",
            }}>
              {NAV_LINKS.map(l => (
                <a key={l} href="#" className="odo-navlink"
                  style={{ color: tk.navLink }}>
                  {l}
                </a>
              ))}
            </div>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>

            {/* Live badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(0,220,130,0.09)", border: "1px solid rgba(0,220,130,0.22)",
              borderRadius: "100px", padding: "4px 12px",
              fontSize: "10px", color: "#00DC82", fontFamily: "'DM Mono',monospace",
              letterSpacing: "0.07em", textTransform: "uppercase" as const, whiteSpace: "nowrap",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00DC82",
                animation: "livePulse 2s infinite", display: "inline-block" }} />
              Live on Polygon
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Login */}
            <button className="odo-login" style={{ color: tk.navLink }}>Login</button>

            {/* CTA */}
            <button className="odo-cta">
              Verify a VIN
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className={`odo-ham ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(p => !p)}
              style={{ display: "none" }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: "20px", height: "1.5px",
                  background: tk.text, borderRadius: "2px", transition: "all 0.22s",
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="odo-mobile-menu"
            style={{
              background: isDark ? "rgba(5,10,15,0.97)" : "rgba(244,247,245,0.98)",
              borderTop: `1px solid ${tk.border}`,
              padding: "8px 16px 16px",
            }}
          >
            {NAV_LINKS.map(l => (
              <a key={l} href="#" className="odo-mlink"
                style={{ color: tk.navLink }}
                onClick={() => setMobileOpen(false)}>
                {l}
              </a>
            ))}
            <div style={{ height: "1px", background: tk.border, margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button className="odo-login" style={{ color: tk.navLink }}>Login</button>
                <ThemeToggle />
              </div>
              <button className="odo-cta">Verify a VIN →</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}