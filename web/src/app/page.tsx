"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Layers,
  Sparkles,
  MessageSquareText,
  CarFront,
  Zap,
  BarChart3,
  Bot
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
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[160px]" />
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
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">
              Sign In
            </button>
            <Link href="/cars" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-900 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-emerald-500/25">
              Explore Cars
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
                AI-Powered Indian Car Buying Assistant
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white"
            >
              Find the Perfect Car.<br />
              Skip the <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Guesswork.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base md:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              OdoShield is your intelligent companion for the Indian car market. Compare models, analyze real market prices, and let our Gemini AI guide you to the ideal vehicle based on your exact needs.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <Link href="/cars" className="group w-full sm:w-auto px-8 py-4 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2">
                Browse Directory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/chat" className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Chat with AI Advisor
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
                <p className="text-xs font-semibold text-white">Trusted by 10,000+ car buyers in India</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-emerald-500 text-xs">{s}</span>
                  ))}
                  <span className="text-slate-400 text-[10px] ml-1">4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: AI Assistant Mockup */}
          <div className="lg:col-span-5 relative">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={2}
              className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#0F131A]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-white/5 p-5 bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">OdoShield AI</h3>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-emerald-600 text-white text-xs p-3 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed shadow-lg">
                    I'm looking for a safe SUV under ₹15 Lakhs for my family. What do you recommend?
                  </div>
                </div>

                {/* AI Thinking */}
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono pl-2">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                  Analyzing 68+ Indian market cars...
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-white/5 text-slate-200 text-xs p-4 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed shadow-lg">
                    <p className="mb-3">Based on your criteria, I highly recommend the <strong className="text-emerald-400">Tata Nexon</strong> or the <strong className="text-cyan-400">Mahindra XUV300</strong>.</p>
                    
                    <div className="bg-slate-900/80 rounded-lg p-3 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">Tata Nexon</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">5★ Global NCAP</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Price Range:</span>
                        <span className="text-white">₹8.1 - ₹15.5 Lakh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input Mockup */}
              <div className="p-4 bg-slate-900/80 border-t border-white/5">
                <div className="flex items-center gap-2 bg-[#080B10] border border-white/10 rounded-full px-4 py-2.5">
                  <span className="text-slate-500 text-xs flex-1">Ask a follow up...</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-slate-900" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CORE FEATURES ============ */}
      <AnimatedSection className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#0C1017]/50">
        <div id="features" className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
              Everything You Need
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Smart Tools for Car Buyers
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              OdoShield equips you with data-driven insights and AI assistance to make the absolute best purchase decision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Search className="w-5 h-5" />,
                title: "Complete Directory",
                desc: "Browse a detailed database of Indian cars with exact ex-showroom prices and specs.",
                accent: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: "RAG AI Advisor",
                desc: "Chat with our Gemini-powered AI that deeply understands the current Indian car market.",
                accent: "text-cyan-400",
                bg: "bg-cyan-500/10",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "Spec Comparison",
                desc: "Compare up to 4 models side-by-side to evaluate features, safety ratings, and mileage.",
                accent: "text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Market Insights",
                desc: "View price spreads across variants to ensure you're getting the best value for your money.",
                accent: "text-indigo-400",
                bg: "bg-indigo-500/10",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-xl border border-white/5 bg-[#0F131A]/60 backdrop-blur-sm p-6 hover:bg-[#0F131A] hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                  <span className={feature.accent}>{feature.icon}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                {/* Subtle Hover glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============ CALL TO ACTION ============ */}
      <AnimatedSection className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <motion.div
          variants={scaleIn}
          custom={0}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F131A] via-[#0F131A]/80 to-transparent p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Subtle light overlay */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          <CarFront className="mx-auto w-10 h-10 text-emerald-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Ready to find your next car?
          </h2>
          <p className="mx-auto max-w-md text-sm text-slate-400 mb-8 leading-relaxed">
            Start browsing our comprehensive directory or ask the AI Advisor for personalized recommendations right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cars" className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              Browse Directory
            </Link>
            <Link href="/chat" className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-950 transition-all text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Launch AI Advisor
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
            © {new Date().getFullYear()} OdoShield. AI-Powered Indian Car Market Insights.
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
