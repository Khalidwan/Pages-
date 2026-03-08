import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storage, LandingPage } from '@/lib/storage';
import { MessageCircle, Star, Check, ShoppingBag } from 'lucide-react';

export default function PublicLandingPage() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundPage = storage.getPage(id);
      if (foundPage) {
        setPage(foundPage);
        // Increment views only once per session/load
        storage.incrementViews(id);
      }
      setLoading(false);
    }
  }, [id]);

  const handleWhatsAppClick = () => {
    if (page) {
      storage.incrementClicks(page.id);
      const message = `Hi, I'm interested in ${page.productName}.`;
      const url = `https://wa.me/${page.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!page) return <div className="min-h-screen flex items-center justify-center text-gray-500">Page not found</div>;

  // New Builder Layout
  if (page.sections && page.sections.length > 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        {page.sections.map((section) => {
          switch (section.type) {
            case 'hero':
              return (
                <div key={section.id} className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                    {section.content.headline}
                  </h1>
                  <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                    {section.content.subheadline}
                  </p>
                  {section.content.ctaText && (
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
                    >
                      {section.content.ctaText}
                    </button>
                  )}
                </div>
              );
            case 'features':
              return (
                <div key={section.id} className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{section.content.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {section.content.features?.map((feature: any, i: number) => (
                      <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'testimonials':
              return (
                <div key={section.id} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{section.content.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {section.content.testimonials?.map((t: any, i: number) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-xl">
                        <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                        <p className="font-bold text-gray-900">- {t.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'footer':
              return (
                <footer key={section.id} className="bg-gray-900 text-white py-12 px-4 text-center">
                  <p>© {new Date().getFullYear()} {page.productName}. All rights reserved.</p>
                </footer>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }

  // Legacy Layout
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">{page.productName}</span>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-green-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {page.buttonText}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-8 lg:mb-0">
              <img 
                src={page.imageUrl} 
                alt={page.productName} 
                className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                {page.productName}
              </h1>
              <p className="text-3xl text-indigo-600 font-bold mb-6">{page.price}</p>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {page.description}
              </p>
              
              <div className="space-y-4 mb-8">
                {page.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="w-6 h-6" />
                {page.buttonText}
              </button>
              <p className="mt-3 text-sm text-gray-400 text-center sm:text-left">
                Secure checkout via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.reviews.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <p className="font-bold text-gray-900">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-40">
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {page.buttonText}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} {page.productName}. All rights reserved.</p>
          {!page.removeWatermark && (
            <div className="mt-4">
              <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors">
                <ShoppingBag className="w-4 h-4" />
                Built with AdRocket
              </a>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
