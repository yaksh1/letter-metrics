'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, 
  CheckCircle, 
  Mail, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Users, 
  ChevronDown,
  Target,
  Globe,
  Zap,
  Eye,
  Check,
  Clock,
  Lock,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

// Google Sheets submission function
const submitToGoogleSheets = async (email: string, source: string = 'website') => {
  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });
    return true;
  } catch {
    console.log('Form submitted (CORS may block response)');
    return true;
  }
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spotLeft, setSpotLeft] = useState(50);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalShown, setExitModalShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle nav background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer effect for urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotLeft(prev => Math.max(0, prev - Math.floor(Math.random() * 2)));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection - only show once
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
      
      // Submit to Google Sheets
      await submitToGoogleSheets(email);
      
      setSubmitted(true);
      setEmail('');
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  const WaitlistForm = ({ compact = false }: { compact?: boolean }) => (
    <div className={`w-full max-w-2xl mx-auto ${compact ? 'max-w-xl' : ''}`}>
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white/80 backdrop-blur-xl border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-100/50 flex flex-col items-center justify-center text-slate-900"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">You&apos;re on the list! 🎉</h3>
          <p className="text-slate-600 font-medium text-center">
            We&apos;ll notify you the moment we open up the beta.
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-2 text-sm text-slate-500"
          >
            <Clock className="w-4 h-4" />
            <span>Expected: March 2026</span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleSubmit}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div 
            className={`relative bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-xl shadow-slate-200/50 flex items-center border-2 transition-all duration-300 ${
              focusedInput ? 'border-blue-400 shadow-blue-100/50' : 'border-white'
            } ${isHovered ? 'shadow-2xl' : ''}`}
            animate={isHovered ? { y: -2 } : { y: 0 }}
          >
            <motion.div 
              className="pl-5 pr-2 text-slate-400"
              animate={focusedInput ? { scale: 1.1, color: '#3b82f6' } : {}}
            >
              <Mail className="w-5 h-5" />
            </motion.div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              placeholder="Enter your email to join the waitlist..."
              className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-lg text-slate-900 placeholder:text-slate-400 font-medium w-full"
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-900 text-white transition-all duration-300 shadow-md ${
                isHovered ? 'bg-black' : ''
              } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              ) : (
                <ArrowUp className="w-6 h-6" />
              )}
            </motion.button>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-slate-500 mt-3 flex items-center justify-center gap-2"
          >
            <Lock className="w-3 h-3" />
            No spam. Unsubscribe anytime.
          </motion.p>
        </motion.form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900 text-slate-900 overflow-x-hidden">
      
      {/* Animated Background with Parallax */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-slate-50/90 to-slate-50 block" />
      </motion.div>

      {/* Urgency Banner with Animation */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium"
      >
        <motion.span 
          className="inline-flex items-center gap-2"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" />
          Beta launching March 2026 — {spotLeft} early access spots remaining
          <Sparkles className="w-4 h-4" />
        </motion.span>
      </motion.div>

      {/* Glassmorphism Navigation */}
      <nav className={`fixed z-50 top-8 left-0 right-0 px-4 w-full flex justify-center transition-all duration-300 ${scrolled ? 'top-6' : 'top-8'}`}>
        <motion.div 
          className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg' : 'bg-white/40 backdrop-blur-md border border-white/60 shadow-sm'}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-slate-900 text-xl font-medium tracking-tight">
              <span className="font-serif italic mr-0.5">Letter</span>
              <span className="font-medium tracking-tighter">Metrics</span>
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-slate-600 text-sm font-medium">
            {['Features', 'Why Us', 'Beta'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative hover:text-slate-900 transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
          <motion.a 
            href="#waitlist"
            className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Early Access
          </motion.a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-4 py-2 mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.span>
            <span className="text-sm font-medium text-slate-700">Now in private beta</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp} 
            className="text-6xl md:text-8xl text-slate-900 tracking-tight mb-6 leading-tight"
          >
            <motion.span 
              className="font-serif italic font-light text-slate-800 inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Letter
            </motion.span>
            <motion.span 
              className="font-medium tracking-tighter inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Metrics
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="max-w-2xl text-lg md:text-xl text-slate-600 font-medium mb-12 leading-relaxed"
          >
            Stop guessing what your readers want. The analytics dashboard built strictly for newsletter creators.
          </motion.p>

          <motion.div variants={fadeInUp} id="waitlist">
            <WaitlistForm />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 flex flex-col items-center opacity-80">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Built for creators on
              <Sparkles className="w-4 h-4 text-amber-400" />
            </p>
            <div className="flex items-center gap-6 text-slate-800 font-bold text-lg md:text-xl tracking-tight">
              {['Substack', 'Beehiiv', 'Ghost'].map((platform, i) => (
                <motion.span 
                  key={platform}
                  className="relative"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {platform}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-amber-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 text-slate-400"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Statement Section */}
      <section className="relative z-10 py-32 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-slate-900"
            >
              GA4 is for selling shoes.
              <br />
              <motion.span 
                className="font-serif italic text-slate-500"
                whileHover={{ color: '#3b82f6' }}
                transition={{ duration: 0.3 }}
              >
                You sell ideas.
              </motion.span>
            </motion.h2>
            
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: AlertCircle,
                  title: "Apple Killed Open Rates",
                  desc: "Mail Privacy Protection made open rates meaningless. You're making decisions on bad data."
                },
                {
                  icon: Clock,
                  title: "Spreadsheet Hell",
                  desc: "Exporting CSVs, manually calculating cohorts, copy-pasting between platforms. Hours wasted."
                },
                {
                  icon: Eye,
                  title: "Flying Blind",
                  desc: "GA4 doesn't understand newsletters. No subscriber quality scoring. No content-to-conversion tracking."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={scaleIn}
                  className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-red-100 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="relative z-10 py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-slate-900">Everything you need to scale.</h2>
              <p className="text-slate-500 text-lg">No tracking pixels required. Connect your platform and get instant clarity.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Cross-Platform Unity",
                  desc: "Migrating from Substack to Ghost? Running multiple publications on Beehiiv? See all your subscribers, engagement, and growth in one unified dashboard.",
                  span: "md:col-span-2",
                  color: "blue"
                },
                {
                  icon: FileText,
                  title: "Sponsor-Ready Reports",
                  desc: "Sponsors want real metrics. Generate beautiful, professional PDF reports with one click.",
                  span: "",
                  color: "emerald"
                },
                {
                  icon: Users,
                  title: "True Engagement Scoring",
                  desc: "Identify your VIP readers. Stop looking at vanity metrics and find out exactly who reads every issue.",
                  span: "",
                  color: "purple"
                },
                {
                  icon: Target,
                  title: "Actionable Cohort Analysis",
                  desc: "Track 16-month retention by acquisition source. Know definitively if your Twitter followers stick around longer.",
                  span: "md:col-span-2",
                  color: "orange"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  variants={scaleIn}
                  className={`${feature.span} bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`w-14 h-14 bg-${feature.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${feature.color}-100 transition-colors`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <feature.icon className={`w-7 h-7 text-${feature.color}-500`} />
                  </motion.div>
                  <h3 className="text-2xl font-medium mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us vs Competitors */}
      <section id="why-us" className="relative z-10 py-32 px-4 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-slate-900">Why LetterMetrics?</h2>
              <p className="text-slate-500 text-lg">Stop paying for bloated software that wasn&apos;t built for you.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div 
                className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-200"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-6">
                  <h4 className="text-xl font-medium text-slate-900">The Old Way</h4>
                </div>
                <ul className="space-y-4">
                  {['Fighting with GA4 custom events', 'Exporting CSVs to calculate cohorts manually', 'Paying $99+/mo just to unlock platform analytics', 'Guessing what sponsors actually want to see'].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex gap-4 items-start text-slate-600 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-red-400 font-bold mt-0.5">✕</span> 
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-900/10 text-white relative overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute top-0 right-0 p-8 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="w-32 h-32" />
                </motion.div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <h4 className="text-xl font-medium text-white">The LetterMetrics Way</h4>
                  </div>
                  <ul className="space-y-4">
                    {['Built strictly around the Newsletter data model', 'Instant cohort and retention analysis', 'One price, un-siloed data across all your platforms', '1-click sponsor reports that win deals'].map((item, i) => (
                      <motion.li 
                        key={i}
                        className="flex gap-4 items-start text-slate-300 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-emerald-400 font-bold mt-0.5">✓</span> 
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Beta Benefits Section */}
      <section id="beta" className="relative z-10 py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-blue-600 font-medium text-sm uppercase tracking-wider mb-4">Beta Access</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900">
                Be among the first.
              </h2>
              <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
                Join our private beta and help shape the future of newsletter analytics.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Free During Beta", desc: "Get full access to all Pro features at no cost while we refine the product." },
                { icon: TrendingUp, title: "Shape the Roadmap", desc: "Your feedback directly influences what we build next. Request features that matter to you." },
                { icon: Lock, title: "Founding Member Pricing", desc: "Lock in 50% off forever when you join the beta. Grandfathered pricing for life." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={scaleIn}
                  className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className="w-7 h-7 text-blue-500" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-4 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block text-blue-600 font-medium text-sm uppercase tracking-wider mb-4">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-slate-900">
                Simple, transparent pricing.
              </h2>
              <p className="text-xl text-slate-600 mb-12">No hidden fees. No surprises.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.div 
                className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Free</div>
                <div className="text-4xl font-medium text-slate-900 mb-4">$0</div>
                <ul className="space-y-3 text-left text-slate-600 mb-8">
                  {['1 platform', '7-day data history', 'Basic dashboard'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {item}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute top-4 right-4 bg-blue-500 text-xs font-bold px-3 py-1 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  POPULAR
                </motion.div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Pro</div>
                <div className="text-4xl font-medium mb-4">$29<span className="text-lg text-slate-400">/mo</span></div>
                <ul className="space-y-3 text-left text-slate-300 mb-8">
                  {['Unlimited platforms', 'Full data history', 'CSV & PDF exports', 'Sponsor reports', 'Cohort analysis'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> {item}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-amber-800 font-medium">
                🎉 Beta members get 50% off forever — just $14.50/mo
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-32 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-slate-900">
                Ready to understand your readers?
              </h2>
              <p className="text-xl text-slate-500 mb-4">Join the waitlist today.</p>
              <motion.p 
                className="text-amber-600 font-medium mb-12 flex items-center justify-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
                Only {spotLeft} beta spots remaining
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <WaitlistForm />
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
              {['Free during beta', 'No credit card required', 'Cancel anytime'].map((item, i) => (
                <motion.span 
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm bg-slate-50 border-t border-slate-200">
        <p>© 2026 LetterMetrics. Built by Yaksh.</p>
      </footer>

      {/* Exit Intent Modal - Shows Only Once */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap className="w-8 h-8 text-amber-500" />
                </motion.div>
                <h3 className="text-2xl font-medium text-slate-900 mb-2">Wait! Don&apos;t miss out.</h3>
                <p className="text-slate-600 mb-6">
                  Only {spotLeft} beta spots left. Join now and get 50% off forever.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-colors"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
                  >
                    Claim My Spot
                  </motion.button>
                </form>
                <button
                  onClick={() => setShowExitModal(false)}
                  className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  No thanks, I like flying blind
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
