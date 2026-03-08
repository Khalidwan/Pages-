import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, ArrowRight, Mail, Lock, User as UserIcon, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function Auth() {
  const { t, isRTL } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, name);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      const success = signup(email, name || email.split('@')[0]);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already registered.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Left Side: Form */}
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">AdRocket</span>
            </Link>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              {isLogin ? t('auth.login') : t('auth.signup')}
            </h2>
            <p className="text-slate-500">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start your 7-day free trial today.'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.name')}</label>
                <div className="relative">
                  <UserIcon className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={cn(
                      "w-full pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                      isRTL ? "pl-4 pr-12" : "pl-12 pr-4"
                    )}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.email')}</label>
              <div className="relative">
                <Mail className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={cn(
                    "w-full pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                    isRTL ? "pl-4 pr-12" : "pl-12 pr-4"
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">{t('auth.password')}</label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-primary hover:underline">{t('auth.forgot')}</a>
                )}
              </div>
              <div className="relative">
                <Lock className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                    isRTL ? "pl-4 pr-12" : "pl-12 pr-4"
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 mt-4"
            >
              {isLogin ? t('auth.login') : t('auth.signup')}
              <ArrowRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            {isLogin ? t('auth.no_account') : t('auth.has_account')}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold hover:underline mx-1"
            >
              {isLogin ? t('auth.start_free') : t('auth.signin_here')}
            </button>
          </p>
        </div>

        {/* Right Side: Visual/Social Proof */}
        <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -ml-48 -mb-48" />
          
          <div className="relative z-10">
            <h3 className="text-4xl font-display font-bold mb-8 leading-tight">
              Join 10,000+ <br />
              successful sellers.
            </h3>
            <div className="space-y-6">
              {[
                'Unlimited Landing Pages',
                'AI-Powered Ad Generation',
                'Winning Product Research',
                '24/7 Priority Support'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-emerald-500/20 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-medium text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-slate-300 italic mb-4 leading-relaxed">
              "AdRocket has completely transformed how I launch products. I went from 0 to $10k/month in just 30 days using their builder and AI tools."
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://i.pravatar.cc/100?u=sarah" 
                alt="Sarah" 
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div>
                <p className="font-bold text-sm">Sarah Jenkins</p>
                <p className="text-xs text-slate-400">E-commerce Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
