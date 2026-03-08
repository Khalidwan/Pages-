import React, { useEffect, useState } from 'react';
import { storage, LandingPage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, TrendingUp, MousePointer2, Eye, Zap, ArrowUpRight, ArrowDownRight, Calendar, Filter, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Analytics() {
  const { user } = useAuth();
  const [pages, setPages] = useState<LandingPage[]>([]);

  useEffect(() => {
    if (user) {
      setPages(storage.getPages(user.id));
    }
  }, [user]);

  const totalViews = pages.reduce((acc, page) => acc + page.views, 0);
  const totalClicks = pages.reduce((acc, page) => acc + page.clicks, 0);
  const avgConversion = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;

  if (!user?.isPro) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Unlock Advanced Analytics</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto font-medium leading-relaxed">
              Get deep insights into your audience behavior. Track real-time views, clicks, and conversion rates for every campaign.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto text-left">
              {[
                'Real-time tracking',
                'Conversion funnels',
                'Device breakdown',
                'Geographic data',
                'Export to CSV',
                'Custom date ranges'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Zap className="w-4 h-4 text-amber-500 fill-current" />
                  {feature}
                </div>
              ))}
            </div>
            <Link
              to="/upgrade"
              className="btn-primary px-10 py-4 text-lg shadow-xl shadow-indigo-500/20"
            >
              Upgrade to Pro
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Analytics Overview</h1>
          <p className="mt-1 text-slate-500 font-medium">Performance metrics for your landing pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </header>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+12.5%' },
          { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: MousePointer2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+8.2%' },
          { label: 'Avg. Conversion', value: `${avgConversion}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+2.4%' },
        ].map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                <ArrowUpRight className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-4xl font-display font-bold text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Detailed Table */}
      <div className="premium-card overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-slate-900">Campaign Performance</h3>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Campaign</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Views</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Clicks</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">CTR</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => {
                const ctr = page.views > 0 ? ((page.clicks / page.views) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={page.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{page.title}</div>
                      <div className="text-xs font-medium text-slate-400 mt-0.5">{page.productName}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-600">{page.views.toLocaleString()}</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-600">{page.clicks.toLocaleString()}</td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${parseFloat(ctr) > 5 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${Math.min(parseFloat(ctr) * 5, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${
                          parseFloat(ctr) > 5 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {ctr}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Active</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-slate-400">
                      {new Date(page.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
