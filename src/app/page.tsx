'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Mail, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Users, 
  Target,
  Globe,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const submitToFormspree = async (email: string) => {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgwppyk';
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        email,
        source: 'lettermetrics-landing',
        timestamp: new Date().toISOString()
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Form submission error:', error);
    return false;
  }
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spotLeft, setSpotLeft] = useState(50);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalShown, setExitModalShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth - 0.5) * 15, y: (e.clientY / window.innerHeight - 0.5) * 15 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSpotLeft(prev => Math.max(0, prev - Math.floor(Math.random() * 2))), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !submitted && !exitModalShown) {
        setShowExitModal(true);
        setExitModalShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [submitted, exitModalShown]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      const success = await submitToFormspree(email);
      if (success) {
        setSubmitted(true);
        setEmail('');
      }
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  const features = [
    { icon: Globe, title: "Unified Analytics", description: "Connect Substack, Beehiiv, and Ghost in one dashboard. No more tab switching.", color: "from-blue-500 to-cyan-400", bgColor: "bg-blue-50" },
    { icon: Target, title: "Cohort Retention", description: "Track 16-month retention by source. Know which channels bring loyal readers.", color: "from-violet-500 to-purple-400", bgColor: "bg-violet-50" },
    { icon: FileText, title: "Sponsor Reports", description: "Generate professional PDF reports in one click. Close deals with data.", color: "from-emerald-500 to-teal-400", bgColor: "bg-emerald-50" },
    { icon: Users, title: "Engagement Scoring", description: "Identify your VIP readers. Focus on the subscribers who actually engage.", color: "from-amber-500 to-orange-400", bgColor: "bg-amber-50" }
  ];

  const comparisonData = [
    { feature: "Cross-platform support", us: true, them: false },
    { feature: "Cohort analysis", us: true, them: "Limited" },
    { feature: "Sponsor reports", us: true, them: false },
    { feature: "Engagement scoring", us: true, them: false },
    { feature: "Setup time", us: "2 minutes", them: "Hours" },
    { feature: "Starting price", us: "$29/mo", them: "$99+/mo" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa] font-sans text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }} animate={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }} transition={{ type: "spring", stiffness: 50, damping: 30 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/95 to-[#fafafa]" />
      </div>

      <motion.nav className="fixed z-50 top-0 left-0 right-0 px-6 py-4" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <motion.div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-100' : 'bg-transparent'}`}>
          <motion.a href="#" className="flex items-center gap-2 group" whileHover={{ scale: 1.02 }}>
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><BarChart3 className="w-5 h-5 text-white" /></div>
            <span className="text-lg font-semibold tracking-tight"><span className="font-serif italic font-light">Letter</span><span className="font-medium">Metrics</span></span>
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Compare', 'Pricing'].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.a href="#waitlist" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2" whileHover={{ scale: 1.03, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.98 }}>
            Get Access<ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.nav>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm" whileHover={{ scale: 1.02, boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 relative"><span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" /></span>
              <span className="text-sm font-medium text-slate-600">Now in private beta — {spotLeft} spots left</span>
            </motion.div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 leading-[1.05]">
            <span className="block font-serif italic font-light text-slate-500">Stop flying blind.</span>
            <span className="block mt-2 font-serif italic">Know your readers.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The analytics platform built strictly for newsletter creators. Cross-platform insights, sponsor-ready reports, and engagement scoring.
          </motion.p>

          <motion.div variants={fadeInUp} id="waitlist" className="max-w-md mx-auto">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-emerald-200 rounded-2xl p-8 shadow-xl">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-6 h-6 text-emerald-600" /></div>
                <h3 className="text-xl font-semibold mb-2">You are on the list</h3>
                <p className="text-slate-500 text-sm">We will email you when the beta opens.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <motion.div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-center p-1.5" whileHover={{ boxShadow: '0 20px 50px -12px rgba(0,0,0,0.15)' }} transition={{ duration: 0.3 }}>
                  <div className="pl-4 pr-3 text-slate-400"><Mail className="w-5 h-5" /></div>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." className="flex-1 bg-transparent border-none outline-none py-3.5 px-2 text-slate-900 placeholder:text-slate-400" />
                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-70">
                    {isSubmitting ? <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles className="w-4 h-4" /></motion.span> : 'Join Waitlist'}
                  </motion.button>
                </motion.div>
                <p className="text-center text-xs text-slate-400 mt-3">Free during beta. No credit card required.</p>
              </form>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 flex items-center justify-center gap-8 text-slate-400">
            {['Substack', 'Beehiiv', 'Ghost'].map((platform) => <span key={platform} className="text-sm font-medium">{platform}</span>)}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">The Problem</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">GA4 is for selling shoes.<br /><span className="font-serif italic text-slate-400 font-light">You sell ideas.</span></h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[{ icon: Clock, title: "Spreadsheet Hell", desc: "Hours wasted on manual exports and calculations." }, { icon: Target, title: "Flying Blind", desc: "No insight into who actually reads your content." }, { icon: Shield, title: "Privacy Killed Data", desc: "Apple's MPP made open rates meaningless." }].map((item, i) => (
                <motion.div key={i} variants={scaleIn} className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500" whileHover={{ y: -4 }}>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors"><item.icon className="w-6 h-6 text-slate-600" /></div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative z-10 py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Features</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Everything you need.</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">No bloat. Just the analytics that actually matter for growing your newsletter.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div key={i} variants={scaleIn} className="group relative bg-slate-50 rounded-3xl p-8 overflow-hidden" whileHover={{ scale: 1.01 }}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}><feature.icon className="w-6 h-6 text-slate-700" /></div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="compare" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Comparison</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Why we are different.</h2>
            </motion.div>

            <motion.div variants={scaleIn} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-100 font-medium text-sm text-slate-400">
                <div>Feature</div>
                <div className="text-center">LetterMetrics</div>
                <div className="text-center">Others</div>
              </div>
              {comparisonData.map((row, i) => (
                <motion.div key={i} className="grid grid-cols-3 gap-4 p-6 border-b border-slate-50 last:border-0 items-center" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <div className="font-medium text-slate-700">{row.feature}</div>
                  <div className="text-center">{row.us === true ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <span className="text-slate-900 font-medium">{row.us}</span>}</div>
                  <div className="text-center text-slate-400">{row.them === false ? <span className="text-slate-300">—</span> : <span>{row.them}</span>}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Simple pricing.</h2>
              <p className="text-slate-500 text-lg">Start free. Upgrade when you are ready.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.div variants={scaleIn} className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Free</p>
                  <div className="flex items-baseline gap-1"><span className="text-4xl font-semibold">$0</span><span className="text-slate-400">/month</span></div>
                </div>
                <ul className="space-y-4 mb-8">
                  {['1 platform', '7-day history', 'Basic analytics'].map((item) => <li key={item} className="flex items-center gap-3 text-slate-600"><Check className="w-5 h-5 text-slate-400" />{item}</li>)}
                </ul>
              </motion.div>

              <motion.div variants={scaleIn} className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4"><span className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full">POPULAR</span></div>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Pro</p>
                  <div className="flex items-baseline gap-1"><span className="text-4xl font-semibold">$29</span><span className="text-slate-400">/month</span></div>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Unlimited platforms', 'Full history', 'Sponsor reports', 'Cohort analysis', 'Priority support'].map((item) => <li key={item} className="flex items-center gap-3 text-slate-300"><Check className="w-5 h-5 text-emerald-400" />{item}</li>)}
                </ul>
                <div className="pt-6 border-t border-white/10"><p className="text-sm text-slate-400">Beta members get 50% off forever</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Ready to understand<br /><span className="font-serif italic font-light text-slate-500">your readers?</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 mb-8">Join {50 - spotLeft} creators on the waitlist.</motion.p>
            <motion.div variants={fadeInUp}>
              <motion.a href="#waitlist" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-medium text-lg" whileHover={{ scale: 1.03, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.98 }}>
                Get Early Access<ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-12 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><BarChart3 className="w-5 h-5 text-white" /></div>
            <span className="font-semibold"><span className="font-serif italic font-light">Letter</span>Metrics</span>
          </div>
          <p className="text-sm text-slate-400">2026 LetterMetrics. Built by Yaksh.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showExitModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowExitModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6"><Zap className="w-8 h-8 text-amber-500" /></div>
                <h3 className="text-2xl font-semibold mb-2">Do not miss out</h3>
                <p className="text-slate-500 mb-8">Only {spotLeft} beta spots remaining. Join now for 50% off forever.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="email" required placeholder="Enter your email..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 outline-none transition-colors" onChange={(e) => setEmail(e.target.value)} />
                  <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl">Claim My Spot</motion.button>
                </form>
                <button onClick={() => setShowExitModal(false)} className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors">No thanks</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
