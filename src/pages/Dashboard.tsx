import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Zap, 
  Lightbulb, 
  Rocket, 
  Plus, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Search,
  Brain,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const stats = [
    { label: t('dashboard.stats.pages'), value: '12', change: '+2.5%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: t('dashboard.stats.views'), value: '2,840', change: '+12.1%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: t('dashboard.stats.conversions'), value: '148', change: '+5.4%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('dashboard.stats.credits'), value: user?.isPro ? 'Unlimited' : user?.credits, change: 'Current', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const quickActions = [
    {
      title: t('nav.smartgen'),
      description: 'Generate a full page from link, image or idea.',
      icon: Sparkles,
      href: '/smart-gen',
      color: 'bg-indigo-600',
      shadow: 'shadow-indigo-500/20'
    },
    {
      title: t('dashboard.create'),
      description: 'Build a high-converting product page in minutes.',
      icon: Plus,
      href: '/create-page',
      color: 'bg-slate-800',
      shadow: 'shadow-slate-500/20'
    },
    {
      title: t('nav.adgen'),
      description: 'Generate Facebook & Instagram ads with AI.',
      icon: Zap,
      href: '/tools/ads',
      color: 'bg-purple-600',
      shadow: 'shadow-purple-500/20'
    },
    {
      title: t('nav.hooks'),
      description: 'Get 10 powerful ad hooks for your product.',
      icon: Rocket,
      href: '/tools/hooks',
      color: 'bg-pink-600',
      shadow: 'shadow-pink-500/20'
    },
    {
      title: t('nav.products'),
      description: 'Discover winning products to sell online.',
      icon: Lightbulb,
      href: '/tools/ideas',
      color: 'bg-orange-500',
      shadow: 'shadow-orange-500/20'
    },
    {
      title: t('nav.analyzer'),
      description: 'Analyze competitor ads and get winning ideas.',
      icon: Search,
      href: '/tools/analyzer',
      color: 'bg-emerald-600',
      shadow: 'shadow-emerald-500/20'
    }
  ];

  const recentActivity = [
    { type: 'Page Created', name: 'Summer Collection 2024', time: '2 hours ago', status: 'Active' },
    { type: 'Ad Generated', name: 'Anti-Gravity Humidifier', time: '5 hours ago', status: 'Draft' },
    { type: 'Page Updated', name: 'Wireless Earbuds Pro', time: '1 day ago', status: 'Active' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/ref/${user?.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">{t('dashboard.welcome')}, {user?.name} 👋</h1>
          <p className="mt-1 text-slate-500 font-medium">{t('dashboard.subtitle')}</p>
        </div>
        <Link to="/smart-gen" className="btn-primary flex items-center gap-2 self-start">
          <Sparkles className="w-5 h-5" /> {t('nav.smartgen')}
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-display font-bold text-slate-900">{t('dashboard.quick_actions')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className="group premium-card p-6 flex items-start gap-4 hover:border-primary/50 hover:bg-indigo-50/30 transition-all"
                >
                  <div className={`flex-shrink-0 rounded-xl p-3 ${action.color} shadow-lg ${action.shadow} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{action.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Referral Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-slate-900 p-8 text-white shadow-xl mb-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
              <div className="max-w-md">
                <h3 className="text-2xl font-display font-bold mb-2">{t('dashboard.referral.title')}</h3>
                <p className="text-slate-400 font-medium">{t('dashboard.referral.subtitle')}</p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                  <code className="text-sm font-mono text-slate-200" dir="ltr">{window.location.host}/ref/{user?.referralCode}</code>
                  <button 
                    onClick={handleCopy}
                    className="px-4 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? t('dashboard.referral.copied') : t('dashboard.referral.copy')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Competitor Ad Analyzer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="premium-card p-8 bg-gradient-to-br from-white to-slate-50 border-primary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Brain className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">{t('nav.analyzer')}</h2>
                </div>
                <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                  {isRTL 
                    ? 'استخدم الذكاء الاصطناعي لتحليل إعلانات منافسيك. استخرج زوايا البيع، الجمهور المستهدف، واحصل على أفكار إعلانية متفوقة في ثوانٍ.'
                    : 'Use AI to deconstruct your competitors\' ads. Extract selling angles, target audiences, and get superior ad ideas in seconds.'}
                </p>
                <Link 
                  to="/tools/analyzer" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {isRTL ? 'ابدأ التحليل الآن' : 'Start Analyzing Now'} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:block w-48 h-48 bg-emerald-50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                <Search className="w-20 h-20 text-emerald-200" />
                <Zap className="absolute top-4 right-4 w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-slate-900">{t('dashboard.recent_activity')}</h2>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="premium-card divide-y divide-slate-100"
          >
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors group">
                <div className="mt-1 p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-primary transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{activity.name}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      activity.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-50'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{activity.type} • {activity.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            ))}
          </motion.div>

          {/* Pro Teaser */}
          {!user?.isPro && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="premium-card p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-indigo-500/20"
            >
              <Zap className="w-8 h-8 text-amber-400 mb-4 fill-current" />
              <h3 className="text-lg font-bold mb-2">{t('dashboard.pro.title')}</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">{t('dashboard.pro.subtitle')}</p>
              <Link to="/upgrade" className="block w-full text-center py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-all">
                {t('dashboard.pro.button')}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
