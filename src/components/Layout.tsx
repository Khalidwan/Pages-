import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  Lightbulb, 
  Library, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Rocket,
  Plus,
  Search,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.smartgen'), href: '/smart-gen', icon: Sparkles },
    { name: t('dashboard.create'), href: '/create-page', icon: Plus },
    { name: t('nav.adgen'), href: '/tools/ads', icon: Zap },
    { name: t('nav.hooks'), href: '/tools/hooks', icon: Rocket },
    { name: t('nav.products'), href: '/tools/ideas', icon: Lightbulb },
    { name: t('nav.analyzer'), href: '/tools/analyzer', icon: Search },
    { name: t('nav.library'), href: '/tools/library', icon: Library },
    { name: t('nav.pages'), href: '/pages', icon: FileText },
    { name: t('nav.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('nav.pricing'), href: '/upgrade', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar for Desktop */}
      <div className={cn(
        "hidden md:flex flex-col w-72 bg-white border-slate-200 shadow-sm z-30",
        isRTL ? "border-l" : "border-r"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 tracking-tight">AdRocket</span>
          </div>
        </div>

        <div className="px-8 mb-4">
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-indigo-50 text-primary shadow-sm shadow-indigo-500/5" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(isRTL ? "ml-3" : "mr-3", "h-5 w-5 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs font-medium text-slate-500 truncate">{user.isPro ? 'Pro Member' : 'Free Plan'}</p>
            </div>
          </div>
          
          {!user.isPro && (
            <Link 
              to="/upgrade"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 mb-4"
            >
              <Zap className="w-4 h-4 fill-current" />
              {t('nav.pricing')}
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-semibold text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut className={cn(isRTL ? "ml-3" : "mr-3", "h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors")} />
            {t('nav.logout')}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-slate-900">AdRocket</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-50 text-slate-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
          <nav className="px-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-4 text-base font-bold rounded-xl transition-all",
                  location.pathname === item.href
                    ? "bg-indigo-50 text-primary"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <item.icon className={cn(isRTL ? "ml-4" : "mr-4", "h-6 w-6")} />
                {item.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-6 mt-6">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-4 text-base font-bold text-red-600 bg-red-50 rounded-xl"
              >
                <LogOut className={cn(isRTL ? "ml-4" : "mr-4", "h-6 w-6")} />
                {t('nav.logout')}
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
