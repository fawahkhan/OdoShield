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

// ─── Static data (icons are functions to receive the green token) ─────────────
const makeBenefits = (G: string, R: string) => [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L28 9v7c0 7-5 12-12 13C9 28 4 23 4 16V9L16 3z" stroke={G} strokeWidth="1.5"/>
        <path d="M11 16l3.5 3.5L21 13" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Avoid Six-Figure Losses",
    body: "The average odometer fraud costs buyers ₹1–2L. OdoShield catches it before you sign anything.",
    metric: "₹2,30,000",
    metricSub: "avg. fraud loss prevented",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke={G} strokeWidth="1.5"/>
        <path d="M10 16l4 4 8-8" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Confident Buying Decisions",
    body: "Stop guessing. Get a cryptographically verified verdict in under 3 seconds — green means go.",
    metric: "< 3s",
    metricSub: "to a verified verdict",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.5 7.5H26l-6.5 4.5 2.5 7.5L16 19l-6 4.5 2.5-7.5L6 11.5h7.5L16 4z"
          stroke={G} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Reward Honest Sellers",
    body: "Sellers with clean blockchain records stand out. Verified history commands a better price and faster sales.",
    metric: "3×",
    metricSub: "faster sale for verified VINs",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="9" stroke={G} strokeWidth="1.5"/>
        <path d="M21 21l6 6" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 11l6 6M17 11l-6 6" stroke={R} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Detect Fraud Instantly",
    body: "Our engine compares live submissions against immutable blockchain anchors. Manipulation has nowhere to hide.",
    metric: "99.1%",
    metricSub: "fraud detection accuracy",
  },
];

