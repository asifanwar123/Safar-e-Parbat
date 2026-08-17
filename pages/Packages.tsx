
import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Language } from '../types';
import { useData } from '../context/DataContext';
import { MapPin, Clock, Star, ArrowRight, ArrowLeft, Calendar, Compass, Sparkles } from 'lucide-react';
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
        title={isUrdu ? "ٹور پیکیجز - سفرِ پربت" : "Tour Packages - Explore Pakistan with Safar-e-Parbat"}
        description={isUrdu ? "گلگت، ہنزہ، سکردو، خنجراب پاس اور وادی نیلم کشمیر کے بہترین ٹور پیکیجز۔ ملتان اور پاکستان بھر سے روانگی کے ساتھ۔" : "Explore our top tour packages: Gilgit & Hunza, Skardu Gateway to Heaven, Khunjerab Pass China Border, and Azad Kashmir Paradise. Book your dream vacation now!"}
        keywords="Pakistan tour packages, Hunza package price, Skardu travel cost, Gilgit Khunjerab tour, Azad Kashmir Neelum tour, Northern Pakistan travel rates"
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
