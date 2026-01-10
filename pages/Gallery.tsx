import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { X, ChevronLeft, ChevronRight, Facebook } from 'lucide-react';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  
  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % GALLERY_IMAGES.length);
    }
  }, [selectedImageIndex]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  }, [selectedImageIndex]);

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
    <div className="pt-20 min-h-screen bg-white pb-20">
       <div className="bg-gray-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {CONTENT[lang].nav.gallery}
            </h1>
            <p className={`text-gray-400 text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? "ہمارے سفر کی یادیں" : "Moments from our journeys"}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, index) => (
            <div 
              key={index} 
              onClick={() => openModal(index)}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Safar-e-Parbat Gallery ${index + 1}`} 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facebook Embed Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <div className="inline-block p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Facebook size={32} />
                </div>
                <h2 className={`text-3xl font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? 'فیس بک پر ہمیں فالو کریں' : 'Follow us on Facebook'}
                </h2>
                <p className={`text-gray-500 mt-2 ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? 'تازہ ترین تصاویر اور اپ ڈیٹس کے لیے' : 'For latest photos and updates'}
                </p>
            </div>
            
            <div className="flex justify-center">
                <div className="w-full max-w-[500px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <iframe 
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsafareparbat&tabs=timeline%2Cphotos&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                        width="500" 
                        height="800" 
                        style={{border:'none', overflow:'hidden', maxWidth: '100%'}} 
                        scrolling="no" 
                        frameBorder="0" 
                        allowFullScreen={true} 
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Safar-e-Parbat Facebook Page"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedImageIndex !== null && (
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
               src={GALLERY_IMAGES[selectedImageIndex]} 
               alt="Full screen view" 
               className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
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