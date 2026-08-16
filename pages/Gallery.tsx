import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera, Sparkles, Mountain, Compass, MapPin, Eye } from 'lucide-react';
import SEO from '../components/SEO';
import FacebookVideoShowcase from '../components/FacebookVideoShowcase';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [images] = useState<string[]>(() => {
    const saved = localStorage.getItem('safareparbat_gallery_images');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to constants
      }
    }
    return GALLERY_IMAGES;
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  
  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null && images.length > 0) {
      setSelectedImageIndex((prev) => (prev! + 1) % images.length);
    }
  }, [selectedImageIndex, images.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null && images.length > 0) {
      setSelectedImageIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [selectedImageIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, nextImage, prevImage]);

  return (
    <div className="pt-20 min-h-screen bg-white pb-0">
      <SEO 
        title={isUrdu ? "گیلری - سفرِ پربت کے حسین مناظر" : "Photo Gallery - Northern Pakistan Tourism & Landscapes"}
        description={isUrdu ? "پاکستان کے دلکش قدرتی مناظر، ہنزہ، سکردو، عطا آباد جھیل، پاسو کونز اور خنجراب پاس کی خوبصورت تصاویر۔" : "Explore photos of Pakistan's breathtaking natural landscapes: Hunza Valley, Skardu, Attabad Lake, Passu Cones, and Saif-ul-Malook Lake with Safar-e-Parbat."}
        keywords="Pakistan tourism photos, Hunza valley gallery, Skardu pictures, Saif-ul-Malook photos, Passu cones wallpaper, Northern Pakistan landscapes"
        canonicalUrl="/gallery"
        lang={lang}
      />
       {/* Fancy Scenic Hero Banner - 100% Width, Borderless & Fully Responsive */}
       <div className="w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 mb-8 sm:mb-12 shadow-2xl border-none">
        {/* Decorative Glowing Orbs & Parallax Light Accents */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Top Fancy Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-md shadow-lg">
              <Camera size={15} className="text-emerald-400 flex-shrink-0" />
              <span>{isUrdu ? "سفرِ پربت تصویری و مناظر گیلری" : "Visual Chronicles & Scenic Wonders"}</span>
              <Sparkles size={13} className="text-amber-300 flex-shrink-0" />
            </div>

            {/* Main Title with Styled Border Stroke & Gradient Accent */}
            <h1 className={`text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-5 leading-tight sm:leading-tight md:leading-tight ${isUrdu ? 'font-urdu leading-relaxed sm:leading-relaxed' : ''}`}>
              {isUrdu ? (
                <>
                  <span 
                    className="text-white inline-block"
                    style={{
                      WebkitTextStroke: '1.5px #ffffff',
                      paintOrder: 'stroke fill',
                      textShadow: '0 4px 24px rgba(0,0,0,0.7)'
                    }}
                  >
                    قدرت کے
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    حسین مناظر و یادیں
                  </span>
                </>
              ) : (
                <>
                  <span 
                    className="text-white inline-block"
                    style={{
                      WebkitTextStroke: '1.5px #ffffff',
                      paintOrder: 'stroke fill',
                      textShadow: '0 4px 24px rgba(0,0,0,0.7)'
                    }}
                  >
                    Moments in
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    Timeless Splendor
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Frosted Backing */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              <p className={`text-gray-200 text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/35 border border-white/10 backdrop-blur-sm shadow-xl inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu 
                  ? "ہنزہ، سکردو، عطا آباد جھیل، خنجراب پاس اور وادی نیلم کی اصل سفری تصاویر" 
                  : "Explore handpicked photographs from our real expeditions across Hunza, Skardu, Gilgit, Kashmir & Swat."}
              </p>
            </div>

            {/* Fancy Scenery & Region Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-[11px] sm:text-xs md:text-sm text-gray-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm shadow-sm">
                <Mountain size={13} className="text-emerald-400 flex-shrink-0" />
                {isUrdu ? "ہنزہ و سکردو" : "Hunza & Skardu"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm shadow-sm">
                <Compass size={13} className="text-teal-400 flex-shrink-0" />
                {isUrdu ? "خنجراب بارڈر" : "Khunjerab Pass"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm shadow-sm">
                <MapPin size={13} className="text-cyan-400 flex-shrink-0" />
                {isUrdu ? "عطا آباد و سیف الملوک" : "Scenic Alpine Lakes"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm shadow-sm">
                <Eye size={13} className="text-emerald-400 flex-shrink-0" />
                {isUrdu ? `${images.length}+ خوبصورت تصاویر` : `${images.length}+ Curated Photographs`}
              </span>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {images.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
             <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
             <p className={`text-gray-500 ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? 'گیلری میں کوئی تصویر دستیاب نہیں ہے۔' : 'No images currently available in the gallery.'}
             </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, index) => (
              <div 
                key={index} 
                onClick={() => openModal(index)}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-2xl"
              >
                <img 
                  src={src} 
                  alt={`Safar-e-Parbat Gallery ${index + 1}`} 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500 block"
                  loading={index < 6 ? "eager" : "lazy"}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className={`text-white font-semibold bg-black/70 px-5 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 transform group-hover:scale-105 ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? 'بڑی تصویر دیکھیں' : 'View Full Image'}
                    </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Facebook Video Views & Reels Section */}
      <FacebookVideoShowcase lang={lang} />

      {/* Modal / Lightbox */}
      {selectedImageIndex !== null && images.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50"
          >
            <X size={40} />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50 hidden md:block"
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative max-w-7xl max-h-screen p-4 flex items-center justify-center">
             <img 
               src={images[selectedImageIndex]} 
               alt="Full screen view" 
               className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
               referrerPolicy="no-referrer"
             />
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50 hidden md:block"
          >
            <ChevronRight size={48} />
          </button>
          
          {/* Mobile Tap Navigation Areas */}
          <div className="md:hidden absolute inset-y-0 left-0 w-1/3 z-40" onClick={(e) => { e.stopPropagation(); prevImage(); }}></div>
          <div className="md:hidden absolute inset-y-0 right-0 w-1/3 z-40" onClick={(e) => { e.stopPropagation(); nextImage(); }}></div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
