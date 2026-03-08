import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { 
  Rocket, 
  Layout, 
  Zap, 
  Type, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  ShieldCheck,
  Globe,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const { t, isRTL } = useLanguage();
  const features = [
    {
      title: t('nav.builder'),
      description: 'Create high-converting product pages in minutes with our intuitive drag-and-drop builder.',
      icon: Layout,
      color: 'bg-indigo-500'
    },
    {
      title: t('nav.adgen'),
      description: 'Generate compelling Facebook and Instagram ad copy that actually sells, powered by GPT-4.',
      icon: Zap,
      color: 'bg-purple-500'
    },
    {
      title: t('nav.hooks'),
      description: 'Stop the scroll with powerful headlines and hooks designed to grab attention instantly.',
      icon: Type,
      color: 'bg-pink-500'
    },
    {
      title: t('nav.products'),
      description: 'Discover trending products and niche markets with our AI-powered product research tool.',
      icon: Lightbulb,
      color: 'bg-orange-500'
    }
  ];

  const benefits = [
    {
      title: 'Save Time',
      description: 'Go from idea to launch in hours, not days. Automate the tedious parts of your workflow.',
      icon: Globe
    },
    {
      title: 'Increase Conversions',
      description: 'Our templates and AI copy are optimized for maximum ROI and customer engagement.',
      icon: ShieldCheck
    },
    {
      title: 'Scale Faster',
      description: 'Manage multiple products and campaigns with ease using our centralized dashboard.',
      icon: Users
    }
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for testing the waters.',
      features: ['1 Landing Page', '10 AI Credits', 'Basic Templates', 'Standard Support'],
      cta: t('auth.start_free'),
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For serious e-commerce sellers.',
      features: ['Unlimited Pages', 'Unlimited AI Credits', 'Premium Templates', 'Priority Support', 'Custom Domains', 'Analytics Dashboard'],
      cta: 'Get Started',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">AdRocket</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.library')}</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.pricing')}</a>
            <LanguageSwitcher />
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('auth.login')}</Link>
            <Link to="/login" className="btn-primary py-2 px-5 text-sm">{t('auth.start_free')}</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-indigo-50 rounded-full">
              The Ultimate E-commerce Toolkit
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Launch Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Winning Product</span> Faster
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              AdRocket gives you everything you need to build landing pages, generate high-converting ads, and find winning products—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="btn-primary text-lg px-10 py-4 flex items-center gap-2">
                {t('auth.start_free')} <ArrowRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
              </Link>
              <a href="#features" className="btn-secondary text-lg px-10 py-4">
                {t('nav.library')}
              </a>
            </div>
          </motion.div>

          {/* Hero Image / Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 p-4">
              <img 
                src="https://picsum.photos/seed/dashboard/1600/900" 
                alt="Dashboard Mockup" 
                className="rounded-2xl w-full shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Powerful tools designed for modern e-commerce entrepreneurs who want to move fast.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="premium-card p-8"
              >
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-16 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8 leading-tight">
                Built for speed, <br />
                optimized for conversions.
              </h2>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src="https://picsum.photos/seed/builder/800/1000" 
                  alt="Builder Interface" 
                  className="w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-600">Choose the plan that's right for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricing.map((plan, index) => (
              <div 
                key={index}
                className={`premium-card p-10 relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-display font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/login" 
                  className={`w-full block text-center py-4 rounded-xl font-bold transition-all ${
                    plan.popular ? 'bg-primary text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-2 rounded-xl">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">AdRocket</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                The all-in-one toolkit for e-commerce entrepreneurs. Build, launch, and scale your winning products with AI-powered tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} AdRocket. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
