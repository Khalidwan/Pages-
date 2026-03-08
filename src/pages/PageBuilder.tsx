import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { storage, LandingPage, Section } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { SortableSection } from '@/components/builder/SortableSection';
import { BuilderSidebar } from '@/components/builder/BuilderSidebar';
import { SectionRenderer } from '@/components/builder/SectionRenderer';
import { Save, Eye, ArrowLeft, Loader2, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (id) {
      const existingPage = storage.getPage(id);
      if (existingPage) {
        setPage(existingPage);
        setSections(existingPage.sections || []);
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddSection = (type: Section['type']) => {
    const newSection: Section = {
      id: generateId(),
      type,
      content: {},
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleUpdateSectionContent = (id: string, content: any) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedPage = { ...page, sections };
    storage.savePage(updatedPage);
    setSaving(false);
    alert('Page saved successfully!');
  };

  if (!page) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/pages')} 
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {page.title}
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Draft</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">Editor Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(`/p/${page.id}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs font-bold disabled:opacity-50 shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-12 pb-32 mr-80 scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {sections.length > 0 ? (
                  <div className="space-y-8">
                    {sections.map((section) => (
                      <SortableSection
                        key={section.id}
                        id={section.id}
                        onDelete={() => handleDeleteSection(section.id)}
                      >
                        <div className="premium-card overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all">
                          <SectionRenderer
                            section={section}
                            onChange={(content) => handleUpdateSectionContent(section.id, content)}
                          />
                        </div>
                      </SortableSection>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center bg-white/50"
                  >
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Layout className="w-8 h-8 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Start building your page</h3>
                    <p className="text-slate-500 max-w-xs mx-auto font-medium">Add sections from the sidebar on the right to begin creating your high-converting landing page.</p>
                  </motion.div>
                )}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Sidebar */}
        <BuilderSidebar onAddSection={handleAddSection} />
      </div>
    </div>
  );
}
