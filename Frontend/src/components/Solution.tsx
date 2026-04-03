import { useEffect, useRef, useState } from "react";
import { useTokens } from "./ThemeContext";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.18) {
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

// ─── Step data ────────────────────────────────────────────────────────────────
// Icons reference G via closure — we make them a function so we can pass the token in
const makeSteps = (G: string) => [
  {
    num: "01",
    title: "Snapshot",
    sub: "Vehicle data is captured and hashed",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="7" width="26" height="18" rx="3" stroke={G} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="5" stroke={G} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="2" fill={G} fillOpacity="0.5"/>
        <path d="M13 7V5M19 7V5" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="10" width="4" height="1.5" rx="0.75" fill={G} fillOpacity="0.4"/>
      </svg>
    ),
    detail: ["Odometer reading", "Service records", "Insurance data", "Ownership docs"],
    hash: "sha3(vehicle_data + timestamp)",
  },
  {
    num: "02",
    title: "Anchor",
    sub: "Stored on blockchain as tamper-proof proof",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L28 9v7c0 7-5 12-12 13C9 28 4 23 4 16V9L16 3z" stroke={G} strokeWidth="1.5"/>
        <path d="M11 16l3.5 3.5L21 13" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    detail: ["Polygon / Base network", "Immutable timestamp", "Block confirmation", "Hash stored forever"],
    hash: "0x4a2f9b…1c3e (Block #42,891,334)",
  },
  {
    num: "03",
    title: "Verify",
    sub: "New data is checked against the past",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="9" stroke={G} strokeWidth="1.5"/>
        <path d="M21 21l6 6" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 14l3 3 5-6" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    detail: ["Compare vs anchored hash", "Detect any mismatch", "Score financial risk", "Instant verdict"],
    hash: "Match: ✓ | Deviation: ₹0 | Trust: 94",
  },
];

// ─── Animated hash stream ─────────────────────────────────────────────────────
function HashStream({ active, green }: { active: boolean; green: string }) {
  const chars = "0123456789abcdef";
  const [lines, setLines] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setLines(prev => prev.map((_, i) => {
        const len = [24, 32, 20][i];
        return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      }));
    }, 120);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontFamily: "'DM Mono',monospace", fontSize: "9px",
          color: `${green}${["44", "28", "18"][i]}`,
          letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden",
        }}>
          {l || "·".repeat([24, 32, 20][i])}
        </div>
      ))}
    </div>
  );
}

