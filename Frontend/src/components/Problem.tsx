import { useEffect, useRef, useState } from "react";
import { useTokens } from "./ThemeContext";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref  = useRef<HTMLDivElement>(null);
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

function useCountUp(target: number, duration = 1500, active = false): number {
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

// ─── Small helpers ────────────────────────────────────────────────────────────
const Mono = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{ fontFamily: "'DM Mono',monospace", ...style }}>{children}</span>
);

// Tag now receives the green token from outside
const Tag = ({ text, delay, green }: { text: string; delay: number; green: string }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "5px 12px", borderRadius: "6px",
    background: `${green}0d`, border: `1px solid ${green}2e`,
    fontFamily: "'DM Mono',monospace", fontSize: "11px", color: `${green}cc`,
    letterSpacing: "0.03em",
    animation: `tagFloat ${2.6 + delay}s ease-in-out ${delay}s infinite`,
  }}>
    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF4757", flexShrink: 0,
      boxShadow: "0 0 5px #FF4757" }} />
    {text}
  </div>
);

// ─── Flip card ────────────────────────────────────────────────────────────────
function FlipCard({
  flipped, onToggle, green,
}: {
  flipped: boolean; onToggle: () => void; green: string;
}) {
  const R  = "#FF4757";
  const RL = "#FF6B7A";

  const cardStyle = (base: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", inset: 0, borderRadius: "14px", overflow: "hidden",
    backfaceVisibility: "hidden", padding: "18px 20px", ...base,
  });

  return (
    <div style={{ width: "100%", maxWidth: "360px" }}>
      <div style={{ perspective: "1000px", height: "210px" }}>
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.72s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* FRONT */}
          <div style={cardStyle({
            background: "rgba(12,22,34,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
          })}>
            <CardHeader badge="Seller Claim" badgeColor={`${green}66`} dotColor="#FFC107"
              dotGlow="rgba(255,193,7,0.6)" status="Unverified" />
            <CardRow label="Mileage"   value="40,000 km"      />
            <CardRow label="Service"   value="6 / 6 complete" />
            <CardRow label="Ownership" value="Single Owner"   />
            <CardRow label="Ask Price" value="₹8,50,000"      large />
            {!flipped && (
              <div style={{ position: "absolute", bottom: "10px", right: "14px" }}>
                <Mono style={{ fontSize: "9px", color: "rgba(232,237,242,0.2)", letterSpacing: "0.06em" }}>
                  revealing truth…
                </Mono>
              </div>
            )}
          </div>

          {/* BACK */}
          <div style={{
            ...cardStyle({
              background: "rgba(16,8,10,0.96)",
              border: `1px solid ${R}44`,
            }),
            transform: "rotateY(180deg)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: `linear-gradient(90deg,transparent,${R},transparent)` }} />
            <CardHeader badge="Reality" badgeColor={`${R}22`} dotColor={R}
              dotGlow={`${R}99`} status="Fraud Detected" statusRed />
            <CardRow label="Mileage"    value="95,000 km"    fraud />
            <CardRow label="Service"    value="2 / 6 genuine" fraud />
            <CardRow label="Ownership"  value="3rd Owner"    fraud />
            <CardRow label="Real Value" value="₹6,20,000"   large fraud />
          </div>
        </div>
      </div>

      <button onClick={onToggle} style={{
        marginTop: "10px", width: "100%",
        background: flipped ? "rgba(255,71,87,0.07)" : `${green}12`,
        border: `1px solid ${flipped ? R + "33" : green + "33"}`,
        color: flipped ? RL : green,
        fontFamily: "'DM Mono',monospace", fontSize: "11px",
        padding: "8px 0", borderRadius: "8px", cursor: "pointer",
        letterSpacing: "0.05em", transition: "all 0.2s",
      }}>
        {flipped ? "← View Seller Claim" : "Reveal Reality →"}
      </button>
    </div>
  );
}

function CardHeader({
  badge, badgeColor, dotColor, dotGlow, status, statusRed = false,
}: {
  badge: string; badgeColor: string; dotColor: string;
  dotGlow: string; status: string; statusRed?: boolean;
}) {
  const R  = "#FF4757";
  const RL = "#FF6B7A";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%",
          background: dotColor, boxShadow: `0 0 5px ${dotGlow}` }} />
        <Mono style={{ fontSize: "10px", color: badgeColor,
          letterSpacing: "0.08em", textTransform: "uppercase" }}>{badge}</Mono>
      </div>
      <Mono style={{
        fontSize: "9px", padding: "2px 8px", borderRadius: "4px",
        background: statusRed ? `${R}14` : "rgba(255,255,255,0.04)",
        border: `1px solid ${statusRed ? R + "33" : "rgba(255,255,255,0.07)"}`,
        color: statusRed ? RL : "rgba(232,237,242,0.3)",
      }}>
        {status}
      </Mono>
    </div>
  );
}

