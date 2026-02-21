'use client';

import React, { useState, useEffect } from 'react';
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

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spotLeft, setSpotLeft] = useState(50);
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
    }, 45000);
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
    }
  };

  const WaitlistForm = ({ compact = false }: { compact?: boolean }) => (
    <div className={`w-full max-w-2xl transform transition-all duration-500 hover:scale-[1.02] mx-auto ${compact ? 'max-w-xl' : ''}`}>
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-slate-900"
        >
          <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-2xl font-bold tracking-tight mb-2">You&apos;re on the list.</h3>
          <p className="text-slate-600 font-medium text-center">
            We&apos;ll notify you the moment we open up the beta. Prepare to understand your audience like never before.
          </p>
        </motion.div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-xl shadow-slate-200/50 flex items-center group border border-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="pl-5 pr-2 text-slate-400">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to join the waitlist..."
            className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-lg text-slate-900 placeholder:text-slate-400 font-medium w-full"
          />
          <button
            type="submit"
            className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-900 text-white transition-all duration-300 shadow-md ${
              isHovered ? 'bg-black scale-95' : ''
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900 text-slate-900 overflow-x-hidden">
      
      {/* Fixed Background Image that blends into the light theme */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-slate-50/90 to-slate-50 block" />
      </div>

      {/* Urgency Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Beta launching March 2026 — {spotLeft} early access spots remaining
          <Sparkles className="w-4 h-4" />
        </span>
      </div>

      {/* Glassmorphism Navigation - Light Theme */}
      <nav className={`fixed z-50 top-8 left-0 right-0 px-4 w-full flex justify-center transition-all duration-300 ${scrolled ? 'top-6' : 'top-8'}`}>
        <div className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm' : 'bg-white/40 backdrop-blur-md border border-white/60 shadow-sm'}`}>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 text-xl font-medium tracking-tight">
              <span className="font-serif italic mr-0.5">Letter</span>
              <span className="font-medium tracking-tighter">Metrics</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-600 text-sm font-medium">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#compare" className="hover:text-slate-900 transition-colors">Why Us</a>
            <a href="#beta" className="hover:text-slate-900 transition-colors">Beta</a>
          </div>
          <a 
            href="#waitlist"
            className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp} 
            className="text-6xl md:text-8xl text-slate-900 tracking-tight mb-6 leading-tight"
          >
            <span className="font-serif italic font-light text-slate-800">Letter</span>
            <span className="font-medium tracking-tighter">Metrics</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="max-w-2xl text-lg md:text-xl text-slate-600 font-medium mb-12 leading-relaxed"
          >
            Stop guessing what your readers want. The analytics dashboard built strictly for newsletter creators, 
            replacing GA4 with insights you can actually use.
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
              <span>Substack</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span>Beehiiv</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span>Ghost</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
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
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-slate-900"
            >
              GA4 is for selling shoes.
              <br />
              <span className="font-serif italic text-slate-500">You sell ideas.</span>
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
                  variants={fadeInUp} 
                  className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer (Features Bento Box) */}
      <section id="features" className="relative z-10 py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-slate-900">Everything you need to scale.</h2>
              <p className="text-slate-500 text-lg">No tracking pixels required. Connect your platform and get instant clarity.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <motion.div 
                variants={scaleIn}
                className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-slate-900">Cross-Platform Unity</h3>
                <p className="text-slate-600 leading-relaxed max-w-md">
                  Migrating from Substack to Ghost? Running multiple publications on Beehiiv? 
                  See all your subscribers, engagement, and growth in one unified dashboard. 
                  No more logging into three different accounts.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                variants={scaleIn}
                className="col-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-slate-900">Sponsor-Ready Reports</h3>
                <p className="text-slate-600 leading-relaxed">
                  Sponsors want real metrics. Generate beautiful, professional PDF reports with one click. 
                  Show them exactly what their ROI will be.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                variants={scaleIn}
                className="col-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-slate-900">True Engagement Scoring</h3>
                <p className="text-slate-600 leading-relaxed">
                  Identify your VIP readers. Stop looking at vanity metrics and find out exactly 
                  who reads every issue, clicks every link, and drives your growth.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                variants={scaleIn}
                className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-medium mb-3 text-slate-900">Actionable Cohort Analysis</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Track 16-month retention by acquisition source. Know definitively if your 
                      Twitter followers stick around longer than your organic search traffic.
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl p-6">
                    <div className="text-sm font-medium text-slate-500 mb-4">Retention by Cohort</div>
                    <div className="space-y-3">
                      {[
                        { month: 'Jan 2026', retention: 100 },
                        { month: 'Dec 2025', retention: 85 },
                        { month: 'Nov 2025', retention: 78 },
                        { month: 'Oct 2025', retention: 72 },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-20">{c.month}</span>
                          <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              style={{ width: `${c.retention}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-10">{c.retention}%</span>
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

      {/* Why Us vs Competitors */}
      <section id="compare" className="relative z-10 py-32 px-4 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-slate-900">Why LetterMetrics?</h2>
              <p className="text-slate-500 text-lg">Stop paying for bloated software that wasn&apos;t built for you.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-200">
                <div className="mb-6">
                  <h4 className="text-xl font-medium text-slate-900">The Old Way</h4>
                </div>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li className="flex gap-4 items-start">
                    <span className="text-red-400 font-bold mt-0.5">✕</span> 
                    Fighting with GA4 custom events
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-400 font-bold mt-0.5">✕</span> 
                    Exporting CSVs to calculate cohorts manually
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-400 font-bold mt-0.5">✕</span> 
                    Paying $99+/mo just to unlock platform analytics
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-red-400 font-bold mt-0.5">✕</span> 
                    Guessing what sponsors actually want to see
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-900/10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BarChart3 className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <h4 className="text-xl font-medium text-white">The LetterMetrics Way</h4>
                  </div>
                  <ul className="space-y-4 text-slate-300 font-medium">
                    <li className="flex gap-4 items-start">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span> 
                      Built strictly around the Newsletter data model
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span> 
                      Instant cohort and retention analysis
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span> 
                      One price, un-siloed data across all your platforms
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span> 
                      1-click sponsor reports that win deals
                    </li>
                  </ul>
                </div>
              </div>
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
            viewport={{ once: true }}
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
                {
                  icon: Zap,
                  title: "Free During Beta",
                  desc: "Get full access to all Pro features at no cost while we refine the product."
                },
                {
                  icon: TrendingUp,
                  title: "Shape the Roadmap",
                  desc: "Your feedback directly influences what we build next. Request features that matter to you."
                },
                {
                  icon: Lock,
                  title: "Founding Member Pricing",
                  desc: "Lock in 50% off forever when you join the beta. Grandfathered pricing for life."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp} 
                  className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-blue-500" />
                  </div>
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
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block text-blue-600 font-medium text-sm uppercase tracking-wider mb-4">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-slate-900">
                Simple, transparent pricing.
              </h2>
              <p className="text-xl text-slate-600 mb-12">
                No hidden fees. No surprises. Start free, upgrade when you&apos;re ready.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Free</div>
                <div className="text-4xl font-medium text-slate-900 mb-4">$0</div>
                <ul className="space-y-3 text-left text-slate-600 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1 platform</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 7-day data history</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic dashboard</li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-blue-500 text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Pro</div>
                <div className="text-4xl font-medium mb-4">$29<span className="text-lg text-slate-400">/mo</span></div>
                <ul className="space-y-3 text-left text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited platforms</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full data history</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> CSV &amp; PDF exports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Sponsor reports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Cohort analysis</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200 inline-block">
              <p className="text-blue-800 font-medium">
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
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-slate-900">
                Ready to understand your readers?
              </h2>
              <p className="text-xl text-slate-500 mb-4">
                Join the waitlist today.
              </p>
              <p className="text-amber-600 font-medium mb-12 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Only {spotLeft} beta spots remaining
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <WaitlistForm />
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
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm bg-slate-50 border-t border-slate-200">
        <p>© 2026 LetterMetrics. Built by Yaksh.</p>
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
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-2">Wait! Don&apos;t miss out.</h3>
                <p className="text-slate-600 mb-6">
                  Only {spotLeft} beta spots left. Join the waitlist now and get 50% off your first year.
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
                    className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
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
