import { useEffect, useRef, useState } from "react";
import { useTokens } from "./ThemeContext";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
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

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return active ? val : 0;
}

// ─── Pipeline steps (factory so icons pick up live green token) ───────────────
const R  = "#FF4757";
const RL = "#FF6B7A";

const makePipeline = (G: string) => [
  {
    id: "upload",
    label: "Report Uploaded",
    detail: "Seller submits vehicle report",
    mono: "POST /api/v1/verify",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 2v6h6M12 12v6M9 15l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    duration: 900,
    statusDone: "Received",
    color: G,
  },
  {
    id: "chain",
    label: "Blockchain Query",
    detail: "Fetching anchored hash history",
    mono: "GET chain://vin/MH01-AB-4421",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    duration: 1100,
    statusDone: "6 anchors found",
    color: G,
  },
  {
    id: "compare",
    label: "Hash Comparison",
    detail: "Diffing submitted vs on-chain",
    mono: "diff(submitted_hash, chain_hash)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    duration: 1300,
    statusDone: "Δ Mismatch found",
    color: R,
  },
  {
    id: "score",
    label: "Risk Scoring",
    detail: "Calculating financial exposure",
    mono: "score(delta_km × market_rate)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    duration: 900,
    statusDone: "₹1,20,000 at risk",
    color: R,
  },
  {
    id: "verdict",
    label: "Verdict Issued",
    detail: "Cryptographic proof generated",
    mono: "verdict: FRAUD_DETECTED",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    duration: 700,
    statusDone: "FRAUD DETECTED",
    color: R,
  },
];

