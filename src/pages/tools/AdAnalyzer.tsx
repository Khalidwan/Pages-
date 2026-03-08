import React, { useState } from 'react';
import { generateContent } from '@/lib/gemini';
import { useAuth } from '@/context/AuthContext';
import { 
  Copy, 
  Loader2, 
  Search, 
  Sparkles, 
  Check, 
  Info, 
  Link as LinkIcon, 
  Video, 
  Upload, 
  Target, 
  Brain, 
  Lightbulb,
  MessageSquare,
  Zap,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

type AnalysisResult = {
  productName: string;
  targetAudience: string;
  sellingAngle: string;
  emotionalTriggers: string[];
  marketingHook: string;
  adStructure: string;
  hookAnalysis: string;
  improvementSuggestions: string[];
  newAds: {
    headlines: string[];
    primaryTexts: string[];
    hooks: string[];
    videoConcepts: string[];
  };
};

export default function AdAnalyzer() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'link' | 'video' | 'upload'>('link');
  
  const [formData, setFormData] = useState({
    url: '',
    videoUrl: '',
    screenshot: null as File | null,
    screenshotPreview: ''
  });

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        screenshot: file,
        screenshotPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let inputContext = '';
    let parts: any[] = [];
    let tools: any[] = [];

    if (activeTab === 'link') {
      inputContext = `Ad/Product Link: ${formData.url}`;
      tools = [{ urlContext: {} }];
    } else if (activeTab === 'video') {
      inputContext = `Video Link (TikTok/IG): ${formData.videoUrl}`;
      tools = [{ urlContext: {} }];
    } else if (activeTab === 'upload' && formData.screenshot) {
      inputContext = `Screenshot of an advertisement. Please analyze the product, text, and visual elements in this image.`;
      
      try {
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(formData.screenshot!);
        });

        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: formData.screenshot.type
          }
        });
      } catch (err) {
        console.error("Error reading image:", err);
      }
    }

    const prompt = `
      Act as a world-class marketing psychologist and Facebook Ads strategist.
      Analyze the following competitor advertisement content:
      
      ${inputContext}

      CRITICAL: You MUST identify the specific product, its features, and its benefits from the provided ${activeTab === 'upload' ? 'image' : 'link'}. 
      Do NOT provide generic or hallucinated information. If you cannot identify the product, state that clearly.
      
      Perform a deep analysis and extract the following details. 
      If a screenshot is provided, use the image content to identify the product and its features.
      If a link is provided, use the URL context to understand the product.
      
      Output JSON format ONLY with the following structure:
      {
        "productName": "string",
        "targetAudience": "string",
        "sellingAngle": "string",
        "emotionalTriggers": ["trigger 1", "trigger 2"],
        "marketingHook": "string",
        "adStructure": "string",
        "hookAnalysis": "string",
        "improvementSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
        "newAds": {
          "headlines": ["headline 1", "headline 2", "headline 3"],
          "primaryTexts": ["text 1", "text 2", "text 3"],
          "hooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5"],
          "videoConcepts": ["concept 1", "concept 2"]
        }
      }

      Language: ${isRTL ? 'Arabic' : 'English'}
    `;

    parts.push({ text: prompt });

    try {
      const response = await generateContent({
        contents: { parts },
        config: {
          tools: tools.length > 0 ? tools : undefined,
          responseMimeType: "application/json"
        }
      });
      
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      setResult(JSON.parse(cleanJson));
    } catch (error) {
      console.error(error);
      alert('Failed to analyze ad. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            {isRTL ? 'محلل إعلانات المنافسين بالذكاء الاصطناعي' : 'AI Competitor Ad Analyzer'}
          </h1>
        </div>
        <p className="text-slate-500 font-medium">
          {isRTL ? 'حلل إعلانات المنافسين الناجحة واستلهم أفكاراً إعلانية أفضل.' : 'Analyze successful competitor ads and generate better ad ideas.'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="premium-card p-8 sticky top-8">
            <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
              <button
                onClick={() => setActiveTab('link')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all",
                  activeTab === 'link' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <LinkIcon className="w-4 h-4" /> {isRTL ? 'رابط' : 'Link'}
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all",
                  activeTab === 'video' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Video className="w-4 h-4" /> {isRTL ? 'فيديو' : 'Video'}
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all",
                  activeTab === 'upload' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Upload className="w-4 h-4" /> {isRTL ? 'صورة' : 'Image'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'link' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {isRTL ? 'رابط الإعلان أو صفحة المنتج' : 'Ad or Product Page Link'}
                  </label>
                  <div className="relative">
                    <LinkIcon className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
                    <input
                      type="url"
                      required
                      className={cn(
                        "w-full py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium",
                        isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4"
                      )}
                      value={formData.url}
                      onChange={e => setFormData({...formData, url: e.target.value})}
                      placeholder="https://facebook.com/ads/..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'video' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {isRTL ? 'رابط فيديو (TikTok/Instagram)' : 'Video Link (TikTok/Instagram)'}
                  </label>
                  <div className="relative">
                    <Video className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400", isRTL ? "right-4" : "left-4")} />
                    <input
                      type="url"
                      required
                      className={cn(
                        "w-full py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium",
                        isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4"
                      )}
                      value={formData.videoUrl}
                      onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                      placeholder="https://tiktok.com/@user/video/..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'upload' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {isRTL ? 'تحميل لقطة شاشة للإعلان' : 'Upload Ad Screenshot'}
                  </label>
                  <div 
                    className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-slate-50/50"
                    onClick={() => document.getElementById('screenshot-upload')?.click()}
                  >
                    {formData.screenshotPreview ? (
                      <img src={formData.screenshotPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="text-sm font-bold text-slate-500">{isRTL ? 'انقر للتحميل أو اسحب الصورة هنا' : 'Click to upload or drag image here'}</p>
                      </div>
                    )}
                    <input 
                      id="screenshot-upload"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleScreenshotChange}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 flex justify-center items-center gap-3 disabled:opacity-70 shadow-xl shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    {isRTL ? 'تحليل الإعلان' : 'Analyze Ad'}
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-8"
        >
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Analysis Summary */}
                <div className="premium-card p-8">
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    {isRTL ? 'ملخص التحليل' : 'Analysis Summary'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'المنتج' : 'Product'}</p>
                        <p className="text-sm font-bold text-slate-900">{result.productName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'الجمهور المستهدف' : 'Target Audience'}</p>
                        <p className="text-sm font-medium text-slate-700">{result.targetAudience}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'زاوية البيع' : 'Selling Angle'}</p>
                        <p className="text-sm font-medium text-slate-700">{result.sellingAngle}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{isRTL ? 'المحفزات العاطفية' : 'Emotional Triggers'}</p>
                        <div className="flex flex-wrap gap-2">
                          {result.emotionalTriggers.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded-md">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deep Dive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="premium-card p-6">
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      {isRTL ? 'تحليل الهوك (Hook)' : 'Hook Analysis'}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{result.hookAnalysis}</p>
                  </div>
                  <div className="premium-card p-6">
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                      {isRTL ? 'هيكل الإعلان' : 'Ad Structure'}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{result.adStructure}</p>
                  </div>
                </div>

                {/* Improvements */}
                <div className="premium-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-emerald-500" />
                    {isRTL ? 'اقتراحات للتحسين' : 'Improvement Suggestions'}
                  </h3>
                  <div className="space-y-4">
                    {result.improvementSuggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-slate-700">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Ideas */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-slate-900">{isRTL ? 'أفكار إعلانية جديدة' : 'New Ad Ideas'}</h2>
                  
                  {/* Headlines */}
                  <div className="premium-card p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">{isRTL ? 'عناوين مقترحة' : 'Suggested Headlines'}</h3>
                    <div className="space-y-3">
                      {result.newAds.headlines.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-indigo-50/50 transition-colors">
                          <p className="text-sm font-bold text-slate-800">{item}</p>
                          <button 
                            onClick={() => copyToClipboard(item, `h-${i}`)} 
                            className={cn(
                              "p-2 rounded-lg transition-all",
                              copiedId === `h-${i}` ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-primary shadow-sm'
                            )}
                          >
                            {copiedId === `h-${i}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Text */}
                  <div className="premium-card p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">{isRTL ? 'نصوص إعلانية' : 'Primary Ad Texts'}</h3>
                    <div className="space-y-6">
                      {result.newAds.primaryTexts.map((item, i) => (
                        <div key={i} className="relative p-6 bg-slate-50 rounded-2xl group hover:bg-indigo-50/50 transition-colors border border-transparent hover:border-indigo-100">
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{item}</p>
                          <button 
                            onClick={() => copyToClipboard(item, `p-${i}`)} 
                            className={cn(
                              "absolute top-4 right-4 p-2 rounded-lg transition-all",
                              copiedId === `p-${i}` ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-primary shadow-sm opacity-0 group-hover:opacity-100'
                            )}
                          >
                            {copiedId === `p-${i}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Concepts */}
                  <div className="premium-card p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">{isRTL ? 'مفاهيم فيديو' : 'Video Ad Concepts'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.newAds.videoConcepts.map((item, i) => (
                        <div key={i} className="p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100">
                          <div className="flex items-center gap-2 mb-3">
                            <Video className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? 'مفهوم' : 'Concept'} {i + 1}</span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[600px] premium-card border-dashed border-2 border-slate-200 bg-slate-50/50"
              >
                <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
                  <Search className="h-12 w-12 text-slate-200" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{isRTL ? 'جاهز للتحليل؟' : 'Ready to analyze?'}</h3>
                <p className="text-slate-500 max-w-xs text-center">
                  {isRTL ? 'أدخل رابطاً أو ارفع صورة لإعلان منافس للحصول على تحليل عميق وأفكار جديدة.' : 'Enter a link or upload an ad screenshot to get deep insights and new ad ideas.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
