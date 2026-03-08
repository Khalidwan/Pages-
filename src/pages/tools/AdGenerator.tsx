import React, { useState } from 'react';
import { generateContent } from '@/lib/gemini';
import { useAuth } from '@/context/AuthContext';
import { Copy, Loader2, Zap, Sparkles, Check, Info, Languages, Target, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    benefit: '',
    audience: '',
    language: 'English'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
      Act as a world-class Facebook Ads copywriter.
      Create high-converting ad copy for the following product:
      
      Product Name: ${formData.productName}
      Category: ${formData.category}
      Price: ${formData.price}
      Main Benefit: ${formData.benefit}
      Target Audience: ${formData.audience}
      Language: ${formData.language}

      Output JSON format ONLY with the following structure:
      {
        "headlines": ["headline 1", "headline 2", "headline 3"],
        "primaryTexts": ["text 1", "text 2", "text 3"],
        "ctas": ["Shop Now", "Order Today", "Get Yours"],
        "hooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5"]
      }
    `;

    try {
      const response = await generateContent(prompt);
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      setResult(JSON.parse(cleanJson));
    } catch (error) {
      console.error(error);
      alert('Failed to generate ads. Please try again.');
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
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">AI Ad Copy Generator</h1>
        </div>
        <p className="text-slate-500 font-medium">Generate high-converting Facebook & Instagram ads in seconds using AI.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="premium-card p-8 sticky top-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Campaign Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    value={formData.productName}
                    onChange={e => setFormData({...formData, productName: e.target.value})}
                    placeholder="e.g. Anti-Gravity Humidifier"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    placeholder="Home Decor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="$49.99"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Main Benefit</label>
                <textarea
                  required
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium resize-none"
                  value={formData.benefit}
                  onChange={e => setFormData({...formData, benefit: e.target.value})}
                  placeholder="What makes your product unique?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Target Audience</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    value={formData.audience}
                    onChange={e => setFormData({...formData, audience: e.target.value})}
                    placeholder="e.g. Busy parents, Tech lovers"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
                <div className="relative">
                  <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium appearance-none"
                    value={formData.language}
                    onChange={e => setFormData({...formData, language: e.target.value})}
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Arabic</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 flex justify-center items-center gap-3 disabled:opacity-70 shadow-xl shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Ad Copy
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
                {/* Headlines */}
                <div className="premium-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Headlines
                  </h3>
                  <div className="space-y-3">
                    {result.headlines.map((item: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-indigo-50/50 transition-colors">
                        <p className="text-sm font-bold text-slate-800">{item}</p>
                        <button 
                          onClick={() => copyToClipboard(item, `h-${i}`)} 
                          className={`p-2 rounded-lg transition-all ${copiedId === `h-${i}` ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-primary shadow-sm'}`}
                        >
                          {copiedId === `h-${i}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Text */}
                <div className="premium-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Primary Ad Text
                  </h3>
                  <div className="space-y-6">
                    {result.primaryTexts.map((item: string, i: number) => (
                      <div key={i} className="relative p-6 bg-slate-50 rounded-2xl group hover:bg-indigo-50/50 transition-colors border border-transparent hover:border-indigo-100">
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{item}</p>
                        <button 
                          onClick={() => copyToClipboard(item, `p-${i}`)} 
                          className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${copiedId === `p-${i}` ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-primary shadow-sm opacity-0 group-hover:opacity-100'}`}
                        >
                          {copiedId === `p-${i}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hooks */}
                <div className="premium-card p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Scroll-Stopping Hooks
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {result.hooks.map((item: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-indigo-50/50 transition-colors">
                        <p className="text-sm font-medium text-slate-800 italic">"{item}"</p>
                        <button 
                          onClick={() => copyToClipboard(item, `hk-${i}`)} 
                          className={`p-2 rounded-lg transition-all ${copiedId === `hk-${i}` ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-primary shadow-sm'}`}
                        >
                          {copiedId === `hk-${i}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    ))}
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
                  <Zap className="h-12 w-12 text-slate-200" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Ready to generate?</h3>
                <p className="text-slate-500 max-w-xs text-center">Fill out the form on the left to generate high-converting ad copy for your product.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
