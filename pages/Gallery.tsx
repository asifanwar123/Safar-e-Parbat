import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { X, ChevronLeft, ChevronRight, Facebook, ThumbsUp, Trash2, Image as ImageIcon, Camera, Sparkles, Mountain, Compass, MapPin, Eye } from 'lucide-react';
import SEO from '../components/SEO';
import FacebookVideoShowcase from '../components/FacebookVideoShowcase';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [images, setImages] = useState<string[]>(() => {
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

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updated);
    localStorage.setItem('safareparbat_gallery_images', JSON.stringify(updated));
    
    if (selectedImageIndex === indexToRemove) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex !== null && selectedImageIndex > indexToRemove) {
      setSelectedImageIndex((prev) => prev! - 1);
    }
  };

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
       {/* Fancy Scenic Hero Banner */}
       <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white py-16 md:py-24 mb-12 shadow-2xl border-b border-brand-800/40">
        {/* Decorative Glowing Orbs & Parallax Light Accents */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Top Fancy Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
              <Camera size={16} className="text-emerald-400" />
              <span>{isUrdu ? "سفرِ پربت تصویری و مناظر گیلری" : "Visual Chronicles & Scenic Wonders"}</span>
              <Sparkles size={14} className="text-amber-300" />
            </div>

            {/* Main Title with Styled Border Stroke & Gradient Accent */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
              {isUrdu ? (
                <>
                  <span 
                    className="text-white"
                    style={{
                      WebkitTextStroke: '1.5px #ffffff',
                      paintOrder: 'stroke fill',
                      textShadow: '0 4px 24px rgba(0,0,0,0.7)'
                    }}
                  >
                    قدرت کے
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    حسین مناظر و یادیں
                  </span>
                </>
              ) : (
                <>
                  <span 
                    className="text-white"
                    style={{
                      WebkitTextStroke: '2px #ffffff',
                      paintOrder: 'stroke fill',
                      textShadow: '0 4px 24px rgba(0,0,0,0.7)'
                    }}
                  >
                    Moments in
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Timeless Splendor
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Frosted Backing */}
            <div className="max-w-2xl mx-auto mb-8">
              <p className={`text-gray-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed px-5 py-2.5 rounded-2xl bg-black/35 border border-white/10 backdrop-blur-sm shadow-xl inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu 
                  ? "ہنزہ، سکردو، عطا آباد جھیل، خنجراب پاس اور وادی نیلم کی اصل سفری تصاویر" 
                  : "Explore handpicked photographs from our real expeditions across Hunza, Skardu, Gilgit, Kashmir & Swat."}
              </p>
            </div>

            {/* Fancy Scenery & Region Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-gray-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm">
                <Mountain size={14} className="text-emerald-400" />
                {isUrdu ? "ہنزہ و سکردو" : "Hunza & Skardu"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm">
                <Compass size={14} className="text-teal-400" />
                {isUrdu ? "خنجراب بارڈر" : "Khunjerab Pass"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm">
                <MapPin size={14} className="text-cyan-400" />
                {isUrdu ? "عطا آباد و سیف الملوک" : "Scenic Alpine Lakes"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm">
                <Eye size={14} className="text-emerald-400" />
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
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer border border-gray-100 bg-gray-50"
              >
                {/* Click target wrapper for modal viewing */}
                <div onClick={() => openModal(index)} className="absolute inset-0 z-10" />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Stop opening the modal
                    handleRemoveImage(index);
                  }}
                  className="absolute top-3 right-3 z-20 bg-red-600/90 hover:bg-red-700 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 opacity-90 md:opacity-0 group-hover:opacity-100 transform hover:scale-110 flex items-center justify-center"
                  title={isUrdu ? 'حذف کریں' : 'Remove Image'}
                >
                  <Trash2 size={16} />
                </button>

                <img 
                  src={src} 
                  alt={`Safar-e-Parbat Gallery ${index + 1}`} 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500 block"
                  loading={index < 6 ? "eager" : "lazy"}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className={`text-white font-semibold bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-sm shadow-md transition-all duration-300 ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? 'دیکھیں' : 'View'}
                    </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Facebook Video Views & Reels Section */}
      <FacebookVideoShowcase lang={lang} />

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
                  {isUrdu ? 'سفر پربت™ فیس بک' : 'Connect with Safar-e-Parbat™'}
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
