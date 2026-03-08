import React, { useState } from 'react';
import { generateContent } from '@/lib/gemini';
import { Lightbulb, Loader2, TrendingUp, Sparkles, Rocket, ArrowRight, ShoppingBag, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductIdea {
  name: string;
  description: string;
  viralReason: string;
  angle: string;
}

export default function ProductIdeas() {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProductIdea[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `
      Generate 3 winning e-commerce product ideas that are trending right now.
      For each product, provide:
      1. Product Name
      2. Short Description
      3. Why it could go viral
      4. Suggested Ad Angle

      Output ONLY a JSON array of objects with keys: name, description, viralReason, angle.
    `;

    try {
      const response = await generateContent(prompt);
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      setIdeas(JSON.parse(cleanJson));
    } catch (error) {
      console.error(error);
      alert('Failed to generate ideas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Winning Product Ideas</h1>
          </div>
          <p className="text-slate-500 font-medium">Discover your next best-seller with AI-powered trend analysis.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-primary flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 shadow-xl shadow-amber-500/20"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
            <>
              <Sparkles className="w-5 h-5" />
              Find New Products
            </>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {ideas.length > 0 ? (
            ideas.map((idea, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="premium-card group overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-amber-50 transition-colors">
                      <ShoppingBag className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Trending</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{idea.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{idea.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                      <p className="text-[10px] font-bold text-emerald-700 uppercase mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Viral Potential
                      </p>
                      <p className="text-sm text-emerald-800 font-medium leading-relaxed">{idea.viralReason}</p>
                    </div>

                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                      <p className="text-[10px] font-bold text-indigo-700 uppercase mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" /> Marketing Angle
                      </p>
                      <p className="text-sm text-indigo-800 font-medium italic leading-relaxed">"{idea.angle}"</p>
                    </div>
                  </div>

                  <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-400 group-hover:text-primary transition-colors border-t border-slate-100 pt-6">
                    Create Landing Page <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-24 premium-card border-dashed border-2 border-slate-200 bg-slate-50/50"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm inline-block mb-6">
                <Lightbulb className="w-12 h-12 text-slate-200" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Discover your next winner</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Click the button above to generate 3 winning product ideas based on current market trends.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
