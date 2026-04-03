import { useEffect, useRef, useState } from "react";
import { useTokens } from "./ThemeContext";

// ─── Shared hook ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); }, { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Shared fade helper ───────────────────────────────────────────────────────
const fu =
  (inView: boolean) =>
  (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });

export function CTASection() {
  const tk = useTokens();
  const G  = tk.green;
  const GD = tk.greenDark;

  const { ref, inView } = useInView(0.2);
  const anim = fu(inView);
  const [vinInput, setVinInput]     = useState("");
  const [submitted, setSubmitted]   = useState(false);

  const handleSubmit = () => {
    if (!vinInput.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setVinInput("");
  };

  return (
    <>
      <style>{`
        @keyframes ctaGlow {
          0%,100%{box-shadow:0 0 40px ${G}18, 0 0 80px ${G}08}
          50%{box-shadow:0 0 60px ${G}28, 0 0 120px ${G}12}
        }
        @keyframes checkIn {
          from{opacity:0;transform:scale(0.7)}
          to{opacity:1;transform:scale(1)}
        }
        @keyframes liveBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .vin-input::placeholder { color:${tk.textMuted}; }
        .vin-input:focus { outline:none; border-color:${G}50 !important; box-shadow:0 0 0 3px ${G}14; }
        .cta-primary:hover  { transform:translateY(-2px); box-shadow:0 12px 36px ${G}38 !important; }
        .cta-secondary:hover { border-color:${tk.border} !important; color:${tk.text} !important; }
      `}</style>

      <section ref={ref} style={{
        position: "relative",
        background: tk.bg,             // ← themed
        color: tk.text,                // ← themed
        fontFamily: "'Inter',sans-serif",
        padding: "90px 32px 100px",
        overflow: "hidden",
        transition: "background .35s ease, color .35s ease",
      }}>

        {/* Mesh gradient backdrop */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${G}08 0%, transparent 70%)`,
          animation: "ctaGlow 6s ease-in-out infinite",
        }} />

        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize: "48px 48px" }} />

        {/* Top separator */}
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: `linear-gradient(90deg,transparent,${G}55,transparent)` }} />

        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 5, textAlign: "center" }}>

          {/* Eyebrow */}
          <div style={{ ...anim(0.05), display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "5px 14px", borderRadius: "100px", marginBottom: "22px",
            background: `${G}0d`, border: `1px solid ${G}40`,
            fontFamily: "'DM Mono',monospace", fontSize: "10px", color: G,
            letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
              boxShadow: `0 0 5px ${G}`, animation: "liveBlink 2s ease-in-out infinite" }} />
            Free to Use · No Card Required
          </div>

          {/* Headline */}
          <h2 style={{ ...anim(0.12), fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,5vw,62px)", lineHeight: 1.0, letterSpacing: "-2px",
            marginBottom: "14px",
            color: tk.text, transition: "color .35s" }}>
            Verify Before You{" "}
            <span style={{
              color: G,
              textDecoration: "underline",
              textDecorationColor: `${G}40`,
              textUnderlineOffset: "6px",
            }}>Buy.</span>
          </h2>

          <p style={{ ...anim(0.22), fontSize: "clamp(14px,1.8vw,16px)", fontWeight: 300,
            color: tk.textSub,                               // ← themed
            lineHeight: 1.75, maxWidth: "480px",
            margin: "0 auto 36px", transition: "color .35s" }}>
            Paste a VIN number. Get a blockchain-verified verdict and exact financial risk
            in under 3 seconds — completely free.
          </p>

          {/* VIN input row */}
          <div style={{ ...anim(0.3), display: "flex", gap: "10px", maxWidth: "540px",
            margin: "0 auto 20px", flexWrap: "wrap" as const }}>
            <input
              className="vin-input"
              value={vinInput}
              onChange={e => setVinInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="Enter VIN — e.g. MH01AB4421"
              maxLength={17}
              style={{
                flex: 1, minWidth: "200px",
                fontFamily: "'DM Mono',monospace", fontSize: "13px", letterSpacing: "0.06em",
                padding: "13px 16px", borderRadius: "10px",
                background: tk.bgInset,              // ← themed
                border: `1px solid ${tk.border}`,   // ← themed
                color: tk.text,                      // ← themed
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s, background .35s, color .35s",
              }}
            />
            <button
              className="cta-primary"
              onClick={handleSubmit}
              style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px",
                padding: "13px 26px", borderRadius: "10px", border: "none", cursor: "pointer",
                background: `linear-gradient(135deg,${G},${GD})`,
                color: tk.bg,                        // ← themed (dark text on green in both modes)
                letterSpacing: "-0.1px", transition: "all 0.2s", whiteSpace: "nowrap" as const,
                display: "flex", alignItems: "center", gap: "7px",
              }}
            >
              {submitted ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    style={{ animation: "checkIn 0.3s ease both" }}>
                    <path d="M5 12l5 5L20 7" stroke={tk.bg} strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified!
                </>
              ) : (
                <>
                  Check VIN Free
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={tk.bg} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Secondary CTAs */}
          <div style={{ ...anim(0.38), display: "flex", alignItems: "center", justifyContent: "center",
            gap: "12px", flexWrap: "wrap" as const }}>
            <button
              className="cta-secondary"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: "14px", fontWeight: 400,
                padding: "10px 22px", borderRadius: "9px", cursor: "pointer",
                background: "transparent",
                border: `1px solid ${tk.border}`,   // ← themed
                color: tk.textSub,                   // ← themed
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "7px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
              Watch Demo
            </button>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
              color: tk.textMuted, letterSpacing: "0.06em", transition: "color .35s" }}>
              or
            </span>
            <button
              className="cta-secondary"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: "14px", fontWeight: 400,
                padding: "10px 22px", borderRadius: "9px", cursor: "pointer",
                background: "transparent",
                border: `1px solid ${tk.border}`,   // ← themed
                color: tk.textSub,                   // ← themed
                transition: "all 0.2s",
              }}
            >
              API Docs →
            </button>
          </div>

          {/* Social proof strip */}
          <div style={{ ...anim(0.5), marginTop: "40px", display: "flex",
            justifyContent: "center", gap: "24px", flexWrap: "wrap" as const }}>
            {[
              { val: "2.4M+",  label: "VINs Verified"   },
              { val: "₹340Cr", label: "Fraud Prevented"  },
              { val: "100%",   label: "Free to Use"      },
              { val: "< 3s",   label: "Verdict Time"     },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "18px",
                  color: G, marginBottom: "2px" }}>{s.val}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
                  color: tk.textMuted,                 // ← themed
                  letterSpacing: "0.07em", textTransform: "uppercase" as const,
                  transition: "color .35s" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
          background: `linear-gradient(transparent,${tk.bg}99)`,   // ← themed
          pointerEvents: "none", transition: "background .35s" }} />
      </section>
    </>
  );
}