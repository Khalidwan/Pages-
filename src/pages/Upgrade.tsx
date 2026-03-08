import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Check, Rocket, Zap, Shield, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Upgrade() {
  const { user, upgradeToPro } = useAuth();

  const handleUpgrade = () => {
    // In a real app, this would redirect to PayPal
    const paypalUrl = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=khalidha9i9i@gmail.com&item_name=AdRocket%20Pro&amount=10.00&currency_code=USD";
    
    window.open(paypalUrl, '_blank');
    
    if (confirm("Simulate successful payment? (Click OK to upgrade account)")) {
      upgradeToPro();
      alert("Account upgraded to Pro!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-primary font-bold text-sm mb-6"
        >
          <Crown className="w-4 h-4" />
          Join 2,000+ successful sellers
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Scale your business with Pro</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Unlock unlimited landing pages, advanced AI tools, and priority support to take your e-commerce brand to the next level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-card p-10 flex flex-col h-full bg-white/50"
        >
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Starter</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-slate-900">$0</span>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 font-medium">Perfect for testing your first product ideas.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {[
              { text: '1 Active Landing Page', included: true },
              { text: '3 AI Generations / day', included: true },
              { text: 'Basic Analytics', included: true },
              { text: 'AdRocket Watermark', included: false },
              { text: 'Custom Domain', included: false },
            ].map((item, i) => (
              <li key={i} className={`flex items-center gap-3 text-sm font-medium ${item.included ? 'text-slate-700' : 'text-slate-400'}`}>
                <Check className={`w-5 h-5 ${item.included ? 'text-emerald-500' : 'text-slate-200'}`} />
                {item.text}
              </li>
            ))}
          </ul>

          <button disabled className="w-full py-4 px-6 bg-slate-100 text-slate-500 font-bold rounded-xl cursor-not-allowed">
            Current Plan
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-card p-10 flex flex-col h-full border-2 border-primary relative shadow-2xl shadow-indigo-500/20"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Most Popular
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Pro</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-slate-900">$10</span>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 font-medium">Everything you need to scale to 6-figures.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {[
              { text: 'Unlimited Landing Pages', included: true },
              { text: 'Unlimited AI Ad Tools', included: true },
              { text: 'Advanced Analytics', included: true },
              { text: 'Remove Watermark', included: true },
              { text: 'Custom Domain Support', included: true },
              { text: 'Priority 24/7 Support', included: true },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                <div className="bg-indigo-50 p-0.5 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>

          {user?.isPro ? (
            <button disabled className="w-full py-4 px-6 bg-emerald-50 text-emerald-600 font-bold rounded-xl flex items-center justify-center gap-2">
              <Star className="w-5 h-5 fill-current" /> Active Subscription
            </button>
          ) : (
            <button 
              onClick={handleUpgrade}
              className="w-full btn-primary py-4 px-6 text-lg shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Upgrade to Pro
            </button>
          )}
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-12">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-50 text-slate-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Secure Payment</h4>
            <p className="text-xs text-slate-500 font-medium">Processed via PayPal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-50 text-slate-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Instant Access</h4>
            <p className="text-xs text-slate-500 font-medium">Unlock tools immediately</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-50 text-slate-600">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Cancel Anytime</h4>
            <p className="text-xs text-slate-500 font-medium">No long-term contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
