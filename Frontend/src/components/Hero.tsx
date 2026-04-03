import { useEffect, useRef, useState } from "react";
import { useTokens } from "./ThemeContext";

interface StatItem   { num: string; accent: string; label: string; }
interface TickerItem { hash: string; text: string; }

const STATS: StatItem[] = [
  { num: "2.4",  accent: "M+",  label: "VINs Verified"   },
  { num: "₹340", accent: "Cr",  label: "Fraud Prevented" },
  { num: "99.",  accent: "1%",  label: "Accuracy"        },
  { num: "<",    accent: "3s",  label: "Verdict Time"    },
];

const TYPEWRITER_LINES = [
  "Verify its truth.",
  "Detect the fraud.",
  "Know the real price.",
  "Trust the chain.",
];

const TICKER_ITEMS: TickerItem[] = [
  { hash: "0x4a2f…9b1c", text: "MH01-AB-1234 · 62,000km anchored"  },
  { hash: "0x8d3e…2a7f", text: "DL5S-CD-1234 · Fraud flag raised"  },
  { hash: "0x1c9a…6e3b", text: "KA03-MN-5678 · Service verified"   },
  { hash: "0xf72c…1d4a", text: "TN07-BZ-9012 · Insurance matched"  },
  { hash: "0x39b1…8c5d", text: "GJ01-XX-3456 · 42,000km anchored"  },
  { hash: "0xc4e8…7f2a", text: "RJ14-CD-7890 · Hash mismatch ⚠"   },
];

const SCORE_SEGMENTS = [
  { label: "Odometer",  score: 92 },
  { label: "Service",   score: 88 },
  { label: "Insurance", score: 95 },
  { label: "Ownership", score: 78 },
];

const VERDICTS = [
  { dotBg: "#00DC82", dotGlow: "rgba(0,220,130,.7)",  title: "Verified Buy",  titleC: "#00DC82", sub: "All records match on-chain",  price: "Fair price ✓",      priceC: "#00DC82", trustScore: 89 },
  { dotBg: "#6B7A8D", dotGlow: "transparent",          title: "Blind Buy",    titleC: "#6B7A8D", sub: "Partial history available",   price: "Negotiate ₹40K",   priceC: "#FFC107", trustScore: 61 },
  { dotBg: "#FF4757", dotGlow: "rgba(255,71,87,.6)",   title: "Fraud Alert",  titleC: "#FF4757", sub: "Mileage rollback detected",   price: "Overpaying ₹1.2L", priceC: "#FF4757", trustScore: 21 },
];

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(lines: string[], speed = 55, pause = 1600, del = 30): string {
  const [display, setDisplay] = useState("");
  const [li, setLi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [phase, setPhase] = useState<"typing"|"deleting">("typing");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const cur = lines[li];
    if (phase === "typing") {
      if (ci < cur.length) { t = setTimeout(() => { setDisplay(cur.slice(0,ci+1)); setCi(c=>c+1); }, speed); }
      else { t = setTimeout(() => setPhase("deleting"), pause); }
    } else {
      if (ci > 0) { t = setTimeout(() => { setDisplay(cur.slice(0,ci-1)); setCi(c=>c-1); }, del); }
      else { setLi(i=>(i+1)%lines.length); setPhase("typing"); }
    }
    return () => clearTimeout(t);
  }, [phase,ci,li,lines,speed,pause,del]);
  return display;
}