const TESTIMONIALS = [
  {
    quote: "I almost paid ₹8.5L for a car worth ₹6.2L. OdoShield flagged it in 2 seconds. Saved my entire budget.",
    name: "Rohan M.",
    role: "Used car buyer, Pune",
    avatar: "RM",
  },
  {
    quote: "We integrated OdoShield into our dealership flow. Fraud complaints dropped to zero in 3 months.",
    name: "Priya S.",
    role: "Operations Head, AutoZone Delhi",
    avatar: "PS",
  },
  {
    quote: "The blockchain proof gave me the confidence to negotiate ₹40K off. The seller couldn't argue with the data.",
    name: "Arjun K.",
    role: "First-time buyer, Bengaluru",
    avatar: "AK",
  },
];

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({
  b, index, inView, green, textColor, textMuted, bgInset, border,
}: {
  b: ReturnType<typeof makeBenefits>[0];
  index: number; inView: boolean;
  green: string; textColor: string; textMuted: string; bgInset: string; border: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 220px", minWidth: "200px",
        borderRadius: "14px", padding: "22px 20px",
        background: hovered ? `${green}08` : bgInset,          // ← themed
        border: `1px solid ${hovered ? green + "30" : border}`, // ← themed
        boxShadow: hovered ? `0 0 28px ${green}0c` : "none",
        transition: "all 0.28s ease",
        cursor: "default",
        position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Top glow on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg,transparent,${green},transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: "50px", height: "50px", borderRadius: "12px",
        background: hovered ? `${green}14` : `${green}0c`,
        border: `1px solid ${hovered ? green + "30" : green + "18"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "14px", transition: "all 0.3s",
      }}>
        {b.icon}
      </div>

      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "16px",
        color: textColor, marginBottom: "8px", letterSpacing: "-0.2px",
        transition: "color .35s" }}>
        {b.title}
      </h3>

      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "13px",
        color: textMuted, lineHeight: 1.7, margin: "0 0 14px",
        transition: "color .35s" }}>
        {b.body}
      </p>

      {/* Metric pill */}
      <div style={{
        display: "inline-flex", alignItems: "baseline", gap: "6px",
        padding: "5px 12px", borderRadius: "100px",
        background: `${green}0d`, border: `1px solid ${green}22`,
      }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "15px", color: green }}>{b.metric}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: `${green}80`,
          letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{b.metricSub}</span>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({
  t, index, inView, green, greenDark, textColor, textMuted, bgInset, border, bgBase,
}: {
  t: typeof TESTIMONIALS[0]; index: number; inView: boolean;
  green: string; greenDark: string; textColor: string; textMuted: string;
  bgInset: string; border: string; bgBase: string;
}) {
  return (
    <div style={{
      flex: "1 1 240px", minWidth: "220px",
      borderRadius: "12px", padding: "18px 20px",
      background: bgInset,              // ← themed
      border: `1px solid ${border}`,   // ← themed
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.7s ${0.55 + index * 0.12}s ease, transform 0.7s ${0.55 + index * 0.12}s ease, background .35s, border-color .35s`,
    }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "32px", color: `${green}30`,
        lineHeight: 1, marginBottom: "10px", userSelect: "none" }}>"</div>
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "13px",
        color: textMuted, lineHeight: 1.72, margin: "0 0 16px",
        transition: "color .35s" }}>
        {t.quote}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: `linear-gradient(135deg,${green},${greenDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "11px",
          color: bgBase,                // ← themed (dark text on green avatar)
        }}>{t.avatar}</div>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "12px",
            color: textColor, transition: "color .35s" }}>{t.name}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px",
            color: textMuted, letterSpacing: "0.05em", marginTop: "1px",
            transition: "color .35s" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TRUST SECTION
// ═════════════════════════════════════════════════════════════════════════════
export function TrustSection() {
  const tk = useTokens();
  const G  = tk.green;
  const GD = tk.greenDark;
  const R  = "#FF4757";

  const BENEFITS = makeBenefits(G, R);

  const { ref, inView } = useInView(0.12);
  const anim = fu(inView);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        @keyframes glowPulse  { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
        @keyframes liveBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
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
          backgroundSize: "48px 48px", animation: "glowPulse 8s ease-in-out infinite" }} />

        {/* Orbs */}
        <div style={{ position: "absolute", width: "420px", height: "420px", top: "-80px", left: "-60px",
          borderRadius: "50%", background: tk.orb1,    // ← themed
          filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "380px", height: "380px", bottom: "-60px", right: "-40px",
          borderRadius: "50%", background: `radial-gradient(circle,rgba(30,120,255,0.07) 0%,transparent 68%)`,
          filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>

          {/* Label */}
          <div style={{ ...anim(0.05), display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 13px", borderRadius: "100px", marginBottom: "18px",
            background: `${G}0d`, border: `1px solid ${G}38`,
            fontFamily: "'DM Mono',monospace", fontSize: "10px", color: G,
            letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G,
              animation: "liveBlink 2s ease-in-out infinite" }} />
            Why OdoShield
          </div>

          {/* Headline */}
          <h2 style={{ ...anim(0.12), fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(30px,4vw,54px)", lineHeight: 1.05, letterSpacing: "-1.5px",
            marginBottom: "10px", maxWidth: "640px",
            color: tk.text, transition: "color .35s" }}>        {/* ← themed */}
            Built for Buyers.{" "}
            <span style={{ color: G }}>Not for Show.</span>
          </h2>
          <p style={{ ...anim(0.2), fontSize: "14px", fontWeight: 300,
            color: tk.textSub,                                   // ← themed
            maxWidth: "480px", lineHeight: 1.75, marginBottom: "40px",
            transition: "color .35s" }}>
            Every feature is designed around one goal: making sure you never overpay for a used car again.
          </p>

          {/* Benefit cards */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" }}>
            {BENEFITS.map((b, i) => (
              <div key={b.title} style={{
                flex: "1 1 220px", minWidth: "200px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ${0.28 + i * 0.1}s ease, transform 0.7s ${0.28 + i * 0.1}s ease`,
              }}>
                <BenefitCard
                  b={b} index={i} inView={inView}
                  green={G} textColor={tk.text} textMuted={tk.textMuted}
                  bgInset={tk.bgInset} border={tk.border}
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ ...anim(0.45), height: "1px", marginBottom: "40px",
            background: `linear-gradient(90deg,transparent,${G}28,transparent)` }} />

          {/* Testimonials label */}
          <div style={{ ...anim(0.48), fontFamily: "'DM Mono',monospace", fontSize: "9px",
            color: `${G}70`, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            marginBottom: "16px" }}>
            What buyers say
          </div>

          {/* Testimonial cards */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.name} t={t} index={i} inView={inView}
                green={G} greenDark={GD} textColor={tk.text} textMuted={tk.textMuted}
                bgInset={tk.bgInset} border={tk.border} bgBase={tk.bg}
              />
            ))}
          </div>

          {/* Bridge */}
          <div style={{ ...anim(0.78), marginTop: "44px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ flex: 1, maxWidth: "240px", height: "1px",
              background: `linear-gradient(90deg,${G}44,transparent)` }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px",
              color: tk.textMuted, letterSpacing: "0.06em", transition: "color .35s" }}>
              Ready to protect your purchase?
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
          background: `linear-gradient(transparent,${tk.bg}99)`,  // ← themed
          pointerEvents: "none", transition: "background .35s" }} />
      </section>
    </>
  );
}