import React from 'react';
import { ExternalLink, ThumbsUp, Sparkles, Layout, Target, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdsLibrary() {
  const ads = [
    {
      id: 1,
      title: "The 'Us vs Them' Angle",
      niche: "Beauty",
      description: "Compare your product directly with competitors or traditional methods. Use a split screen visual.",
      example: "Stop using harsh chemicals. Our organic serum gives you the same glow without the burn.",
      image: "https://picsum.photos/seed/makeup/800/600",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "The 'Problem/Agitation/Solution'",
      niche: "Gadgets",
      description: "Highlight a common pain point, agitate it, then present your product as the only solution.",
      example: "Phone battery always dying? Missed an important call again? Meet the infinite charger.",
      image: "https://picsum.photos/seed/tech/800/600",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: "User Generated Content (UGC)",
      niche: "Fashion",
      description: "Use raw, authentic video or images from real customers. It builds trust instantly.",
      example: "I didn't believe the hype until I tried these jeans. Look at this fit!",
      image: "https://picsum.photos/seed/fashion/800/600",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 4,
      title: "The 'FOMO' Offer",
      niche: "General",
      description: "Create urgency with limited time offers or stock warnings.",
      example: "50% OFF ends tonight. Only 12 items left in stock.",
      image: "https://picsum.photos/seed/watch/800/600",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Layout className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Winning Ads Library</h1>
        </div>
        <p className="text-slate-500 font-medium">Proven ad frameworks and examples to inspire your next high-converting campaign.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ads.map((ad, index) => (
          <motion.div 
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card group overflow-hidden"
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                {ad.niche}
              </div>
              <div className={`absolute bottom-4 left-4 p-2 rounded-xl bg-gradient-to-br ${ad.color} text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0`}>
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-slate-900">{ad.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{ad.description}</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Example Copy</p>
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed font-medium">"{ad.example}"</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-12 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.3),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold mb-4">Want more frameworks?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Our Pro members get access to 100+ proven ad templates updated weekly.</p>
          <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl">
            Upgrade to Pro Library
          </button>
        </div>
      </div>
    </div>
  );
}
