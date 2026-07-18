"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Search,
  AlertTriangle,
  FileCheck,
  TrendingDown,
  Gauge,
  UserCheck,
  Layers,
  Sparkles,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ------------------------------------------------------------------ */
/*  Reusable Section Wrapper (triggers animation on scroll)            */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B10] text-[#E2E8F0] relative overflow-x-hidden">
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Cyberpunk Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-red-500/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[160px]" />
      </div>

      {/* ============ NAVBAR ============ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080B10]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="OdoShield"
              width={34}
              height={34}
              className="rounded-lg shadow-lg shadow-emerald-500/20"
            />
            <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              OdoShield
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/cars" className="hover:text-white transition-colors">Browse Cars</Link>
            <Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link>
            <Link href="/chat" className="hover:text-white transition-colors">AI Advisor</Link>
            <a href="#signals" className="hover:text-white transition-colors">Signals</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Process</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">
              Sign In
            </button>
            <Link href="/cars" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-900 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-emerald-500/25">
              Start Scan
            </Link>
          </div>
        </div>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                India's First Smart Car Buying Assistant & Verification Tool
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white"
            >
              Detect Fraud.<br />
              Make Smarter<br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Car Decisions.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base md:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              OdoShield combines real-time Indian car market intelligence with advanced anomaly detection to verify mileage history, flag price deviations, and suggest the absolute best deals.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <Link href="/cars" className="group w-full sm:w-auto px-8 py-4 text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-xl shadow-red-600/25 flex items-center justify-center gap-2">
                Browse Indian Cars
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/chat" className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Ask AI Advisor
              </Link>
            </motion.div>

            {/* Testimonial / Trust badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex items-center gap-4 border-t border-white/5 pt-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#080B10] overflow-hidden bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 opacity-80" />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900">U{i}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Trusted by 10,000+ car buyers & dealers</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-amber-500 text-xs">{s}</span>
                  ))}
                  <span className="text-slate-400 text-[10px] ml-1">4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Scan Tool Mockup */}
          <div className="lg:col-span-5 relative">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={2}
              className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#0F131A]/80 backdrop-blur-xl shadow-2xl p-6 overflow-hidden"
            >
              {/* Scan Tool Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">Live Analysis // Target #IN-9082</span>
                </div>
                <div className="text-xs bg-red-950/40 text-red-400 border border-red-500/25 px-2.5 py-0.5 rounded-full font-semibold">
                  Suspicious
                </div>
              </div>

              {/* Vehicle Identity */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">2024 Tata Nexon EV</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Empowered MR Variant</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Listed Price</p>
                  <p className="text-lg font-extrabold text-red-400">₹14.5 Lakh</p>
                </div>
              </div>

              {/* Spec Scan Table */}
              <div className="space-y-3.5 border-t border-white/5 pt-4 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Market Price Range</span>
                  <span className="font-semibold text-white font-mono">₹16.2 Lakh – ₹17.5 Lakh</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Listed Mileage</span>
                  <span className="font-semibold text-white font-mono">12,400 km</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Last Reported Odometer</span>
                  <span className="font-semibold text-red-400 font-mono">28,900 km (Service Center)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Title Status</span>
                  <span className="font-semibold text-emerald-400">Clean (Owner Claimed)</span>
                </div>
              </div>

              {/* Anomaly Alerts List */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-950/30 border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-red-400">Odometer Rollback Anomaly</h4>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                      Mileage reported is 16,500 km lower than the last recorded data from service history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-950/30 border border-amber-500/20">
                  <TrendingDown className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-400">High Price Deviation</h4>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                      Priced ₹1.7 Lakh below the average market range. Potential distress sale or hidden repairs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Score Block */}
              <div className="bg-[#181F2B] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-mono text-slate-400">OdoShield Trust Score</p>
                  <p className="text-xl font-black text-red-400 mt-0.5">34 / 100</p>
                </div>
                <span className="text-xs bg-red-950/60 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-lg font-bold font-mono">
                  HIGH RISK
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CORE FEATURES / SIGNALS ============ */}
      <AnimatedSection className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#0C1017]/50">
        <div id="signals" className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">
              Automated Inspection
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Six Signals. One Verdict.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              OdoShield evaluates multiple data streams instantly to verify every aspect of an Indian car listing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingDown className="w-5 h-5" />,
                title: "Price Deviation",
                desc: "Flags cars priced suspiciously below or above the average Indian market value for that specific model and variant.",
                accent: "text-red-400",
                bg: "bg-red-500/10",
              },
              {
                icon: <Gauge className="w-5 h-5" />,
                title: "Odometer Anomaly",
                desc: "Scans past service center records, registration logs, and user reports to pinpoint mileage rollbacks.",
                accent: "text-amber-400",
                bg: "bg-amber-500/10",
              },
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                title: "Safety Verification",
                desc: "Displays verified Global NCAP safety ratings for Indian cars, keeping you informed about crashworthiness.",
                accent: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: "AI RAG Chat Advisor",
                desc: "Ask our conversational AI to filter models, compare configurations, and highlight potential traps based on your needs.",
                accent: "text-cyan-400",
                bg: "bg-cyan-500/10",
              },
              {
                icon: <UserCheck className="w-5 h-5" />,
                title: "Owner History Match",
                desc: "Tracks historical ownership durations to identify dealers posing as individual sellers or frequent flips.",
                accent: "text-indigo-400",
                bg: "bg-indigo-500/10",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "Spec Comparison",
                desc: "Compare up to 4 models side-by-side. Our tool highlights spec, safety, and price differences in a single table.",
                accent: "text-purple-400",
                bg: "bg-purple-500/10",
              },
            ].map((signal, i) => (
              <motion.div
                key={signal.title}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-xl border border-white/5 bg-[#0F131A]/60 backdrop-blur-sm p-6 hover:bg-[#0F131A] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${signal.bg} mb-4`}>
                  <span className={signal.accent}>{signal.icon}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{signal.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{signal.desc}</p>
                {/* Subtle Hover glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============ HOW IT WORKS / PROCESS ============ */}
      <AnimatedSection className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div id="how-it-works">
          <div className="text-center mb-16">
            <span className="text-slate-400 uppercase text-xs tracking-wider font-bold mb-3 block">
              Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
              From Search to Verdict
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm">
              How OdoShield evaluates listings and provides buying intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                title: "Browse or Search",
                desc: "Check our directory of 68+ Indian market cars, filter by budget, or enter target vehicle details.",
                icon: <Search className="w-4 h-4 text-emerald-400" />,
              },
              {
                step: "02",
                title: "Compare Specs",
                desc: "Compare engine cc, safety rating, fuel choices, pros & cons, and market prices of target cars.",
                icon: <Layers className="w-4 h-4 text-cyan-400" />,
              },
              {
                step: "03",
                title: "AI Analysis",
                desc: "Use our Gemini AI RAG advisor to identify specific deals matching your requirements.",
                icon: <Sparkles className="w-4 h-4 text-amber-400" />,
              },
              {
                step: "04",
                title: "Generate Score",
                desc: "Our engine cross-checks odometer history, flags rollbacks, and outputs a clear Trust Score.",
                icon: <FileCheck className="w-4 h-4 text-purple-400" />,
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                className="bg-[#0F131A]/40 border border-white/5 rounded-xl p-5 relative"
              >
                <span className="absolute top-4 right-4 text-xs font-mono text-slate-500 font-bold">
                  {step.step}
                </span>
                <div className="mb-4 w-9 h-9 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============ TRUSTED BY AUTO PLATFORMS ============ */}
      <AnimatedSection className="relative z-10 py-12 px-6 border-y border-white/5 bg-[#0C1017]/30 text-center">
        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6">
          Scans compatible with listings from major Indian platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30 select-none">
          {["CarDekho", "Spinny", "Cars24", "True Value", "OLX Autos", "Droom", "Mahindra First Choice"].map((brand) => (
            <span key={brand} className="text-sm sm:text-base font-extrabold text-white font-mono tracking-tight">
              {brand.toUpperCase()}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* ============ CALL TO ACTION ============ */}
      <AnimatedSection className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <motion.div
          variants={scaleIn}
          custom={0}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F131A] via-[#0F131A]/80 to-transparent p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Subtle light overlay */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-emerald-500/5 blur-3xl rounded-full" />

          <AlertTriangle className="mx-auto w-8 h-8 text-emerald-400 mb-5 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
            Stop guessing. Start verifying.
          </h2>
          <p className="mx-auto max-w-md text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
            Ensure you don't buy a rollbacked vehicle or pay above average market price. Get comprehensive market intelligence instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/cars" className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              Browse Cars & Pricing
            </Link>
            <Link href="/chat" className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-950 transition-all text-white">
              Consult AI Advisor
            </Link>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 border-t border-white/5 bg-[#07090D] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="OdoShield"
              width={26}
              height={26}
              className="rounded"
            />
            <span className="font-mono text-xs tracking-wider uppercase font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              OdoShield
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            © {new Date().getFullYear()} OdoShield. Free-Tier Indian Market Automotive Security.
          </p>
          <div className="flex items-center gap-5 text-[10px] font-mono tracking-wider uppercase text-slate-500">
            <Link href="/cars" className="hover:text-white transition-colors">Browse</Link>
            <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <Link href="/chat" className="hover:text-white transition-colors">AI Advisor</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