// ─── VIN Trust Panel ─────────────────────────────────────────────────────────
function VinTrustPanel() {
  const tk = useTokens();
  const G  = tk.green;
  const [visible, setVisible]     = useState(false);
  const [activeVin, setActiveVin] = useState(0);
  const [scanning, setScanning]   = useState(false);
  const [scanDone, setScanDone]   = useState(true);
  const [scanLine, setScanLine]   = useState(0);
  const vins = ["MH01-AB-4421", "DL5S-CD-9987", "KA03-MN-3312"];
  const v    = VERDICTS[activeVin];

  useEffect(() => { const t = setTimeout(()=>setVisible(true),300); return ()=>clearTimeout(t); },[]);

  useEffect(() => {
    if (!scanning) return;
    let f: ReturnType<typeof setInterval>; let p = 0;
    f = setInterval(()=>{ p+=3; setScanLine(p); if(p>=100){clearInterval(f);setScanning(false);setScanDone(true);} },18);
    return ()=>clearInterval(f);
  },[scanning]);

  const handleScan = () => {
    setActiveVin(n=>(n+1)%vins.length); setScanDone(false); setScanning(true); setScanLine(0);
  };

  const verdictBg    = v.trustScore>70?`${G}0e`:v.trustScore>45?"rgba(107,122,141,.1)":"rgba(255,71,87,.08)";
  const verdictBorder= v.trustScore>70?`${G}28`:v.trustScore>45?"rgba(107,122,141,.2)":"rgba(255,71,87,.25)";

  return (
    <div style={{ width:"100%",maxWidth:"440px",position:"relative",
      opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)",
      transition:"opacity .8s .4s ease,transform .8s .4s ease" }}>

      <div style={{ position:"absolute",inset:"-24px",borderRadius:"20px",
        background:`radial-gradient(ellipse at 50% 50%,${G}07 0%,transparent 68%)`,
        filter:"blur(20px)",pointerEvents:"none" }} />

      <div style={{ position:"relative",borderRadius:"14px",overflow:"hidden",
        background:tk.bgCard, border:`1px solid ${tk.border}`,
        backdropFilter:"blur(18px)",
        boxShadow:"0 24px 64px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.05)",
        transition:"background .35s,border-color .35s" }}>

        {/* Titlebar */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"11px 16px",borderBottom:`1px solid ${tk.border}` }}>
          <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
            <div style={{ display:"flex",gap:"5px" }}>
              {["#FF5F57","#FEBC2E","#28C840"].map(c=>(
                <div key={c} style={{ width:"10px",height:"10px",borderRadius:"50%",background:c }} />
              ))}
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:tk.textMuted }}>
              odoshield / vin-trust-score
            </span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"5px" }}>
            <div style={{ width:"5px",height:"5px",borderRadius:"50%",background:G,
              boxShadow:`0 0 5px ${G}80`,animation:"hs-live 2s infinite" }} />
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"10px",color:`${G}b0` }}>LIVE</span>
          </div>
        </div>

        {/* Scanner */}
        <div style={{ padding:"12px 16px 0" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px" }}>
            <div style={{ flex:1,background:tk.bgInset,border:`1px solid ${tk.border}`,
              borderRadius:"8px",padding:"8px 12px",display:"flex",alignItems:"center",gap:"8px",
              position:"relative",overflow:"hidden",transition:"background .35s,border-color .35s" }}>
              {scanning&&<div style={{ position:"absolute",top:0,bottom:0,left:`${scanLine}%`,
                width:"2px",background:`linear-gradient(180deg,transparent,${G},transparent)`,
                pointerEvents:"none" }} />}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                {[[3,3],[3,10],[10,3],[3,17],[17,3],[17,17]].map(([x,y])=>(
                  <rect key={`${x}${y}`} x={x} y={y} width="4" height="4" rx=".5" fill={`${G}99`}/>
                ))}
                <rect x="10" y="10" width="4" height="4" rx=".5" fill={`${tk.text}22`}/>
              </svg>
              <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"12px",letterSpacing:".06em",
                color:scanDone?tk.text:tk.textMuted,transition:"color .3s" }}>
                {vins[activeVin]}
              </span>
              {scanDone&&<span style={{ marginLeft:"auto",fontFamily:"'DM Mono',monospace",
                fontSize:"9px",color:G }}>VERIFIED ✓</span>}
            </div>
            <button onClick={handleScan} disabled={scanning} style={{
              fontFamily:"'DM Mono',monospace",fontSize:"11px",fontWeight:500,
              padding:"8px 14px",borderRadius:"8px",border:`1px solid ${G}44`,
              background:`${G}12`,color:G,cursor:scanning?"not-allowed":"pointer",
              opacity:scanning?.5:1,transition:"all .2s",whiteSpace:"nowrap" as const }}>
              {scanning?"Scanning…":"Try VIN →"}
            </button>
          </div>
        </div>

        {/* Trust ring + bars */}
        <div style={{ padding:"0 16px 12px",display:"flex",gap:"12px",alignItems:"flex-start" }}>
          <div style={{ flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"3px" }}>
            <div style={{ position:"relative",width:"76px",height:"76px" }}>
              <svg width="76" height="76" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="38" cy="38" r="31" fill="none" stroke={`${tk.text}12`} strokeWidth="6"/>
                <circle cx="38" cy="38" r="31" fill="none"
                  stroke={v.trustScore>70?G:v.trustScore>45?"#FFC107":"#FF4757"}
                  strokeWidth="6"
                  strokeDasharray={`${2*Math.PI*31*(v.trustScore/100)} ${2*Math.PI*31}`}
                  strokeLinecap="round"
                  style={{ transition:"stroke-dasharray 1s ease,stroke .5s ease" }}/>
              </svg>
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"18px",
                  color:tk.text,lineHeight:1,transition:"color .35s" }}>{v.trustScore}</span>
                <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"8px",
                  color:tk.textMuted,letterSpacing:".06em" }}>/100</span>
              </div>
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"8px",color:tk.textMuted,
              letterSpacing:".06em",textTransform:"uppercase" as const }}>Trust Score</span>
          </div>
          <div style={{ flex:1,display:"flex",flexDirection:"column",gap:"6px" }}>
            {SCORE_SEGMENTS.map(s=>{
              const adj = v.trustScore>70?s.score:v.trustScore>45?Math.round(s.score*.68):Math.round(s.score*.22);
              const barC= adj>70?G:adj>45?"#FFC107":"#FF4757";
              return (
                <div key={s.label}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"3px" }}>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:tk.textMuted,
                      letterSpacing:".05em",textTransform:"uppercase" as const }}>{s.label}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:barC }}>{adj}%</span>
                  </div>
                  <div style={{ height:"4px",borderRadius:"2px",background:`${tk.text}10`,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${adj}%`,borderRadius:"2px",background:barC,
                      transition:"width .9s ease,background .4s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ height:"1px",background:tk.border,margin:"0 16px" }} />

        {/* Verdict */}
        <div style={{ margin:"10px 16px 12px",display:"flex",alignItems:"center",gap:"10px",
          padding:"10px 14px",borderRadius:"10px",
          background:verdictBg,border:`1px solid ${verdictBorder}`,transition:"all .4s" }}>
          <div style={{ width:"8px",height:"8px",borderRadius:"50%",background:v.dotBg,
            boxShadow:`0 0 7px ${v.dotGlow}`,flexShrink:0,transition:"background .4s" }} />
          <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"12px",
            color:v.titleC,letterSpacing:".04em",transition:"color .4s" }}>{v.title}</span>
          <span style={{ marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontSize:"10px",
            color:v.priceC }}>{v.price}</span>
        </div>

        {/* Anchor chips */}
        <div style={{ padding:"0 16px 12px",display:"flex",gap:"6px" }}>
          {["Odo hash","Service","Insurance"].map((tag,i)=>(
            <div key={tag} style={{ flex:1,background:tk.bgInset,border:`1px solid ${tk.border}`,
              borderRadius:"7px",padding:"6px 8px",transition:"background .35s,border-color .35s" }}>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"8px",color:tk.textMuted,
                letterSpacing:".07em",textTransform:"uppercase" as const,marginBottom:"3px" }}>{tag}</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",
                color:i===1&&v.trustScore<45?"#FF4757":G }}>
                {i===1&&v.trustScore<45?"✗ Mismatch":"✓ Anchored"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div style={{ position:"absolute",bottom:"-14px",right:"-10px",
        background:tk.bgCard,border:`1px solid ${tk.border}`,
        backdropFilter:"blur(14px)",borderRadius:"10px",padding:"8px 12px",
        pointerEvents:"none",boxShadow:"0 6px 24px rgba(0,0,0,.15)",
        animation:"hs-float 7s ease-in-out infinite",
        transition:"background .35s,border-color .35s" }}>
        <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",color:tk.textMuted,
          letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"3px" }}>Polygon Network</div>
        <div style={{ fontFamily:"'DM Mono',monospace",fontSize:"11px",color:G,fontWeight:500 }}>Block #42,891,334</div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const tk         = useTokens();
  const G          = tk.green;
  const tickerRef  = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const typeText   = useTypewriter(TYPEWRITER_LINES);
  const doubled    = [...TICKER_ITEMS, ...TICKER_ITEMS];

  useEffect(()=>{ setMounted(true); },[]);

  const fu = (d:number): React.CSSProperties => ({
    opacity: mounted?1:0,
    transform: mounted?"translateY(0)":"translateY(16px)",
    transition:`opacity .75s ${d}s ease,transform .75s ${d}s ease`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        @keyframes hs-grid  { 0%,100%{opacity:.5} 50%{opacity:.85} }
        @keyframes hs-orb1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,36px)} }
        @keyframes hs-orb2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-24px,-28px)} }
        @keyframes hs-tick  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes hs-live  { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes hs-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes hs-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

        .hs-grid-bg { background-size:48px 48px; animation:hs-grid 8s ease-in-out infinite; }
        .hs-orb1    { animation:hs-orb1 12s ease-in-out infinite; }
        .hs-orb2    { animation:hs-orb2 14s ease-in-out infinite; }
        .hs-ticker  { animation:hs-tick 28s linear infinite; }
        .hs-cursor  { display:inline-block;width:3px;height:.8em;background:#00DC82;margin-left:3px;vertical-align:middle;border-radius:1px;animation:hs-blink 1s step-end infinite; }

        .hs-cta-p { transition:all .18s; }
        .hs-cta-p:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(0,220,130,.3) !important; }
        .hs-cta-s { transition:all .18s; }
        .hs-cta-s:hover { border-color:rgba(0,220,130,.45) !important; color:#00DC82 !important; }
        .hs-stat+.hs-stat { border-left-style:solid; border-left-width:1px; }

        @media(max-width:1023px){ .hs-rpanel{display:none!important} }
      `}</style>

      <section style={{
        position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",
        overflow:"hidden",background:tk.bg,color:tk.text,
        fontFamily:"'Inter',sans-serif",paddingTop:"56px",
        transition:"background .35s ease,color .35s ease",
      }}>
        {/* Grid */}
        <div className="hs-grid-bg" style={{ position:"absolute",inset:0,
          backgroundImage:`linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)` }} />

        {/* Orbs */}
        <div className="hs-orb1" style={{ position:"absolute",width:"520px",height:"520px",
          top:"-160px",left:"-80px",borderRadius:"50%",background:tk.orb1,filter:"blur(70px)",pointerEvents:"none" }} />
        <div className="hs-orb2" style={{ position:"absolute",width:"420px",height:"420px",
          bottom:"-60px",right:"0",borderRadius:"50%",background:tk.orb2,filter:"blur(70px)",pointerEvents:"none" }} />

        {/* Body */}
        <div style={{ position:"relative",zIndex:10,flex:1,display:"flex",alignItems:"center",
          maxWidth:"1180px",margin:"0 auto",width:"100%",padding:"32px 32px 40px",gap:"48px" }}>

          {/* LEFT */}
          <div style={{ flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"flex-start" }}>

            {/* Badge */}
            <div style={{ ...fu(.08),display:"inline-flex",alignItems:"center",gap:"7px",
              padding:"5px 13px",borderRadius:"100px",marginBottom:"18px",
              background:`${G}0d`,border:`1px solid ${G}38`,color:G,
              fontFamily:"'DM Mono',monospace",fontSize:"10px",
              letterSpacing:".08em",textTransform:"uppercase" as const }}>
              <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:G,
                animation:"hs-live 2s ease-in-out infinite" }} />
              Your Vehicle Trust Layer
            </div>

            {/* Headline */}
            <h1 style={{ ...fu(.18),fontFamily:"'Syne',sans-serif",fontWeight:800,
              lineHeight:1.0,letterSpacing:"-2px",fontSize:"clamp(36px,5vw,66px)",marginBottom:"14px" }}>
              <div>Don&apos;t buy a car.</div>
              <div style={{ color:G,minHeight:"1.05em" }}>
                {typeText}<span className="hs-cursor" />
              </div>
            </h1>

            {/* Sub */}
            <p style={{ ...fu(.3),fontSize:"clamp(13px,1.5vw,15px)",fontWeight:300,
              color:tk.textSub,lineHeight:1.7,maxWidth:"480px",marginBottom:"24px",
              transition:"color .35s" }}>
              OdoShield is a blockchain-backed fraud detection engine for used car buyers.
              Paste a VIN — get a tamper-proof verdict and exact financial risk in seconds.
            </p>

            {/* CTAs */}
            <div style={{ ...fu(.42),display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"28px" }}>
              <button className="hs-cta-p" style={{
                background:`linear-gradient(135deg,${G},${tk.greenDark})`,color:"#050A0F",
                fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"14px",
                padding:"11px 24px",borderRadius:"9px",border:"none",cursor:"pointer",letterSpacing:"-.1px" }}>
                Check VIN for Free
              </button>
              <button className="hs-cta-s" style={{
                display:"flex",alignItems:"center",gap:"7px",background:"transparent",
                border:`1px solid ${tk.border}`,color:tk.textSub,fontSize:"14px",
                padding:"11px 20px",borderRadius:"9px",cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                </svg>
                See How It Works
              </button>
            </div>

            {/* Stats */}
            <div style={{ ...fu(.55),display:"flex",border:`1px solid ${tk.border}`,
              borderRadius:"10px",overflow:"hidden",background:tk.bgInset,
              transition:"all .35s" }}>
              {STATS.map((s,i)=>(
                <div key={s.label} className={i>0?"hs-stat":""} style={{
                  padding:"12px 18px",textAlign:"center",
                  borderLeftColor:tk.border,
                }}>
                  <span style={{ display:"block",fontFamily:"'Syne',sans-serif",fontWeight:700,
                    fontSize:"20px",color:tk.text,marginBottom:"1px",transition:"color .35s" }}>
                    {s.num}<em style={{ fontStyle:"normal",color:G }}>{s.accent}</em>
                  </span>
                  <span style={{ fontFamily:"'DM Mono',monospace",fontSize:"9px",
                    textTransform:"uppercase" as const,letterSpacing:".07em",
                    color:tk.textMuted,transition:"color .35s" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hs-rpanel" style={{ flexShrink:0,width:"min(440px,46%)",
            display:"flex",justifyContent:"flex-end" }}>
            <VinTrustPanel />
          </div>
        </div>

        {/* Ticker */}
        <div style={{ position:"relative",overflow:"hidden",borderTop:`1px solid ${G}14`,
          background:`${G}03`,zIndex:10,padding:"8px 0",
          transition:"background .35s,border-color .35s" }}>
          <div ref={tickerRef} className="hs-ticker"
            style={{ display:"flex",whiteSpace:"nowrap",width:"max-content" }}>
            {doubled.map((item,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:"7px",padding:"0 28px",
                fontFamily:"'DM Mono',monospace",fontSize:"10px",color:`${G}60`,letterSpacing:".04em" }}>
                <span style={{ background:tk.bgInset,border:`1px solid ${G}22`,
                  color:`${G}70`,borderRadius:"3px",padding:"1px 6px" }}>{item.hash}</span>
                <span style={{ color:tk.textMuted }}>{item.text}</span>
                <span style={{ marginLeft:"28px",color:`${G}20` }}>|</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}