import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ImageIcon, Info, DollarSign, Tag, AlignLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductDetails {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface ProductDetailsFormProps {
  values: ProductDetails;
  onChange: (values: ProductDetails) => void;
  className?: string;
}

export default function ProductDetailsForm({ values, onChange, className }: ProductDetailsFormProps) {
  const { t, isRTL } = useLanguage();

  const handleChange = (field: keyof ProductDetails, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <section className={cn("premium-card overflow-hidden", className)}>
      <div className="p-8 border-b border-slate-100 bg-slate-50/30">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          {isRTL ? 'تفاصيل المنتج' : 'Product Details'}
        </h2>
      </div>
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {isRTL ? 'اسم المنتج' : 'Product Name'}
            </label>
            <div className="relative">
              <Tag className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
              <input
                type="text"
                required
                className={cn(
                  "w-full py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                  isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4"
                )}
                value={values.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder={isRTL ? 'مثال: سماعات لاسلكية برو' : 'e.g. Wireless Earbuds Pro'}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {isRTL ? 'السعر' : 'Price'}
            </label>
            <div className="relative">
              <DollarSign className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
              <input
                type="text"
                required
                className={cn(
                  "w-full py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                  isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4"
                )}
                value={values.price}
                onChange={e => handleChange('price', e.target.value)}
                placeholder={isRTL ? 'مثال: 199 ريال' : 'e.g. $49.99'}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {isRTL ? 'رابط صورة المنتج' : 'Product Image URL'}
            </label>
            <div className="relative">
              <ImageIcon className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
              <input
                type="url"
                required
                className={cn(
                  "w-full py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium",
                  isRTL ? "pr-12 pl-4 text-left" : "pl-12 pr-4"
                )}
                dir="ltr"
                value={values.imageUrl}
                onChange={e => handleChange('imageUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {isRTL ? 'وصف المنتج' : 'Product Description'}
            </label>
            <div className="relative">
              <AlignLeft className={cn("absolute top-4 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
              <textarea
                required
                rows={4}
                className={cn(
                  "w-full py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium resize-none",
                  isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4"
                )}
                value={values.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder={isRTL ? 'صف مميزات المنتج وفوائده للعميل...' : 'Describe your product features and benefits...'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
