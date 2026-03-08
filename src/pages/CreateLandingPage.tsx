import React, { useState } from 'react';
import { storage, LandingPage } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash, Image as ImageIcon, Sparkles, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ProductDetailsForm from '@/components/forms/ProductDetailsForm';
import { cn } from '@/lib/utils';

export default function CreateLandingPage() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    productName: '',
    price: '',
    description: '',
    imageUrl: '',
    benefits: ['', '', ''],
    reviews: [
      { author: 'Sarah J.', text: 'Amazing product! Highly recommended.', rating: 5 },
      { author: 'Mike T.', text: 'Fast shipping and great quality.', rating: 5 }
    ],
    whatsappNumber: '',
    buttonText: 'Order Now'
  });

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPage: LandingPage = {
      id: generateId(),
      userId: user.id,
      ...formData,
      benefits: formData.benefits.filter(b => b.trim() !== ''),
      createdAt: new Date().toISOString(),
      views: 0,
      clicks: 0,
      removeWatermark: user.isPro
    };

    storage.savePage(newPage);
    setLoading(false);
    navigate('/pages');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            {isRTL ? 'إنشاء صفحة هبوط جديدة' : 'Create New Landing Page'}
          </h1>
        </div>
        <p className="text-slate-500 font-medium">
          {isRTL ? 'املأ التفاصيل أدناه لإنشاء صفحة منتج عالية التحويل.' : 'Fill in the details below to generate a high-converting product page.'}
        </p>
      </header>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="premium-card overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                {isRTL ? 'معلومات الحملة' : 'Campaign Information'}
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {isRTL ? 'عنوان الحملة (داخلي فقط)' : 'Campaign Title (Internal Only)'}
                  </label>
                  <input
                    type="text"
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                      isRTL && "text-right"
                    )}
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder={isRTL ? 'مثال: تخفيضات الصيف 2024' : 'e.g. Summer Sale 2024'}
                  />
                </div>
              </div>
            </div>
          </section>

          <ProductDetailsForm 
            values={{
              name: formData.productName,
              description: formData.description,
              price: formData.price,
              imageUrl: formData.imageUrl
            }}
            onChange={(values) => setFormData({
              ...formData,
              productName: values.name,
              description: values.description,
              price: values.price,
              imageUrl: values.imageUrl
            })}
          />

          <section className="premium-card overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {isRTL ? 'المميزات الرئيسية' : 'Key Benefits'}
              </h2>
            </div>
            <div className="p-8 space-y-4">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-primary font-bold text-xs">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    className={cn(
                      "flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                      isRTL && "text-right"
                    )}
                    value={benefit}
                    onChange={e => handleBenefitChange(index, e.target.value)}
                    placeholder={isRTL ? `ميزة ${index + 1}` : `e.g. 100% Waterproof Material`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({...formData, benefits: [...formData.benefits, '']})}
                className="flex items-center gap-2 text-sm font-bold text-primary hover:text-indigo-700 transition-colors mt-4"
              >
                <Plus className="w-4 h-4" /> {isRTL ? 'إضافة ميزة أخرى' : 'Add Another Benefit'}
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <section className="premium-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {isRTL ? 'إعدادات التحويل' : 'Conversion Settings'}
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {isRTL ? 'رقم الواتساب' : 'WhatsApp Number'}
                </label>
                <input
                  type="tel"
                  required
                  className={cn(
                    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                    isRTL && "text-right"
                  )}
                  value={formData.whatsappNumber}
                  onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                  placeholder="e.g. 1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {isRTL ? 'نص زر الطلب' : 'CTA Button Text'}
                </label>
                <input
                  type="text"
                  required
                  className={cn(
                    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                    isRTL && "text-right"
                  )}
                  value={formData.buttonText}
                  onChange={e => setFormData({...formData, buttonText: e.target.value})}
                  placeholder={isRTL ? 'اطلب الآن' : 'Order Now'}
                />
              </div>
            </div>
          </section>

          <div className="sticky top-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  {isRTL ? 'جاري التوليد...' : 'Generating...'}
                </>
              ) : (
                <>
                  {isRTL ? 'إطلاق الصفحة' : 'Launch Page'}
                  <ChevronRight className={cn("w-5 h-5", isRTL && "rotate-180")} />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-slate-400 font-medium">
              {isRTL ? 'بالنقر على إطلاق، فإنك توافق على' : 'By clicking Launch, you agree to our'} <br />
              <a href="#" className="underline">{isRTL ? 'شروط الخدمة' : 'Terms of Service'}</a>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
