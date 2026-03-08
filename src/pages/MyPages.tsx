import React, { useEffect, useState } from 'react';
import { storage, LandingPage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  MousePointer2, 
  ExternalLink, 
  Trash2, 
  Share2, 
  Facebook, 
  Twitter, 
  Edit, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Copy,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function MyPages() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [shareOpen, setShareOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      setPages(storage.getPages(user.id));
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      storage.deletePage(id);
      if (user) {
        setPages(storage.getPages(user.id));
      }
    }
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'copy', page: LandingPage) => {
    const url = `${window.location.origin}/p/${page.id}`;
    const text = `${page.productName} - ${page.title}`;

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
    setShareOpen(null);
  };

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">{t('pages.title')}</h1>
          <p className="mt-1 text-slate-500 font-medium">{t('pages.subtitle')}</p>
        </div>
        <Link
          to="/create-page"
          className="btn-primary flex items-center gap-2 self-start"
        >
          <Plus className="w-5 h-5" /> {t('dashboard.create')}
        </Link>
      </header>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
          <input 
            type="text" 
            placeholder={t('pages.search')}
            className={cn(
              "w-full py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium",
              isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all w-full sm:w-auto justify-center">
          <Filter className="w-5 h-5" /> {t('pages.filter')}
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPages.length > 0 ? (
            filteredPages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="premium-card group"
              >
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Thumbnail */}
                  <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative group-hover:shadow-lg transition-all">
                    <img 
                      src={page.imageUrl || `https://picsum.photos/seed/${page.id}/400/300`} 
                      alt={page.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to={`/p/${page.id}`} target="_blank" className="p-2 bg-white rounded-full text-slate-900 shadow-xl hover:scale-110 transition-transform">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-display font-bold text-slate-900 truncate">{page.title}</h3>
                      <span className="flex-shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Active</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-4 flex items-center gap-2">
                      {page.productName} • <span className="text-primary font-bold">{page.price}</span>
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-indigo-50 text-primary">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pages.stats.views')}</p>
                          <p className="text-sm font-bold text-slate-900">{page.views.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                          <MousePointer2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pages.stats.clicks')}</p>
                          <p className="text-sm font-bold text-slate-900">{page.clicks.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pages.stats.conv')}</p>
                          <p className="text-sm font-bold text-slate-900">
                            {page.views > 0 ? Math.round((page.clicks / page.views) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={cn(
                    "flex items-center gap-2 lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 border-slate-100 pt-6 lg:pt-0",
                    isRTL ? "lg:border-r lg:pr-8" : "lg:border-l lg:pl-8"
                  )}>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          onClick={() => setShareOpen(shareOpen === page.id ? null : page.id)}
                          className="p-2.5 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-xl transition-all"
                          title={t('pages.actions.share')}
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        
                        {shareOpen === page.id && (
                          <div className={cn(
                            "absolute bottom-full mb-2 w-48 bg-white rounded-xl shadow-2xl z-50 border border-slate-100 py-2 overflow-hidden",
                            isRTL ? "left-0" : "right-0"
                          )}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare('facebook', page);
                              }}
                              className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Facebook className={cn("w-4 h-4 text-blue-600", isRTL ? "ml-3" : "mr-3")} /> Facebook
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare('twitter', page);
                              }}
                              className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Twitter className={cn("w-4 h-4 text-sky-500", isRTL ? "ml-3" : "mr-3")} /> Twitter
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare('copy', page);
                              }}
                              className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Copy className={cn("w-4 h-4 text-slate-500", isRTL ? "ml-3" : "mr-3")} /> {t('dashboard.referral.copy')}
                            </button>
                          </div>
                        )}
                      </div>

                      <Link
                        to={`/builder/${page.id}`}
                        className="p-2.5 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-xl transition-all"
                        title={t('pages.actions.edit')}
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title={t('pages.actions.delete')}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <Link
                      to={`/p/${page.id}`}
                      target="_blank"
                      className="hidden lg:flex items-center gap-2 text-xs font-bold text-primary hover:underline mt-2"
                    >
                      {t('pages.actions.view')} <ExternalLink className={cn("w-3 h-3", isRTL && "rotate-180")} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="premium-card p-20 text-center"
            >
              <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{t('pages.no_pages')}</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">{t('pages.no_pages_subtitle')}</p>
              <Link
                to="/create-page"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> {t('pages.create_first')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
