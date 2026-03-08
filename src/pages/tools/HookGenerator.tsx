import React, { useState } from 'react';
import { generateContent } from '@/lib/gemini';
import { Copy, Loader2, Rocket, Sparkles, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HookGenerator() {
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
      Generate 10 powerful, scroll-stopping marketing hooks for the following topic/product: "${topic}".
      The hooks should be short, punchy, and curiosity-inducing.
      Output ONLY a JSON array of strings. Example: ["Hook 1", "Hook 2"]
    `;

    try {
      const response = await generateContent(prompt);
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      setHooks(JSON.parse(cleanJson));
    } catch (error) {
      console.error(error);
      alert('Failed to generate hooks');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-3 rounded-2xl bg-pink-50 text-pink-600 mb-6"
        >
          <Rocket className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Viral Hook Generator</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Stop the scroll with psychologically proven hooks designed to grab attention instantly.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-8 mb-12"
      >
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Enter your product or niche (e.g. 'Weight Loss Tea')"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all font-medium"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-pink-600 text-white font-bold rounded-2xl hover:bg-pink-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-pink-500/20 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Hooks
              </>
            )}
          </button>
        </form>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {hooks.length > 0 ? (
            hooks.map((hook, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="premium-card p-6 flex items-center justify-between group hover:border-pink-200 hover:bg-pink-50/30 transition-all"
              >
                <p className="text-lg font-medium text-slate-800 leading-relaxed pr-8">
                  <span className="text-pink-200 font-display text-4xl mr-2 leading-none">"</span>
                  {hook}
                  <span className="text-pink-200 font-display text-4xl ml-2 leading-none">"</span>
                </p>
                <button
                  onClick={() => copyToClipboard(hook, i)}
                  className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                    copiedIndex === i 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-slate-400 hover:text-pink-600 shadow-sm opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {copiedIndex === i ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </motion.div>
            ))
          ) : !loading && (
            <div className="text-center py-20 opacity-20">
              <Rocket className="w-20 h-20 mx-auto text-slate-300 mb-4" />
              <p className="text-xl font-display font-bold text-slate-400">Your hooks will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