// ─── Typing log line ──────────────────────────────────────────────────────────
function LogLine({ text, active, delay, color }: {
  text: string; active: boolean; delay: number; color: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  return (
    <div style={{
      fontFamily: "'DM Mono',monospace", fontSize: "11px",
      color: shown ? color : "transparent",
      letterSpacing: "0.03em", lineHeight: 1.6,
      transition: "color 0.3s ease",
      display: "flex", gap: "8px",
    }}>
      <span style={{ color: shown ? `${color}50` : "transparent", flexShrink: 0 }}>›</span>
      {text}
    </div>
  );
}

// ─── Pipeline step row ────────────────────────────────────────────────────────
type StepStatus = "idle" | "running" | "done";

function PipelineRow({ step, status, index, textColor, textMuted }: {
  step: ReturnType<typeof makePipeline>[0];
  status: StepStatus; index: number;
  textColor: string; textMuted: string;
}) {
  const isRunning = status === "running";
  const isDone    = status === "done";
  const color     = isDone ? step.color : isRunning ? step.color : "rgba(255,255,255,0.2)";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      padding: "10px 14px", borderRadius: "10px",
      background: isRunning ? `${step.color}0c` : isDone ? `${step.color}07` : "rgba(255,255,255,0.02)",
      border: `1px solid ${isRunning ? step.color + "30" : isDone ? step.color + "18" : "rgba(255,255,255,0.05)"}`,
      transition: "all 0.35s ease",
    }}>
      {/* Number / spinner / check */}
      <div style={{
        width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isRunning ? `${step.color}18` : isDone ? `${step.color}14` : "rgba(255,255,255,0.04)",
        border: `1px solid ${isRunning ? step.color + "40" : isDone ? step.color + "28" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s",
        position: "relative", overflow: "hidden",
      }}>
        {isRunning && (
          <div style={{
            width: "14px", height: "14px", borderRadius: "50%",
            border: `2px solid ${step.color}30`,
            borderTop: `2px solid ${step.color}`,
            animation: "spinLoader 0.7s linear infinite",
          }} />
        )}
        {isDone && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d={index <= 1 ? "M5 12l5 5L20 7" : "M12 9v4M12 17h.01"}
              stroke={step.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {status === "idle" && (
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: textMuted }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Label + mono */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "13px",
          color: isRunning || isDone ? textColor : textMuted,
          transition: "color 0.3s" }}>
          {step.label}
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
          color: isRunning || isDone ? "rgba(232,237,242,0.38)" : "rgba(232,237,242,0.15)",
          letterSpacing: "0.03em", marginTop: "1px", transition: "color 0.3s" }}>
          {step.mono}
        </div>
      </div>

      {/* Status badge */}
      <div style={{
        flexShrink: 0,
        fontFamily: "'DM Mono',monospace", fontSize: "9px",
        padding: "3px 8px", borderRadius: "5px", letterSpacing: "0.05em",
        background: isDone ? `${step.color}12` : isRunning ? `${step.color}0d` : "transparent",
        border: `1px solid ${isDone ? step.color + "25" : isRunning ? step.color + "20" : "transparent"}`,
        color: isDone ? color : isRunning ? `${step.color}88` : textMuted,
        transition: "all 0.3s",
        whiteSpace: "nowrap" as const,
      }}>
        {isDone ? step.statusDone : isRunning ? "processing…" : "queued"}
      </div>
    </div>
  );
}

// ─── Result card — fraud content is intentionally red, not themed ─────────────
function ResultCard({ visible, loss, green }: { visible: boolean; loss: number; green: string }) {
  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)},000`;

  return (
    <div style={{
      borderRadius: "14px", overflow: "hidden",
      background: "rgba(22,6,8,0.95)",
      border: `1px solid ${R}44`,
      boxShadow: visible ? `0 0 48px ${R}18, inset 0 1px 0 ${R}18` : "none",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
      transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      position: "relative",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg,transparent,${R},transparent)` }} />

      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: R,
              boxShadow: `0 0 10px ${R}`, animation: "redPulse 1.8s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", color: RL,
              letterSpacing: "0.02em" }}>Fraud Detected</span>
          </div>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
            color: `${R}80`, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
            VERDICT FINAL
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {[
            { label: "VIN",              value: "MH01-AB-4421",   color: "#E8EDF2"              },
            { label: "Claimed Mileage",  value: "40,000 km",      color: "rgba(255,193,7,0.8)"  },
            { label: "Anchored Mileage", value: "95,000 km",      color: RL                     },
            { label: "Tampered By",      value: "55,000 km",      color: RL                     },
            { label: "Chain Proof",      value: "0x8d3e…2a7f ✓", color: `${green}99`            },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between",
              alignItems: "baseline", padding: "5px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
                color: "rgba(232,237,242,0.28)", letterSpacing: "0.07em",
                textTransform: "uppercase" as const }}>{r.label}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: r.color }}>{r.value}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 16px", borderRadius: "10px",
          background: `${R}0c`, border: `1px solid ${R}28` }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
            color: `${R}70`, letterSpacing: "0.1em", textTransform: "uppercase" as const,
            marginBottom: "5px" }}>Estimated Financial Loss</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "36px",
              lineHeight: 1, letterSpacing: "-1px",
              background: `linear-gradient(135deg,${R},${RL})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{fmt(loss)}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: `${R}60` }}>
              if you bought this car
            </span>
          </div>
          <div style={{ marginTop: "10px", height: "5px", borderRadius: "3px",
            background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "3px",
              background: `linear-gradient(90deg,${R},${RL})`,
              width: visible ? "82%" : "0%",
              transition: "width 1.2s 0.4s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
              color: "rgba(232,237,242,0.22)" }}>Risk exposure</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: `${R}90` }}>82 / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function KillerDemoSection() {
  const tk = useTokens();
  const G  = tk.green;

  const PIPELINE = makePipeline(G);

  const { ref, inView } = useInView(0.15);
  const [phase, setPhase]             = useState<"idle"|"running"|"done">("idle");
  const [stepIdx, setStepIdx]         = useState(-1);
  const [doneSteps, setDoneSteps]     = useState<Set<number>>(new Set());
  const [showResult, setShowResult]   = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);
  const loss = useCountUp(120000, 1000, showResult);

  const runDemo = () => {
    if (phase === "running") return;
    setPhase("running");
    setStepIdx(0);
    setDoneSteps(new Set());
    setShowResult(false);

    let cum = 0;
    PIPELINE.forEach((s, i) => {
      const start = cum;
      cum += s.duration;
      setTimeout(() => setStepIdx(i), start);
      setTimeout(() => {
        setDoneSteps(prev => new Set([...prev, i]));
        if (i === PIPELINE.length - 1) {
          setTimeout(() => { setPhase("done"); setShowResult(true); }, 200);
        } else {
          setStepIdx(i + 1);
        }
      }, start + s.duration);
    });
  };

  useEffect(() => {
    if (inView && !autoStarted) {
      setAutoStarted(true);
      setTimeout(runDemo, 600);
    }
  }, [inView]);

  const getStatus = (i: number): StepStatus => {
    if (doneSteps.has(i)) return "done";
    if (stepIdx === i)    return "running";
    return "idle";
  };

  const fu = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });

  const logActive = phase !== "idle";
  const logGreen  = `${G}80`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        @keyframes gridPulse  { 0%,100%{opacity:0.5} 50%{opacity:0.85} }
        @keyframes liveBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes redPulse   { 0%,100%{box-shadow:0 0 10px ${R}} 50%{box-shadow:0 0 22px ${R},0 0 40px ${R}55} }
        @keyframes spinLoader { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatOrb   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,24px)} }
        @keyframes arrowBounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      `}</style>

      <section ref={ref} style={{
        position: "relative",
        background: tk.bg,             // ← themed
        color: tk.text,                // ← themed
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
        <div style={{ position: "absolute", width: "480px", height: "480px", top: "-100px", right: "-40px",
          borderRadius: "50%", background: tk.orb2,   // ← themed
          filter: "blur(72px)", pointerEvents: "none", animation: "floatOrb 13s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "360px", height: "360px", bottom: "0", left: "-60px",
          borderRadius: "50%", background: `radial-gradient(circle,rgba(255,71,87,0.06) 0%,transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>

          {/* ── Label + headline ── */}
          <div style={{ marginBottom: "44px" }}>
            <div style={{ ...fu(0.05), display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "4px 13px", borderRadius: "100px", marginBottom: "18px",
              background: `${G}0d`, border: `1px solid ${G}38`,
              fontFamily: "'DM Mono',monospace", fontSize: "10px", color: G,
              letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
                animation: "liveBlink 2s ease-in-out infinite" }} />
              Live Demo
            </div>

            <h2 style={{ ...fu(0.12), fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(30px,4.2vw,56px)", lineHeight: 1.05, letterSpacing: "-1.5px",
              marginBottom: "12px", maxWidth: "680px",
              color: tk.text, transition: "color .35s" }}>
              Watch Fraud Get{" "}
              <span style={{ color: G }}>Caught Instantly.</span>
            </h2>

            <p style={{ ...fu(0.2), fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 300,
              color: tk.textSub, lineHeight: 1.72, maxWidth: "500px",
              transition: "color .35s" }}>
              A seller uploads a &quot;clean&quot; report. Watch what happens next.
            </p>
          </div>

          {/* ── Two-col layout ── */}
          <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* LEFT — terminal + pipeline */}
            <div style={{ flex: "1 1 340px", minWidth: "300px" }}>

              {/* Terminal header */}
              <div style={{ ...fu(0.25), borderRadius: "12px 12px 0 0", overflow: "hidden",
                background: tk.bgCard,          // ← themed
                border: `1px solid ${tk.border}`,
                borderBottom: "none",
                transition: "background .35s, border-color .35s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderBottom: `1px solid ${tk.border}` }}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                      <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px",
                    color: tk.textMuted, letterSpacing: "0.04em", transition: "color .35s" }}>
                    odoshield / fraud-detector
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: phase === "running" ? G : phase === "done" ? R : tk.border,
                      boxShadow: phase === "running" ? `0 0 5px ${G}` : phase === "done" ? `0 0 5px ${R}` : "none",
                      animation: phase === "running" ? "liveBlink 0.8s infinite" : "none",
                      transition: "all 0.3s",
                    }} />
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
                      color: phase === "running" ? G : phase === "done" ? RL : tk.textMuted,
                      transition: "color 0.3s", letterSpacing: "0.06em" }}>
                      {phase === "running" ? "SCANNING" : phase === "done" ? "COMPLETE" : "READY"}
                    </span>
                  </div>
                </div>

                {/* Log lines */}
                <div style={{ padding: "12px 14px 14px", minHeight: "80px" }}>
                  <LogLine text="Initialising OdoShield engine…"   active={logActive} delay={0}    color={logGreen} />
                  <LogLine text="Loading VIN: MH01-AB-4421"         active={logActive} delay={300}  color={logGreen} />
                  <LogLine text="Querying Polygon RPC endpoint…"    active={logActive} delay={900}  color={logGreen} />
                  <LogLine text="Retrieved 6 historical anchors"     active={logActive} delay={1800} color={logGreen} />
                  <LogLine text="Running hash comparison engine…"    active={logActive} delay={2600} color={logGreen} />
                  <LogLine text="⚠  MISMATCH DETECTED at anchor #3" active={logActive} delay={3400} color={RL}       />
                  <LogLine text="Δ km: 55,000 · Scoring risk…"       active={logActive} delay={4000} color={RL}       />
                  <LogLine text="✗  VERDICT: FRAUD_DETECTED"         active={logActive} delay={4800} color={R}        />
                </div>
              </div>

              {/* Pipeline steps */}
              <div style={{ ...fu(0.28), borderRadius: "0 0 12px 12px",
                background: tk.bgInset,         // ← themed
                border: `1px solid ${tk.border}`,
                borderTop: `1px solid ${G}18`,
                padding: "10px",
                transition: "background .35s, border-color .35s" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {PIPELINE.map((step, i) => (
                    <PipelineRow
                      key={step.id} step={step} status={getStatus(i)} index={i}
                      textColor={tk.text} textMuted={tk.textMuted}
                    />
                  ))}
                </div>

                {/* Replay button */}
                <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={runDemo}
                    disabled={phase === "running"}
                    style={{
                      fontFamily: "'DM Mono',monospace", fontSize: "11px",
                      padding: "7px 16px", borderRadius: "7px",
                      cursor: phase === "running" ? "not-allowed" : "pointer",
                      background: phase === "running" ? tk.bgInset : `${G}12`,
                      border: `1px solid ${phase === "running" ? tk.border : G + "30"}`,
                      color: phase === "running" ? tk.textMuted : G,
                      letterSpacing: "0.05em", transition: "all 0.2s",
                    }}
                  >
                    {phase === "running" ? "Scanning…" : "↺ Run Again"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — result card + punchline */}
            <div style={{ flex: "1 1 300px", minWidth: "280px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Placeholder while running */}
              {!showResult && (
                <div style={{
                  ...fu(0.3),
                  borderRadius: "14px", padding: "32px 24px",
                  background: tk.bgCard,        // ← themed
                  border: `1px solid ${tk.border}`,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                  minHeight: "280px", justifyContent: "center",
                  transition: "background .35s, border-color .35s",
                }}>
                  {phase === "idle" && (
                    <>
                      <div style={{ width: "48px", height: "48px", borderRadius: "14px",
                        background: `${G}10`, border: `1px solid ${G}20`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                        🛡
                      </div>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
                        color: tk.textMuted, letterSpacing: "0.06em", textAlign: "center",
                        transition: "color .35s" }}>
                        Verdict will appear here
                      </span>
                    </>
                  )}
                  {phase === "running" && (
                    <>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%",
                        border: `3px solid ${G}20`, borderTop: `3px solid ${G}`,
                        animation: "spinLoader 0.9s linear infinite" }} />
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
                        color: `${G}80`, letterSpacing: "0.06em", animation: "liveBlink 1.2s infinite" }}>
                        Analysing on-chain data…
                      </span>
                    </>
                  )}
                </div>
              )}

              {showResult && <ResultCard visible={showResult} loss={loss} green={G} />}

              {/* Punchline */}
              <div style={{
                ...fu(0.4), padding: "18px 20px", borderRadius: "12px",
                background: `${G}08`, border: `1px solid ${G}25`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg,transparent,${G},transparent)` }} />
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800,
                  fontSize: "clamp(16px,2vw,22px)", color: tk.text,
                  margin: "0 0 6px", lineHeight: 1.25, letterSpacing: "-0.3px",
                  transition: "color .35s" }}>
                  This isn&apos;t a guess.
                </p>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700,
                  fontSize: "clamp(16px,2vw,22px)", color: G,
                  margin: "0 0 10px", lineHeight: 1.25, letterSpacing: "-0.3px" }}>
                  It&apos;s cryptographic proof.
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300,
                  fontSize: "13px", color: tk.textMuted, lineHeight: 1.7, margin: 0,
                  transition: "color .35s" }}>
                  Every result is backed by an immutable on-chain hash. No human judgement,
                  no guesswork — just math and the blockchain.
                </p>

                <div style={{ display: "flex", gap: "6px", marginTop: "14px", flexWrap: "wrap" as const }}>
                  {["Polygon Network", "SHA-3 Hashing", "Zero-Trust Model"].map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'DM Mono',monospace", fontSize: "9px",
                      padding: "3px 9px", borderRadius: "5px", letterSpacing: "0.05em",
                      background: `${G}0e`, border: `1px solid ${G}25`, color: `${G}cc`,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bridge ── */}
          <div style={{ ...fu(0.75), marginTop: "44px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ flex: 1, maxWidth: "260px", height: "1px",
              background: `linear-gradient(90deg,${G}44,transparent)` }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
              color: tk.textMuted, letterSpacing: "0.06em", transition: "color .35s" }}>
              Every buyer deserves this protection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              style={{ animation: "arrowBounce 1.6s ease-in-out infinite" }}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke={`${G}88`} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
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