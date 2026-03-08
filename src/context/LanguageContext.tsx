import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.pages': 'My Pages',
    'nav.builder': 'Page Builder',
    'nav.adgen': 'Ad Generator',
    'nav.hooks': 'Hook Generator',
    'nav.products': 'Product Ideas',
    'nav.library': 'Ads Library',
    'nav.analyzer': 'Ad Analyzer',
    'nav.smartgen': 'Smart AI Builder',
    'nav.analytics': 'Analytics',
    'nav.pricing': 'Pricing',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'Here is what is happening with your campaigns today.',
    'dashboard.create': 'Create New Page',
    'dashboard.stats.views': 'Total Views',
    'dashboard.stats.clicks': 'Total Clicks',
    'dashboard.stats.conversion': 'Avg. Conversion',
    'dashboard.stats.revenue': 'Estimated Revenue',
    'common.save': 'Save Changes',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.share': 'Share',
    'common.preview': 'Preview',
    'common.loading': 'Loading...',
    'auth.login': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.forgot': 'Forgot password?',
    'auth.no_account': "Don't have an account?",
    'auth.has_account': 'Already have an account?',
    'auth.start_free': 'Sign up for free',
    'auth.signin_here': 'Sign in here',
    'dashboard.stats.pages': 'Landing Pages',
    'dashboard.stats.conversions': 'Conversions',
    'dashboard.stats.credits': 'AI Credits',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.referral.title': 'Invite friends & earn credits!',
    'dashboard.referral.subtitle': 'Share your referral link and get 50 free AI credits for every successful signup.',
    'dashboard.referral.copy': 'Copy',
    'dashboard.referral.copied': 'Copied',
    'dashboard.pro.title': 'Unlock Pro Features',
    'dashboard.pro.subtitle': 'Get unlimited landing pages, priority AI generation, and custom domain support.',
    'dashboard.pro.button': 'Upgrade Now',
    'pages.title': 'My Landing Pages',
    'pages.subtitle': 'Manage and monitor your high-converting product pages.',
    'pages.search': 'Search pages...',
    'pages.filter': 'Filter',
    'pages.no_pages': 'No pages found',
    'pages.no_pages_subtitle': "You haven't created any landing pages yet. Start by creating your first high-converting page.",
    'pages.create_first': 'Create Your First Page',
    'pages.stats.views': 'Views',
    'pages.stats.clicks': 'Clicks',
    'pages.stats.conv': 'Conv. Rate',
    'pages.actions.edit': 'Edit Page',
    'pages.actions.delete': 'Delete Page',
    'pages.actions.share': 'Share Page',
    'pages.actions.view': 'View Live Page',
  },
  ar: {
    'nav.dashboard': 'لوحة التحكم',
    'nav.pages': 'صفحاتي',
    'nav.builder': 'منشئ الصفحات',
    'nav.adgen': 'مولد الإعلانات',
    'nav.hooks': 'مولد العناوين',
    'nav.products': 'أفكار المنتجات',
    'nav.library': 'مكتبة الإعلانات',
    'nav.analyzer': 'محلل الإعلانات',
    'nav.smartgen': 'المنشئ الذكي',
    'nav.analytics': 'التحليلات',
    'nav.pricing': 'الأسعار',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'dashboard.welcome': 'مرحباً بك مجدداً',
    'dashboard.subtitle': 'إليك ما يحدث في حملاتك اليوم.',
    'dashboard.create': 'إنشاء صفحة جديدة',
    'dashboard.stats.views': 'إجمالي المشاهدات',
    'dashboard.stats.clicks': 'إجمالي النقرات',
    'dashboard.stats.conversion': 'متوسط التحويل',
    'dashboard.stats.revenue': 'الإيرادات المتوقعة',
    'common.save': 'حفظ التغييرات',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.share': 'مشاركة',
    'common.preview': 'معاينة',
    'common.loading': 'جاري التحميل...',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.forgot': 'نسيت كلمة المرور؟',
    'auth.no_account': 'ليس لديك حساب؟',
    'auth.has_account': 'لديك حساب بالفعل؟',
    'auth.start_free': 'سجل مجاناً',
    'auth.signin_here': 'سجل دخولك هنا',
    'dashboard.stats.pages': 'صفحات الهبوط',
    'dashboard.stats.conversions': 'التحويلات',
    'dashboard.stats.credits': 'رصيد الذكاء الاصطناعي',
    'dashboard.quick_actions': 'إجراءات سريعة',
    'dashboard.recent_activity': 'النشاط الأخير',
    'dashboard.referral.title': 'ادعُ أصدقاءك واكسب رصيداً!',
    'dashboard.referral.subtitle': 'شارك رابط الإحالة الخاص بك واحصل على 50 رصيداً مجانياً لكل عملية تسجيل ناجحة.',
    'dashboard.referral.copy': 'نسخ',
    'dashboard.referral.copied': 'تم النسخ',
    'dashboard.pro.title': 'افتح مميزات برو',
    'dashboard.pro.subtitle': 'احصل على صفحات هبوط غير محدودة، وأولوية في توليد المحتوى، ودعم النطاقات المخصصة.',
    'dashboard.pro.button': 'ترقية الآن',
    'pages.title': 'صفحات الهبوط الخاصة بي',
    'pages.subtitle': 'إدارة ومراقبة صفحات المنتجات عالية التحويل الخاصة بك.',
    'pages.search': 'البحث عن الصفحات...',
    'pages.filter': 'تصفية',
    'pages.no_pages': 'لم يتم العثور على صفحات',
    'pages.no_pages_subtitle': 'لم تقم بإنشاء أي صفحات هبوط بعد. ابدأ بإنشاء صفحتك الأولى.',
    'pages.create_first': 'أنشئ صفحتك الأولى',
    'pages.stats.views': 'المشاهدات',
    'pages.stats.clicks': 'النقرات',
    'pages.stats.conv': 'معدل التحويل',
    'pages.actions.edit': 'تعديل الصفحة',
    'pages.actions.delete': 'حذف الصفحة',
    'pages.actions.share': 'مشاركة الصفحة',
    'pages.actions.view': 'عرض الصفحة المباشرة',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
