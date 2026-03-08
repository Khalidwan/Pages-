import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Move } from 'lucide-react';

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
  onDelete: () => void;
  key?: React.Key;
}

export function SortableSection({ id, children, onDelete }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white rounded-3xl mb-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all border border-slate-100 hover:border-primary/20"
    >
      <div 
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-all bg-white shadow-xl border border-slate-100 rounded-xl z-10" 
        {...attributes} 
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
      </div>
      
      <div className="p-2">
        {children}
      </div>

      <button
        onClick={onDelete}
        className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all shadow-xl border border-slate-100 rounded-xl z-10 hover:scale-110 active:scale-90"
        title="Remove Section"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
