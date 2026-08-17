
import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Language } from '../types';
import { useData } from '../context/DataContext';
import { MapPin, Clock, Star, ArrowRight, ArrowLeft, Calendar, Compass, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

interface PackagesProps {
  lang: Language;
}

const Packages: React.FC<PackagesProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const { packages } = useData();
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location')?.toLowerCase() || '';
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance banner slider every 7 seconds
  useEffect(() => {
    if (!packages || packages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % packages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [packages?.length]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [locationQuery, packages]);

  const filteredPackages = packages.filter(pkg => {
    if (!locationQuery) return true;
    
    const matchesTitle = pkg.titleEn.toLowerCase().includes(locationQuery) || pkg.titleUr.includes(locationQuery);
    const matchesLocation = pkg.locationEn.toLowerCase().includes(locationQuery) || pkg.locationUr.includes(locationQuery);
    
    return matchesTitle || matchesLocation;
  });

  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-20">
      <SEO 
        title={isUrdu ? "ٹور پیکیجز اور قیمتیں - کشمیر، ہنزہ، سکردو، سوات" : "Tour Packages & Prices - Kashmir, Hunza, Skardu, Swat, China Border"}
        description={isUrdu ? "کشمیر، ہنزہ، سکردو، سوات، گلگت اور خنجراب پاس کے فیملی اور گروپ ٹور پیکیجز کی قیمتیں اور تفصیلات۔ ملتان، لاہور اور اسلام آباد سے روانگی۔" : "Explore our premium tour packages to Kashmir, Hunza Valley, Skardu, Swat Valley, and China Border (Khunjerab Pass). Find competitive prices for family, corporate, and honeymoon tours in Pakistan."}
        keywords="Pakistan tour packages, Hunza package price, Skardu travel cost, Kashmir tour packages, Swat tour rates, China Border tour cost, Khunjerab Pass trip prices, Pakistan tourism packages, luxury tour rates Pakistan"
        canonicalUrl="/packages"
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
              <Compass size={15} className="text-emerald-400 flex-shrink-0" />
              <span>{isUrdu ? "سفرِ پربت سیاحتی پیکیجز" : "Handcrafted Travel Itineraries"}</span>
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
                    ہمارے ٹور
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    پیکیجز
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
                    Tour
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    Packages
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Frosted Backing */}
            <div className="max-w-2xl mx-auto px-2">
              <p className={`text-gray-200 text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/35 border border-white/10 backdrop-blur-sm shadow-xl inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu 
                  ? "گلگت بلتستان، آزاد کشمیر اور شمالی علاقہ جات کے پریمیم اور فیملی ٹورز" 
                  : "Explore our top tour packages with weekly weekend departures from Multan, Lahore & Islamabad."}
              </p>
            </div>

            {locationQuery && (
              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  {isUrdu ? `تلاش کے نتائج: "${locationQuery}"` : `Showing results for "${locationQuery}"`}
                </span>
              </div>
            )}
        </div>
      </div>

      {/* Dynamic Upcoming departures Banner / Slider */}
      {packages && packages.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-900 text-white relative overflow-hidden mb-12 rounded-[40px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_45%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_40%)]"></div>
          
          <div className="relative z-10">
            {/* Header section of banner */}
            <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 ${isUrdu ? 'font-urdu' : ''}`}>
              <span className="inline-flex items-center gap-2 text-xs font-black bg-emerald-500/10 text-emerald-300 px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest mb-3">
                <Sparkles size={14} className="text-emerald-400" />
                {isUrdu ? "خصوصی آنے والے ٹور شیڈول" : "Live Scheduled Departures"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {isUrdu ? "ہفتہ وار روانگیاں اور خصوصی ٹور پیکیجز" : "Upcoming Scheduled Departures"}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
                {isUrdu ? "ملتان، لاہور اور اسلام آباد سے ہر ہفتے روانہ ہونے والے ہمارے آفیشل ٹورز" : "Guaranteed departures with luxury transport, prime hotels, and expert guides."}
              </p>
            </div>

            {/* Banner Slider Container */}
            <div id="official-banner-link-card" className="bg-slate-950/80 backdrop-blur border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl relative">
              {packages.length > 1 && (
                <>
                  {/* Left Arrow Button */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + packages.length) % packages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  {/* Right Arrow Button */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % packages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {/* Slider wrapper */}
              <div className="relative min-h-[580px] sm:min-h-[520px] lg:min-h-[460px]">
                {packages.map((pkg, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <div
                      key={pkg.id}
                      className={`transition-all duration-700 ease-in-out absolute inset-0 flex flex-col lg:flex-row items-stretch ${
                        isActive ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-[0.98]'
                      }`}
                    >
                      {/* Left: Beautiful Dynamic Image with Overlays */}
                      <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
                        <img
                          src={pkg.image || "/banner_Jul_2026.jpg"}
                          alt={pkg.titleEn}
                          className="w-full h-full object-cover absolute inset-0"
                          referrerPolicy="no-referrer"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/banner_Jul_2026.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/10 lg:to-slate-950"></div>
                        
                        {/* Rating Badge */}
                        <div className="absolute top-6 left-6 bg-slate-900/85 backdrop-blur border border-slate-700 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black text-amber-400 shadow-xl">
                          <Star size={14} fill="currentColor" className="text-amber-400" />
                          <span>{pkg.rating} Rating</span>
                        </div>

                        {/* Slide Progress Indicator Badge */}
                        <div className="absolute bottom-6 left-6 bg-emerald-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3.5 py-1.5 rounded-xl shadow-xl tracking-wider">
                          {isUrdu ? `ٹور شیڈول ${idx + 1} / ${packages.length}` : `Tour Schedule ${idx + 1} / ${packages.length}`}
                        </div>
                      </div>

                      {/* Right: Comprehensive Details Section */}
                      <div className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 sm:space-y-5 ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
                        <div className={`flex flex-wrap items-center gap-2.5 ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black text-xs uppercase tracking-wider">
                            {isUrdu ? (pkg.durationUr || pkg.durationEn || "ٹور پیکیج") : (pkg.durationEn || "Tour Package")}
                          </span>
                          {pkg.dates && (
                            <span className="px-3 py-1 rounded-xl bg-slate-850 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-800">
                              <Calendar size={13} className="text-emerald-400" />
                              {pkg.dates}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                            {isUrdu ? pkg.titleUr : pkg.titleEn}
                          </h3>
                          <p className="text-emerald-400 font-extrabold text-xl sm:text-2xl">
                            {pkg.price} <span className="text-xs text-slate-400 font-medium">{isUrdu ? "/ فی کس مکمل ٹور" : "/ per traveler"}</span>
                          </p>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                          {isUrdu ? pkg.descriptionUr : pkg.descriptionEn}
                        </p>

                        {/* Facilities Included List */}
                        {pkg.inclusionsEn && pkg.inclusionsEn.length > 0 && (
                          <div className="space-y-2">
                            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                              {isUrdu ? "شامل سہولیات (Facilities included):" : "Premium Services Included:"}
                            </span>
                            <div className={`flex flex-wrap gap-1.5 ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                              {(isUrdu && pkg.inclusionsUr ? pkg.inclusionsUr : pkg.inclusionsEn).map((inc, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-bold text-slate-200 flex items-center gap-1 shadow-sm hover:border-emerald-500/30 transition-colors"
                                >
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  {inc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions Strip */}
                        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                          <a
                            href={`https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20instantly%20book%20seats%20for%20the%20upcoming%20tour:%20${encodeURIComponent(pkg.titleEn)}%20(${pkg.price}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] border border-emerald-500 cursor-pointer text-center"
                          >
                            <MessageCircle size={16} fill="currentColor" />
                            <span>{isUrdu ? "واٹس ایپ پر سیٹ بک کریں" : "BOOK VIA WHATSAPP"}</span>
                          </a>

                          <a
                            href="tel:03454737025"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center"
                          >
                            <Phone size={14} />
                            <span>0345-4737025</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider Dots indicators */}
              {packages.length > 1 && (
                <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex items-center gap-1.5">
                  {packages.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentSlide(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 p-6 animate-pulse space-y-4">
                <div className="h-60 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Link key={pkg.id} to={`/packages/${pkg.id}`} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:translate-y-[-5px] transition-transform duration-300 group">
                <div className="h-64 relative overflow-hidden">
                  <img 
                      src={pkg.image} 
                      alt={pkg.titleEn} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-sm font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    <Star size={14} fill="currentColor" /> {pkg.rating}
                  </div>
                </div>
                
                <div className={`p-6 flex-grow flex flex-col ${isUrdu ? 'text-right' : ''}`}>
                  <div className="flex-grow">
                      <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? pkg.titleUr : pkg.titleEn}
                      </h3>
                      
                      <div className={`flex items-center gap-2 text-gray-600 mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <MapPin size={18} className="text-brand-500" />
                          <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.locationUr : pkg.locationEn}</span>
                      </div>

                      <div className={`flex items-center gap-2 text-gray-500 mb-2 bg-gray-50 p-2 rounded-lg inline-block w-full ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Clock size={18} className="text-brand-500" />
                          <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.durationUr : pkg.durationEn}</span>
                      </div>

                      {pkg.dates && (
                        <div className={`flex items-center gap-2 text-brand-700 text-sm font-medium mb-4 px-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <Calendar size={16} />
                            <span>{pkg.dates}</span>
                        </div>
                      )}
                  </div>

                  <div className={`border-t border-gray-100 pt-6 mt-2 flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
                      <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {isUrdu ? 'قیمت' : 'Starting From'}
                          </span>
                          <span className="text-2xl font-bold text-brand-700">{pkg.price}</span>
                      </div>
                      <div 
                          className={`text-brand-600 font-bold flex items-center gap-2 group-hover:text-brand-700 transition ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                      >
                          {isUrdu ? 'تفصیلات دیکھیں' : 'View Details'}
                          {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="text-gray-400 mb-4">
               <MapPin size={64} className="mx-auto" />
             </div>
             <h3 className="text-2xl font-bold text-gray-700 mb-2">
               {isUrdu ? 'کوئی پیکیج نہیں ملا' : 'No Packages Found'}
             </h3>
             <p className="text-gray-500">
               {isUrdu ? 'براہ کرم مختلف الفاظ کے ساتھ دوبارہ تلاش کریں۔' : 'Try searching for a different location like "Hunza" or "Skardu".'}
             </p>
             <button 
                onClick={() => window.history.back()}
                className="mt-6 text-brand-600 font-bold hover:underline"
             >
                {isUrdu ? 'واپس جائیں' : 'Go Back'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
