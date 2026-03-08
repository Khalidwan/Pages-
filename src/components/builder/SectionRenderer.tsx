import React from 'react';
import { Section } from '@/lib/storage';

interface SectionRendererProps {
  section: Section;
  onChange: (content: any) => void;
}

export function SectionRenderer({ section, onChange }: SectionRendererProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...section.content, [field]: value });
  };

  switch (section.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={section.content.headline || ''}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full text-3xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300"
            placeholder="Headline"
          />
          <textarea
            value={section.content.subheadline || ''}
            onChange={(e) => handleChange('subheadline', e.target.value)}
            className="w-full text-lg text-gray-600 border-none focus:ring-0 p-0 resize-none placeholder-gray-300"
            placeholder="Subheadline"
            rows={2}
          />
          <div className="flex gap-4">
            <input
              type="text"
              value={section.content.ctaText || ''}
              onChange={(e) => handleChange('ctaText', e.target.value)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium w-40 text-center placeholder-indigo-300"
              placeholder="Button Text"
            />
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={section.content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full text-2xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300 text-center"
            placeholder="Features Title"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="p-4 border border-dashed border-gray-200 rounded-lg">
                <input
                  type="text"
                  value={section.content.features?.[i]?.title || ''}
                  onChange={(e) => {
                    const newFeatures = [...(section.content.features || [])];
                    if (!newFeatures[i]) newFeatures[i] = {};
                    newFeatures[i].title = e.target.value;
                    handleChange('features', newFeatures);
                  }}
                  className="w-full font-bold mb-2 border-none focus:ring-0 p-0 placeholder-gray-300"
                  placeholder="Feature Title"
                />
                <textarea
                  value={section.content.features?.[i]?.description || ''}
                  onChange={(e) => {
                    const newFeatures = [...(section.content.features || [])];
                    if (!newFeatures[i]) newFeatures[i] = {};
                    newFeatures[i].description = e.target.value;
                    handleChange('features', newFeatures);
                  }}
                  className="w-full text-sm text-gray-500 border-none focus:ring-0 p-0 resize-none placeholder-gray-300"
                  placeholder="Feature Description"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={section.content.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full text-2xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300 text-center"
            placeholder="Testimonials Title"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[0, 1].map((i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl">
                <textarea
                  value={section.content.testimonials?.[i]?.text || ''}
                  onChange={(e) => {
                    const newTestimonials = [...(section.content.testimonials || [])];
                    if (!newTestimonials[i]) newTestimonials[i] = {};
                    newTestimonials[i].text = e.target.value;
                    handleChange('testimonials', newTestimonials);
                  }}
                  className="w-full text-gray-600 italic mb-4 bg-transparent border-none focus:ring-0 p-0 resize-none placeholder-gray-300"
                  placeholder="Testimonial text..."
                  rows={3}
                />
                <input
                  type="text"
                  value={section.content.testimonials?.[i]?.author || ''}
                  onChange={(e) => {
                    const newTestimonials = [...(section.content.testimonials || [])];
                    if (!newTestimonials[i]) newTestimonials[i] = {};
                    newTestimonials[i].author = e.target.value;
                    handleChange('testimonials', newTestimonials);
                  }}
                  className="w-full font-medium text-gray-900 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300"
                  placeholder="Author Name"
                />
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className="p-4 text-gray-400 italic">Unknown section type</div>;
  }
}
