import React from 'react';
import { Plus, Layout, Type, Image, MessageSquare, Phone, Sparkles, Layers, MousePointer2 } from 'lucide-react';
import { Section } from '@/lib/storage';
import { motion } from 'framer-motion';

interface BuilderSidebarProps {
  onAddSection: (type: Section['type']) => void;
}

export function BuilderSidebar({ onAddSection }: BuilderSidebarProps) {
  const components = [
    { type: 'hero', label: 'Hero Section', icon: Layout, description: 'Main headline and image' },
    { type: 'features', label: 'Features', icon: Layers, description: 'List of key benefits' },
    { type: 'testimonials', label: 'Testimonials', icon: MessageSquare, description: 'Customer reviews' },
    { type: 'cta', label: 'Call to Action', icon: MousePointer2, description: 'Final conversion button' },
    { type: 'footer', label: 'Footer', icon: Layout, description: 'Links and copyright' },
  ] as const;

  return (
    <div className="w-80 bg-white border-l border-slate-200 h-full overflow-y-auto p-6 fixed right-0 top-16 bottom-0 z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-indigo-50 p-1.5 rounded-lg">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Components</h3>
      </div>
      
      <div className="space-y-4">
        {components.map((component, i) => (
          <motion.button
            key={component.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onAddSection(component.type)}
            className="w-full flex items-start p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-primary hover:bg-indigo-50/30 transition-all group text-left relative overflow-hidden"
          >
            <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:shadow-indigo-100 transition-all">
              <component.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{component.label}</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{component.description}</p>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              <Plus className="w-4 h-4 text-primary" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-2xl rounded-full -mr-12 -mt-12" />
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Pro Feature</p>
        <h4 className="text-sm font-bold mb-2">Custom HTML</h4>
        <p className="text-[11px] text-slate-400 font-medium mb-4 leading-relaxed">Add your own custom code and scripts to your landing page.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/10">
          Upgrade to Unlock
        </button>
      </div>
    </div>
  );
}
