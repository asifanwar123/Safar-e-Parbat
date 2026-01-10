import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { X, ChevronLeft, ChevronRight, Facebook, ThumbsUp } from 'lucide-react';

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
    <div className="pt-20 min-h-screen bg-white pb-0">
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

      {/* Fancy Facebook Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        
        {/* Animated decorative blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Text Content */}
            <div className={`w-full lg:w-1/2 text-white ${isUrdu ? 'lg:order-last lg:text-right text-center' : 'text-center lg:text-left'}`}>
               <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/20 shadow-lg ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <ThumbsUp size={20} className="text-yellow-400" fill="currentColor" />
                  <span className={`font-semibold tracking-wide ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? 'ہماری کمیونٹی میں شامل ہوں' : 'Join Our Online Community'}
                  </span>
               </div>
               
               <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
                  {isUrdu ? 'سفر پربت فیس بک' : 'Connect with Safar-e-Parbat'}
               </h2>
               
               <p className={`text-blue-100 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 ${isUrdu ? 'font-urdu' : ''}`}>
                  {isUrdu 
                    ? 'ہمارے پیج کو لائک کریں اور ہماری سیاحتی کمیونٹی کا حصہ بنیں۔ تازہ ترین تصاویر، ویڈیوز اور اپ ڈیٹس حاصل کریں۔' 
                    : 'Like our page to be part of our vibrant travel family. Get daily doses of mountain views, tour updates, and traveler stories right on your feed.'}
               </p>
               
               <div className={`flex flex-col sm:flex-row items-center gap-4 ${isUrdu ? 'lg:flex-row-reverse justify-center lg:justify-start' : 'justify-center lg:justify-start'}`}>
                 <a 
                   href="https://www.facebook.com/safareparbat" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                 >
                   <Facebook size={24} fill="currentColor" />
                   {isUrdu ? 'فیس بک پر وزٹ کریں' : 'Visit Facebook Page'}
                 </a>
                 <span className="text-blue-200 text-sm font-medium">{isUrdu ? 'یا دائیں طرف دیکھیں' : 'or preview on the right'}</span>
               </div>
            </div>

            {/* Iframe Card Container */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[420px]">
                {/* Glowing backdrop effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-[2.5rem] blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                
                <div className="relative bg-white rounded-[2rem] p-3 shadow-2xl border border-white/50 backdrop-blur-xl">
                  {/* Fake Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 mb-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="bg-gray-100 flex-grow mx-4 rounded-full h-6 flex items-center px-3">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Iframe Container */}
                  <div className="bg-gray-50 rounded-xl overflow-hidden h-[500px] w-full relative">
                     <iframe 
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsafareparbat&tabs=timeline&width=380&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                        width="100%" 
                        height="100%" 
                        style={{border:'none', overflow:'hidden'}} 
                        scrolling="no" 
                        frameBorder="0" 
                        allowFullScreen={true} 
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Safar-e-Parbat Facebook Page"
                        className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl transform rotate-12 animate-bounce" style={{animationDuration: '3s'}}>
                   <ThumbsUp className="text-blue-600" size={32} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

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