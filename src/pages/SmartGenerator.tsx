import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Lightbulb, 
  Loader2, 
  ChevronRight,
  Upload,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { generateContent } from '@/lib/gemini';
import { storage, LandingPage } from '@/lib/storage';
import { generateId, cn } from '@/lib/utils';

export default function SmartGenerator() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'image' | 'idea'>('link');
  
  const [formData, setFormData] = useState({
    url: '',
    idea: '',
    image: null as File | null,
    imagePreview: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    let inputContext = '';
    let parts: any[] = [];
    let tools: any[] = [];

    if (activeTab === 'link') {
      inputContext = `Product Link: ${formData.url}`;
      tools = [{ urlContext: {} }, { googleSearch: {} }];
    } else if (activeTab === 'idea') {
      inputContext = `Product Idea: ${formData.idea}`;
      tools = [{ googleSearch: {} }];
    } else if (activeTab === 'image' && formData.image) {
      inputContext = `Product Image. Please analyze the product in this image.`;
      
      try {
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(formData.image!);
        });

        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: formData.image.type
          }
        });
      } catch (err) {
        console.error("Error reading image:", err);
      }
    }

    const prompt = `
      Act as a world-class e-commerce conversion expert and web scraper.
      Your task is to generate a HIGHLY ACCURATE landing page data structure for the following product:
      
      ${inputContext}

      CRITICAL INSTRUCTIONS:
      1. USE REAL DATA: You MUST extract the actual product title, price, and description from the provided ${activeTab === 'link' ? 'URL' : 'image'}. 
      2. NO HALLUCINATIONS: Do not invent features or benefits that do not exist for this specific product.
      3. IMAGES: Try to find the actual product image URL from the context. If you cannot find a direct URL, describe the product image accurately in a hidden field "imageDescription" and use a high-quality placeholder from picsum.photos that matches the product category.
      4. CONVERSION FOCUS: Write the marketing copy based ONLY on the real product facts but in a persuasive tone.
      5. LANGUAGE: All output text must be in ${isRTL ? 'Arabic' : 'English'}.

      Output JSON format ONLY with the following structure:
      {
        "title": "Internal Campaign Name",
        "productName": "Real Product Name from Source",
        "price": "Real Price (e.g. 199 SAR)",
        "description": "Persuasive description based on REAL product facts (2-3 paragraphs)",
        "imageUrl": "Actual product image URL if found, otherwise https://picsum.photos/seed/[product-name]/800/600",
        "benefits": ["Real benefit 1", "Real benefit 2", "Real benefit 3", "Real benefit 4"],
        "reviews": [
          { "author": "Name", "text": "Realistic review based on product category", "rating": 5 },
          { "author": "Name", "text": "Realistic review based on product category", "rating": 5 }
        ],
        "whatsappNumber": "1234567890",
        "buttonText": "${isRTL ? 'اطلب الآن' : 'Order Now'}"
      }
    `;

    parts.push({ text: prompt });

    try {
      const response = await generateContent({
        contents: { parts },
        config: {
          tools: tools.length > 0 ? tools : undefined,
          responseMimeType: "application/json"
        }
      }, "gemini-3.1-pro-preview");
      
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const pageData = JSON.parse(cleanJson);

      const newPage: LandingPage = {
        id: generateId(),
        userId: user.id,
        ...pageData,
        createdAt: new Date().toISOString(),
        views: 0,
        clicks: 0,
        removeWatermark: user.isPro
      };

      storage.savePage(newPage);
      navigate('/pages');
    } catch (error) {
      console.error(error);
      alert('Failed to generate landing page. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-primary rounded-full text-sm font-bold mb-6"
        >
          <Sparkles className="w-4 h-4" />
          {isRTL ? 'منشئ صفحات الهبوط بالذكاء الاصطناعي' : 'AI-Powered Smart Builder'}
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">
          {isRTL ? 'أنشئ صفحة هبوط في ثوانٍ' : 'Launch Your Page in Seconds'}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          {isRTL 
            ? 'اختر الطريقة التي تفضلها، وسيقوم الذكاء الاصطناعي لدينا بالباقي. لا حاجة للكتابة اليدوية.' 
            : 'Choose your preferred method and let our AI handle the rest. No manual writing required.'}
        </p>
      </header>

      <div className="premium-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('link')}
            className={cn(
              "flex-1 py-6 flex flex-col items-center gap-2 transition-all border-b-2",
              activeTab === 'link' 
                ? "bg-white border-primary text-primary" 
                : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <span className="text-sm font-bold">{isRTL ? 'من رابط منتج' : 'From Link'}</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={cn(
              "flex-1 py-6 flex flex-col items-center gap-2 transition-all border-b-2",
              activeTab === 'image' 
                ? "bg-white border-primary text-primary" 
                : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"
            )}
          >
            <ImageIcon className="w-6 h-6" />
            <span className="text-sm font-bold">{isRTL ? 'من صورة منتج' : 'From Image'}</span>
          </button>
          <button
            onClick={() => setActiveTab('idea')}
            className={cn(
              "flex-1 py-6 flex flex-col items-center gap-2 transition-all border-b-2",
              activeTab === 'idea' 
                ? "bg-white border-primary text-primary" 
                : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"
            )}
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-sm font-bold">{isRTL ? 'من فكرة بسيطة' : 'From Idea'}</span>
          </button>
        </div>

        <div className="p-10">
          <form onSubmit={handleGenerate} className="space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'link' && (
                <motion.div
                  key="link"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-bold text-slate-700">
                    {isRTL ? 'رابط المنتج (AliExpress, Amazon, Shopify)' : 'Product Link (AliExpress, Amazon, Shopify)'}
                  </label>
                  <div className="relative">
                    <LinkIcon className={cn("absolute top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300", isRTL ? "right-4" : "left-4")} />
                    <input
                      type="url"
                      required
                      className={cn(
                        "w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg font-medium",
                        isRTL ? "pr-14 pl-4 text-right" : "pl-14 pr-4"
                      )}
                      value={formData.url}
                      onChange={e => setFormData({...formData, url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">
                    {isRTL ? 'سنقوم باستخراج الصور والوصف تلقائياً.' : 'We will automatically extract images and descriptions.'}
                  </p>
                </motion.div>
              )}

              {activeTab === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-bold text-slate-700">
                    {isRTL ? 'صورة المنتج' : 'Product Image'}
                  </label>
                  <div 
                    className="border-3 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-primary transition-all cursor-pointer bg-slate-50/50 group"
                    onClick={() => document.getElementById('smart-image-upload')?.click()}
                  >
                    {formData.imagePreview ? (
                      <div className="relative inline-block">
                        <img src={formData.imagePreview} alt="Preview" className="max-h-64 rounded-2xl shadow-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                          <p className="text-white font-bold text-sm">{isRTL ? 'تغيير الصورة' : 'Change Image'}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Upload className="w-10 h-10 text-slate-300" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-600">{isRTL ? 'ارفع صورة المنتج' : 'Upload Product Image'}</p>
                          <p className="text-sm text-slate-400 font-medium mt-1">{isRTL ? 'سيتعرف الذكاء الاصطناعي على المنتج ويكتب المحتوى.' : 'AI will detect the product and write the copy.'}</p>
                        </div>
                      </div>
                    )}
                    <input 
                      id="smart-image-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'idea' && (
                <motion.div
                  key="idea"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-bold text-slate-700">
                    {isRTL ? 'فكرة المنتج' : 'Product Idea'}
                  </label>
                  <div className="relative">
                    <Lightbulb className={cn("absolute top-5 w-6 h-6 text-slate-300", isRTL ? "right-4" : "left-4")} />
                    <textarea
                      required
                      rows={4}
                      className={cn(
                        "w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg font-medium resize-none",
                        isRTL ? "pr-14 pl-4 text-right" : "pl-14 pr-4"
                      )}
                      value={formData.idea}
                      onChange={e => setFormData({...formData, idea: e.target.value})}
                      placeholder={isRTL ? 'مثال: خلاط محمول للسفر والرياضة' : 'e.g. Portable blender for travel and gym'}
                    />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">
                    {isRTL ? 'اكتب فكرة بسيطة وسيقوم الذكاء الاصطناعي ببناء صفحة كاملة.' : 'Write a simple idea and AI will build a full page.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading || (activeTab === 'image' && !formData.image)}
                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-6 h-6" />
                    {isRTL ? 'جاري بناء صفحتك...' : 'Building Your Page...'}
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" />
                    {isRTL ? 'توليد الصفحة الآن' : 'Generate Page Now'}
                    <ChevronRight className={cn("w-6 h-6", isRTL && "rotate-180")} />
                  </>
                )}
              </button>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Zap, text: isRTL ? 'أقل من 10 ثوانٍ' : 'Under 10 seconds' },
                  { icon: CheckCircle2, text: isRTL ? 'تحسين عالي للتحويل' : 'Conversion optimized' },
                  { icon: Sparkles, text: isRTL ? 'محتوى تسويقي ذكي' : 'Smart marketing copy' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <item.icon className="w-4 h-4" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