function CardRow({ label, value, large = false, fraud = false }: {
  label: string; value: string; large?: boolean; fraud?: boolean;
}) {
  const R  = "#FF4757";
  const RL = "#FF6B7A";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
      <Mono style={{ fontSize: "9px", color: "rgba(232,237,242,0.28)",
        letterSpacing: "0.07em", textTransform: "uppercase" as const }}>{label}</Mono>
      <span style={{
        fontFamily: large ? "'Syne',sans-serif" : "'DM Mono',monospace",
        fontSize: large ? "15px" : "12px", fontWeight: large ? 700 : 400,
        color: fraud ? RL : large ? "#E8EDF2" : "rgba(232,237,242,0.78)",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        {value}
        {fraud && !large && (
          <Mono style={{ fontSize: "8px", background: `${R}18`, color: RL,
            padding: "1px 5px", borderRadius: "3px" }}>✗</Mono>
        )}
      </span>
    </div>
  );
}

function CompareRow({ label, claimed, actual }: {
  label: string; claimed: string; actual: string; delay: number;
}) {
  const R  = "#FF4757";
  const RL = "#FF6B7A";
  return (
    <div style={{
      display: "flex", alignItems: "stretch", borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
    }}>
      <div style={{ padding: "8px 10px", background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.06)", minWidth: "72px",
        display: "flex", alignItems: "center" }}>
        <Mono style={{ fontSize: "9px", color: "rgba(232,237,242,0.28)",
          letterSpacing: "0.07em", textTransform: "uppercase" as const }}>{label}</Mono>
      </div>
      <div style={{ flex: 1, padding: "8px 10px",
        borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center" }}>
        <Mono style={{ fontSize: "11px", color: "rgba(255,193,7,0.7)" }}>{claimed}</Mono>
      </div>
      <div style={{ padding: "0 7px", background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke={`${R}66`} strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ flex: 1, padding: "8px 10px",
        background: `${R}08`, display: "flex", alignItems: "center" }}>
        <Mono style={{ fontSize: "11px", color: RL }}>{actual}</Mono>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProblemSection() {
  const tk = useTokens();
  const G  = tk.green;
  const R  = "#FF4757";
  const RL = "#FF6B7A";

  const { ref, inView } = useInView(0.15);
  const loss = useCountUp(230000, 1600, inView);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setFlipped(true), 800);
    return () => clearTimeout(t);
  }, [inView]);

  const fu = (d: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });

  const fmtINR = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        @keyframes tagFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes glowPulse   { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes lossIn      { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes arrowBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          background: tk.bg,               // ← themed
          color: tk.text,                   // ← themed
          fontFamily: "'Inter',sans-serif",
          padding: "80px 32px 88px",
          overflow: "hidden",
          transition: "background .35s ease, color .35s ease",
        }}
      >
        {/* Top border accent */}
        <div style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: `linear-gradient(90deg,transparent,${G}44,transparent)`,
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
          animation: "glowPulse 8s ease-in-out infinite",
        }} />

        {/* Orb — green left */}
        <div style={{
          position: "absolute", width: "440px", height: "440px",
          top: "-100px", left: "-80px", borderRadius: "50%",
          background: tk.orb1,             // ← themed
          filter: "blur(70px)", pointerEvents: "none",
        }} />
        {/* Orb — subtle red right (fraud accent — intentionally not themed) */}
        <div style={{
          position: "absolute", width: "320px", height: "320px",
          bottom: "0", right: "-40px", borderRadius: "50%",
          background: `radial-gradient(circle,${R}0a 0%,transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>

          {/* ── Label ── */}
          <div style={{
            ...fu(0.05), display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 13px", borderRadius: "100px", marginBottom: "18px",
            background: `${G}0d`, border: `1px solid ${G}38`,
            fontFamily: "'DM Mono',monospace", fontSize: "10px", color: G,
            letterSpacing: "0.08em", textTransform: "uppercase" as const,
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
              animation: "glowPulse 2s ease-in-out infinite" }} />
            The Problem
          </div>

          {/* ── Headline ── */}
          <h2 style={{
            ...fu(0.12), fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 1.0,
            letterSpacing: "-1.5px", marginBottom: "44px", maxWidth: "560px",
            color: tk.text,                 // ← themed
            transition: "color .35s",
          }}>
            The Used Car Market<br />
            <span style={{ color: G }}>is Rigged.</span>
          </h2>

          {/* ── Two columns ── */}
          <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "44px" }}>

            {/* LEFT — flip card */}
            <div style={fu(0.2)}>
              <FlipCard flipped={flipped} onToggle={() => setFlipped(f => !f)} green={G} />
            </div>

            {/* RIGHT */}
            <div style={{ flex: 1, minWidth: "260px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* VS divider */}
              <div style={{ ...fu(0.28), display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, height: "1px",
                  background: `linear-gradient(90deg,transparent,${G}22)` }} />
                <Mono style={{
                  fontSize: "10px", letterSpacing: "0.12em",
                  color: tk.textMuted,      // ← themed
                  padding: "3px 9px", border: `1px solid ${tk.border}`, borderRadius: "5px",
                  transition: "color .35s, border-color .35s",
                }}>VS</Mono>
                <div style={{ flex: 1, height: "1px",
                  background: `linear-gradient(90deg,${G}22,transparent)` }} />
              </div>

              {/* Compare rows */}
              <div style={{ ...fu(0.34), display: "flex", flexDirection: "column", gap: "7px" }}>
                {[
                  { label: "Mileage", claimed: "40,000 km", actual: "95,000 km", delay: 0    },
                  { label: "Price",   claimed: "₹8,50,000", actual: "₹6,20,000", delay: 0.06 },
                  { label: "Service", claimed: "6 records", actual: "2 genuine",  delay: 0.12 },
                ].map(r => <CompareRow key={r.label} {...r} />)}
              </div>

              {/* Loss box */}
              <div style={{
                ...fu(0.46), padding: "18px 20px", borderRadius: "12px",
                background: `${R}08`, border: `1px solid ${R}2e`,
                position: "relative", overflow: "hidden",
              }}>
                {/* green top strip */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg,transparent,${G},transparent)` }} />
                <Mono style={{
                  fontSize: "9px", color: `${G}80`, letterSpacing: "0.1em",
                  textTransform: "uppercase" as const, display: "block", marginBottom: "6px",
                }}>
                  Financial Loss Detected
                </Mono>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "5px" }}>
                  <span style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800,
                    fontSize: "clamp(30px,4vw,46px)", lineHeight: 1, letterSpacing: "-1px",
                    background: `linear-gradient(135deg,${R},${RL})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: inView ? "lossIn 0.5s 1.1s ease both" : "none",
                    opacity: inView ? undefined : 0,
                  }}>
                    {fmtINR(loss)}
                  </span>
                  <Mono style={{ fontSize: "11px", color: `${RL}88` }}>lost instantly</Mono>
                </div>
                <p style={{
                  fontSize: "12px", color: tk.textMuted,   // ← themed
                  lineHeight: 1.65, margin: 0, transition: "color .35s",
                }}>
                  You just lost <strong style={{ color: RL }}>₹2,30,000</strong> because of a simple odometer rollback.
                </p>
              </div>
            </div>
          </div>

          {/* ── Fraud tags ── */}
          <div style={{ ...fu(0.58), display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {[
              ["Odometer Rollback",        0    ],
              ["Fake Service Records",     0.15 ],
              ["Photoshopped PDFs",        0.3  ],
              ["Manipulated Dashboards",   0.45 ],
              ["Ownership Tampering",      0.6  ],
            ].map(([text, delay]) => (
              <Tag key={text as string} text={text as string} delay={delay as number} green={G} />
            ))}
          </div>

          {/* ── Supporting copy + mini stats ── */}
          <div style={{ ...fu(0.68), display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <p style={{
              flex: "1 1 300px", fontSize: "14px", fontWeight: 300,
              color: tk.textSub,            // ← themed
              lineHeight: 1.75, margin: 0, maxWidth: "460px",
              transition: "color .35s",
            }}>
              Fake service records. Photoshopped PDFs. Manipulated dashboards.{" "}
              <span style={{ color: tk.text, fontWeight: 400, transition: "color .35s" }}>
                Buyers are making blind decisions
              </span>{" "}
              — and paying the price. In India,{" "}
              <strong style={{ color: G, fontWeight: 500 }}>1 in 3 used cars</strong>{" "}
              has tampered data.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { val: "1 in 3",   sub: "Cars with tampered data" },
                { val: "₹8,200Cr", sub: "Lost to fraud yearly"    },
                { val: "92%",      sub: "Buyers can't detect it"  },
              ].map(s => (
                <div key={s.val} style={{
                  padding: "12px 16px", borderRadius: "10px", minWidth: "108px",
                  background: tk.bgInset,   // ← themed
                  border: `1px solid ${tk.border}`, // ← themed
                  transition: "background .35s, border-color .35s",
                  cursor: "default",
                }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: "20px", color: G, marginBottom: "3px",
                  }}>{s.val}</div>
                  <Mono style={{
                    fontSize: "9px", color: tk.textMuted, // ← themed
                    letterSpacing: "0.06em", textTransform: "uppercase" as const,
                    lineHeight: 1.45, display: "block", transition: "color .35s",
                  }}>{s.sub}</Mono>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bridge to next section ── */}
          <div style={{ ...fu(0.78), marginTop: "44px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ flex: 1, maxWidth: "260px", height: "1px",
              background: `linear-gradient(90deg,${G}44,transparent)` }} />
            <Mono style={{
              fontSize: "11px", color: tk.textMuted, // ← themed
              letterSpacing: "0.06em", transition: "color .35s",
            }}>
              OdoShield eliminates all of this
            </Mono>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              style={{ animation: "arrowBounce 1.6s ease-in-out infinite" }}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke={`${G}88`} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
          background: `linear-gradient(transparent,${tk.bg}99)`, // ← themed
          pointerEvents: "none",
          transition: "background .35s",
        }} />
      </section>
    </>
  );
}