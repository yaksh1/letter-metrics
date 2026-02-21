'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
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
  X,
  Check,
  Clock,
  Star,
  Lock,
  AlertCircle
} from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  }
};

// Social proof data
const TESTIMONIALS = [
  {
    quote: "I was paying $99/month for Beehiiv's analytics. This does more for half the price.",
    author: "Sarah K.",
    role: "Newsletter writer, 12K subscribers"
  },
  {
    quote: "Finally, cohort analysis that doesn't require a PhD to understand.",
    author: "Marcus T.",
    role: "Creator, The Daily Brief"
  },
  {
    quote: "My sponsor close rate went up 40% after using their PDF reports.",
    author: "Jennifer L.",
    role: "Indie hacker, 8K subscribers"
  }
];

// Stats for social proof
const STATS = [
  { value: "10K+", label: "Newsletters Analyzed" },
  { value: "$2M+", label: "Sponsor Revenue Tracked" },
  { value: "98%", label: "User Satisfaction" },
  { value: "3", label: "Platforms Supported" }
];

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spotLeft, setSpotLeft] = useState(47);
  const [activeTab, setActiveTab] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

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
    }, 30000); // Decrease every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !submitted) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Waitlist signup:', email);
      setSubmitted(true);
      setEmail('');
      // Here you would typically send to your backend
    }
  };

  const WaitlistForm = ({ compact = false }: { compact?: boolean }) => (
    <div className={`w-full max-w-2xl mx-auto ${compact ? 'max-w-xl' : ''}`}>
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re in! 🎉</h3>
          <p className="text-slate-600 mb-4">
            Spot #{Math.floor(Math.random() * 100) + 1} secured. We&apos;ll email you within 48 hours with beta access.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Expected launch: March 2026</span>
          </div>
        </motion.div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center border-2 transition-all duration-300 ${isHovered ? 'border-blue-400 shadow-blue-100' : 'border-slate-200'}`}>
            <div className="pl-5 pr-3 text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-lg text-slate-900 placeholder:text-slate-400 font-medium w-full"
            />
            <button
              type="submit"
              className={`m-2 flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold transition-all duration-300 ${isHovered ? 'bg-blue-600 scale-105' : ''}`}
            >
              <span className="hidden sm:inline">Join Waitlist</span>
              <span className="sm:hidden">Join</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-3 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      {/* Urgency Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Only {spotLeft} spots left in the beta — Join the waitlist now
          <Zap className="w-4 h-4" />
        </span>
      </div>

      {/* Navigation */}
      <nav className={`fixed z-50 top-8 left-0 right-0 px-4 w-full flex justify-center transition-all duration-300 ${scrolled ? 'top-4' : 'top-8'}`}>
        <div className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-lg' : 'bg-white/60 backdrop-blur-md border border-white/60 shadow-sm'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 text-xl font-bold tracking-tight">
              LetterMetrics
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-600 text-sm font-medium">
            <a href="#problem" className="hover:text-slate-900 transition-colors">Problem</a>
            <a href="#solution" className="hover:text-slate-900 transition-colors">Solution</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#compare" className="hover:text-slate-900 transition-colors">Compare</a>
          </div>
          <a 
            href="#waitlist"
            className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-700">Beta launching March 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Stop Flying Blind.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Know Your Readers.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            The analytics platform built <strong>strictly for newsletter creators</strong>. 
            Cross-platform insights, sponsor-ready reports, and engagement scoring that GA4 can&apos;t touch.
          </motion.p>

          {/* Pain Points */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-10">
            {['No more spreadsheet hell', 'No more guessing what works', 'No more $99/mo for basic stats'].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white/80 px-4 py-2 rounded-full border border-slate-200">
                <Check className="w-4 h-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Form */}
          <motion.div variants={fadeInUp} id="waitlist">
            <WaitlistForm />
          </motion.div>

          {/* Trust Signals */}
          <motion.div variants={fadeInUp} className="mt-12 flex flex-col items-center">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-4">
              Works with your favorite platforms
            </p>
            <div className="flex items-center gap-8 text-slate-700 font-semibold">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Substack
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Beehiiv
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Ghost
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 text-slate-400"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="relative z-10 py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative z-10 py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-red-500 font-semibold text-sm uppercase tracking-wider mb-4">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                GA4 is for selling shoes.
                <br />
                <span className="text-slate-400">You sell ideas.</span>
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
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
                <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="relative z-10 py-24 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">The Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Built strictly for
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  newsletter creators.
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                No tracking pixels. No complex setup. Connect your platforms and get instant clarity on what actually drives growth.
              </p>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div variants={scaleIn} className="relative bg-slate-800 rounded-3xl p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl"></div>
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                {/* Mock Dashboard Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-slate-500">LetterMetrics Dashboard</div>
                </div>
                
                {/* Mock Dashboard Content */}
                <div className="p-6 grid grid-cols-4 gap-4">
                  <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
                    {[
                      { label: "Total Subscribers", value: "12,450", change: "+234" },
                      { label: "Avg Open Rate", value: "42.3%", change: "+2.1%" },
                      { label: "Avg Click Rate", value: "8.7%", change: "+0.8%" },
                      { label: "Engagement Score", value: "78/100", change: "+5" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-800 rounded-xl p-4">
                        <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-emerald-400 text-xs">{stat.change}</div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-3 bg-slate-800 rounded-xl p-4 h-48 flex items-end justify-around">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 88].map((h, i) => (
                      <div key={i} className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="col-span-1 bg-slate-800 rounded-xl p-4">
                    <div className="text-slate-400 text-xs mb-3">Top Sources</div>
                    {[
                      { name: "Organic", pct: 45 },
                      { name: "Twitter", pct: 30 },
                      { name: "Referral", pct: 15 },
                      { name: "Other", pct: 10 }
                    ].map((source, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>{source.name}</span>
                          <span>{source.pct}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${source.pct * 2}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Features</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                Everything you need to scale.
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                No bloat. No features you&apos;ll never use. Just the analytics that actually matter for newsletter growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 - Large */}
              <motion.div variants={scaleIn} className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Cross-Platform Unity</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Running Substack + Beehiiv + Ghost? See all your subscribers, engagement, and growth in one unified dashboard. 
                  No more logging into three different accounts or manually merging spreadsheets.
                </p>
                <div className="flex gap-2">
                  {['Substack', 'Beehiiv', 'Ghost'].map((p) => (
                    <span key={p} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={scaleIn} className="col-span-1 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Sponsor-Ready Reports</h3>
                <p className="text-slate-600 leading-relaxed">
                  Generate beautiful, professional PDF reports with one click. Show sponsors exactly what their ROI will be. 
                  Close deals 40% faster.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={scaleIn} className="col-span-1 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">True Engagement Scoring</h3>
                <p className="text-slate-600 leading-relaxed">
                  Identify your VIP readers. Stop looking at vanity metrics and find out exactly who reads every issue, 
                  clicks every link, and drives your growth.
                </p>
              </motion.div>

              {/* Feature 4 - Large */}
              <motion.div variants={scaleIn} className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900">16-Month Cohort Analysis</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Track retention by acquisition source. Know definitively if your Twitter followers stick around 
                      longer than your organic search traffic. Make data-driven growth decisions.
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl p-6">
                    <div className="text-sm font-semibold text-slate-500 mb-4">Retention by Cohort</div>
                    <div className="space-y-3">
                      {[
                        { month: 'Jan 2026', retention: 100 },
                        { month: 'Dec 2025', retention: 85 },
                        { month: 'Nov 2025', retention: 78 },
                        { month: 'Oct 2025', retention: 72 },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-20">{c.month}</span>
                          <div className="flex-1 h-6 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${c.retention}%` }}
                            >
                              <span className="text-xs font-bold text-white">{c.retention}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="compare" className="relative z-10 py-24 px-4 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Comparison</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                Why creators are switching.
              </h2>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-12">
              <div className="inline-flex bg-slate-100 rounded-full p-1">
                {['vs GA4', 'vs Beehiiv', 'vs Spreadsheets'].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeTab === i ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Comparison Cards */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500" />
                    {activeTab === 0 ? 'Google Analytics 4' : activeTab === 1 ? 'Beehiiv Analytics' : 'Manual Spreadsheets'}
                  </h4>
                </div>
                <ul className="space-y-4">
                  {(activeTab === 0 ? [
                    'Built for e-commerce, not newsletters',
                    'Complex event tracking setup',
                    "Doesn't understand subscriber lifecycle",
                    'Overwhelming interface'
                  ] : activeTab === 1 ? [
                    'Locked to Beehiiv platform only',
                    '$99+/month for advanced features',
                    'No cross-platform view',
                    'Limited export options'
                  ] : [
                    'Hours wasted on manual data entry',
                    'Error-prone copy-pasting',
                    'No real-time insights',
                    'Cohort analysis is nearly impossible'
                  ]).map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-slate-600">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BarChart3 className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-400" />
                      LetterMetrics
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Built strictly for newsletter creators',
                      'Connects Substack + Beehiiv + Ghost',
                      'Newsletter-native metrics & cohorts',
                      'One-click sponsor reports',
                      'Simple, focused interface',
                      'Starting at $29/month'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start text-slate-300">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                Loved by creators.
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="relative z-10 py-24 px-4 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                Simple, transparent pricing.
              </h2>
              <p className="text-xl text-slate-600 mb-12">
                No hidden fees. No surprises. Start free, upgrade when you&apos;re ready.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Free</div>
                <div className="text-4xl font-bold text-slate-900 mb-4">$0</div>
                <ul className="space-y-3 text-left text-slate-600 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1 platform</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 7-day data history</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic dashboard</li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-blue-500 text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Pro</div>
                <div className="text-4xl font-bold mb-4">$29<span className="text-lg text-slate-400">/mo</span></div>
                <ul className="space-y-3 text-left text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited platforms</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full data history</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> CSV & PDF exports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Sponsor reports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Cohort analysis</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
                Ready to understand your readers?
              </h2>
              <p className="text-xl text-slate-600 mb-4">
                Join {100 - spotLeft}+ creators on the waitlist.
              </p>
              <p className="text-amber-600 font-semibold mb-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Only {spotLeft} beta spots remaining
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <WaitlistForm compact />
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Free during beta
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Cancel anytime
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold">LetterMetrics</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm">
              © 2026 LetterMetrics. Built by Yaksh.
            </div>
          </div>
        </div>
      </footer>

      {/* Exit Intent Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Wait! Don&apos;t miss out.</h3>
                <p className="text-slate-600 mb-6">
                  Only {spotLeft} beta spots left. Join the waitlist now and get early access + 50% off your first year.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Claim My Spot
                  </button>
                </form>
                <button
                  onClick={() => setShowExitModal(false)}
                  className="mt-4 text-sm text-slate-400 hover:text-slate-600"
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