// ─── Connector arrow ──────────────────────────────────────────────────────────
function Connector({ active, green }: { active: boolean; green: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
      paddingTop: "32px", flexShrink: 0 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: "2px", height: "14px", borderRadius: "1px",
          background: active ? green : "rgba(255,255,255,0.08)",
          opacity: active ? 1 - i * 0.25 : 0.3,
          transition: `background 0.4s ${i * 0.1}s ease, opacity 0.4s ${i * 0.1}s ease`,
        }} />
      ))}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
        style={{ marginTop: "2px", opacity: active ? 1 : 0.2, transition: "opacity 0.4s ease" }}>
        <path d="M5 1v8M2 6l3 3 3-3" stroke={active ? green : "rgba(255,255,255,0.3)"}
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({
  step, index, active, inView, green, textColor, textMuted,
}: {
  step: ReturnType<typeof makeSteps>[0];
  index: number; active: boolean; inView: boolean;
  green: string; textColor: string; textMuted: string;
}) {
  return (
    <div style={{
      flex: 1, minWidth: "240px", maxWidth: "340px",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ${0.3 + index * 0.15}s ease, transform 0.7s ${0.3 + index * 0.15}s ease`,
    }}>
      <div style={{
        borderRadius: "14px", overflow: "hidden",
        background: active ? "rgba(12,24,18,0.9)" : "rgba(11,19,30,0.85)",
        border: `1px solid ${active ? green + "3a" : "rgba(255,255,255,0.07)"}`,
        boxShadow: active ? `0 0 32px ${green}0d, inset 0 1px 0 ${green}18` : "none",
        transition: "all 0.45s ease",
        position: "relative",
      }}>
        {/* top glow line when active */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg,transparent,${green},transparent)`,
          opacity: active ? 1 : 0, transition: "opacity 0.4s ease",
        }} />

        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: "10px",
              color: active ? green : textMuted,
              letterSpacing: "0.1em", transition: "color 0.3s",
            }}>
              STEP {step.num}
            </span>
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "3px 9px", borderRadius: "100px",
              background: active ? `${green}14` : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? green + "30" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.3s",
            }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: active ? green : "rgba(255,255,255,0.2)",
                boxShadow: active ? `0 0 5px ${green}` : "none",
                transition: "all 0.3s",
              }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
                color: active ? green : textMuted, letterSpacing: "0.06em",
                transition: "color 0.3s" }}>
                {active ? "ACTIVE" : "QUEUED"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0,
              background: active ? `${green}12` : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? green + "28" : "rgba(255,255,255,0.06)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.4s",
            }}>
              {step.icon}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700,
                fontSize: "18px", color: textColor, margin: 0, letterSpacing: "-0.3px",
                transition: "color .35s" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300,
                fontSize: "12px", color: textMuted, margin: "2px 0 0",
                lineHeight: 1.45, transition: "color .35s" }}>
                {step.sub}
              </p>
            </div>
          </div>
        </div>

        {/* Detail list */}
        <div style={{ padding: "12px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
            {step.detail.map((d, i) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px",
                opacity: active ? 1 : 0.5, transition: `opacity 0.3s ${i * 0.06}s ease` }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%",
                  background: active ? green : "rgba(255,255,255,0.25)", flexShrink: 0,
                  transition: "background 0.3s" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
                  color: textMuted, letterSpacing: "0.03em", transition: "color .35s" }}>{d}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: "8px 10px", borderRadius: "7px",
            background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <HashStream active={active} green={green} />
            <div style={{ marginTop: "4px", fontFamily: "'DM Mono',monospace", fontSize: "9px",
              color: `${green}50`, letterSpacing: "0.04em" }}>
              {step.hash}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SolutionSection() {
  const tk = useTokens();
  const G  = tk.green;
  const GD = tk.greenDark;

  const STEPS = makeSteps(G);

  const { ref, inView } = useInView(0.15);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, [inView]);

  const fu = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        @keyframes gridPulse  { 0%,100%{opacity:0.55} 50%{opacity:0.85} }
        @keyframes liveBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes floatOrb   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,28px)} }
        @keyframes arrowBounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      `}</style>

      <section ref={ref} style={{
        position: "relative",
        background: tk.bg,              // ← themed
        color: tk.text,                 // ← themed
        fontFamily: "'Inter',sans-serif",
        padding: "80px 32px 90px",
        overflow: "hidden",
        transition: "background .35s ease, color .35s ease",
      }}>
        {/* Top separator */}
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: `linear-gradient(90deg,transparent,${G}44,transparent)` }} />

        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridPulse 8s ease-in-out infinite" }} />

        {/* Orbs */}
        <div style={{ position: "absolute", width: "500px", height: "500px", top: "-120px", right: "-60px",
          borderRadius: "50%", background: tk.orb2,   // ← themed
          filter: "blur(72px)", pointerEvents: "none", animation: "floatOrb 14s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "360px", height: "360px", bottom: "-60px", left: "-40px",
          borderRadius: "50%", background: `radial-gradient(circle,rgba(30,120,255,0.07) 0%,transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>

          {/* ── Label ── */}
          <div style={{ ...fu(0.05), display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 13px", borderRadius: "100px", marginBottom: "18px",
            background: `${G}0d`, border: `1px solid ${G}38`,
            fontFamily: "'DM Mono',monospace", fontSize: "10px", color: G,
            letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
              animation: "liveBlink 2s ease-in-out infinite" }} />
            The Solution
          </div>

          {/* ── Headline ── */}
          <div style={fu(0.12)}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(30px,4.2vw,56px)", lineHeight: 1.05, letterSpacing: "-1.5px",
              marginBottom: "14px", maxWidth: "680px",
              color: tk.text, transition: "color .35s" }}>       {/* ← themed */}
              We Don&apos;t Show Reports.{" "}
              <span style={{ color: G }}>We Expose Lies.</span>
            </h2>
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 300,
              color: tk.textSub,                                  // ← themed
              lineHeight: 1.75, maxWidth: "540px", marginBottom: "36px",
              transition: "color .35s" }}>
              OdoShield compares current vehicle data with its immutable past. If something
              doesn&apos;t match, we flag it — and calculate your{" "}
              <span style={{ color: tk.text, fontWeight: 400, transition: "color .35s" }}>exact financial risk.</span>
            </p>
          </div>

          {/* ── Step progress indicator ── */}
          <div style={{ ...fu(0.22), display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
                background: activeStep === i ? `${G}14` : tk.bgInset,   // ← themed
                border: `1px solid ${activeStep === i ? G + "38" : tk.border}`, // ← themed
                transition: "all 0.25s",
              }}>
                <span style={{
                  fontFamily: "'DM Mono',monospace", fontSize: "10px",
                  color: activeStep === i ? G : tk.textMuted,            // ← themed
                  letterSpacing: "0.06em", transition: "color 0.25s",
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px",
                  color: activeStep === i ? tk.text : tk.textMuted,      // ← themed
                  transition: "color 0.25s",
                }}>
                  {s.title}
                </span>
              </button>
            ))}
            {/* Progress bar */}
            <div style={{ flex: 1, height: "2px", borderRadius: "1px",
              background: tk.border, overflow: "hidden" }}>             {/* ← themed */}
              <div style={{
                height: "100%", borderRadius: "1px",
                background: `linear-gradient(90deg,${G},${GD})`,
                width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
          </div>

          {/* ── Step cards + connectors ── */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "contents" }}>
                <StepCard
                  step={step} index={i} active={activeStep === i} inView={inView}
                  green={G} textColor={tk.text} textMuted={tk.textMuted}
                />
                {i < STEPS.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", paddingTop: "38px", flexShrink: 0 }}>
                    <Connector active={activeStep > i} green={G} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── How it all ties together ── */}
          <div style={{ ...fu(0.65), marginTop: "48px", display: "flex", gap: "16px",
            flexWrap: "wrap", alignItems: "stretch" }}>

            {/* Callout */}
            <div style={{
              flex: "1 1 280px", padding: "20px 24px", borderRadius: "12px",
              background: `${G}08`, border: `1px solid ${G}28`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg,transparent,${G},transparent)` }} />
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
                color: `${G}70`, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" }}>
                Think of it as
              </div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "17px",
                color: tk.text, margin: "0 0 6px", lineHeight: 1.3, transition: "color .35s" }}>
                "GitHub commits,<br />but for a car's life."
              </p>
              <p style={{ fontSize: "12px", fontWeight: 300, color: tk.textMuted,
                lineHeight: 1.65, margin: 0, transition: "color .35s" }}>
                Every event is a commit. The blockchain is the repo. You can't rewrite history.
              </p>
            </div>

            {/* Trust guarantee cards */}
            <div style={{ flex: "2 1 380px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { icon: "🔒", title: "Tamper-proof",      body: "Data anchored on-chain cannot be altered retroactively by anyone." },
                { icon: "⏱",  title: "Time-stamped",      body: "Every record is permanently dated — no retroactive changes allowed." },
                { icon: "🌐", title: "Verifiable forever", body: "Any buyer, anywhere, at any time can verify the full history." },
              ].map(c => (
                <div key={c.title} style={{
                  flex: "1 1 110px", padding: "16px", borderRadius: "10px",
                  background: tk.bgInset,     // ← themed
                  border: `1px solid ${tk.border}`, // ← themed
                  transition: "background .35s, border-color .35s",
                }}>
                  <div style={{ fontSize: "18px", marginBottom: "7px" }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "13px",
                    color: tk.text, marginBottom: "4px", transition: "color .35s" }}>{c.title}</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "11px",
                    color: tk.textMuted, lineHeight: 1.6, margin: 0, transition: "color .35s" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bridge arrow ── */}
          <div style={{ ...fu(0.82), marginTop: "44px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ flex: 1, maxWidth: "260px", height: "1px",
              background: `linear-gradient(90deg,${G}44,transparent)` }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
              color: tk.textMuted, letterSpacing: "0.06em", transition: "color .35s" }}>
              See the verdict in action
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke={`${G}88`} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ animation: "arrowBounce 1.6s ease-in-out infinite" }}/>
            </svg>
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