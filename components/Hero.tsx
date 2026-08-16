
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, 
  Home, Coffee, Compass, Camera, Search,
  Sparkles, X, Mountain, Waves, ArrowRight, ArrowLeft,
  Bell, MessageCircle
} from 'lucide-react';
import { CONTENT, HERO_SLIDES } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

interface DestinationSuggestion {
  nameEn: string;
  nameUr: string;
  regionEn: string;
  regionUr: string;
  category: 'valleys' | 'lakes' | 'peaks';
  query: string;
  badgeEn?: string;
  badgeUr?: string;
}

const NEWS_BULLETINS = [
  {
    en: "⚡ Coming Tours: Weekly departures to Hunza, Skardu & Khunjerab Pass with direct pickups from Multan & Islamabad.",
    ur: "⚡ آنے والے ٹورز: ملتان اور اسلام آباد سے براہ راست پک اپ کے ساتھ ہنزہ، سکردو اور خنجراب پاس کے ہفتہ وار ٹورز۔"
  },
  {
    en: "📢 Early Bird Discount: Special Group & Family rates available on upcoming Northern tours. Call +92 333 4737025.",
    ur: "📢 فیملی اور کارپوریٹ گروپس کے لیے آنے والے ٹورز پر خصوصی رعایت دستیاب ہے۔ رابطہ کریں: 4737025 333 92+۔"
  },
  {
    en: "🏔️ Limited Seats: Skardu & Deosai Plains luxury departure booking open for upcoming batch. Reserve now!",
    ur: "🏔️ محدود نشستیں: سکردو و دیوسائی پلینز لگژری ٹور کی بکنگ جاری ہے۔ اپنی سیٹ ابھی بک کروائیں۔"
  }
];

const POPULAR_DESTINATIONS: DestinationSuggestion[] = [
  {
    nameEn: "Hunza Valley & Altit",
    nameUr: "ہنزہ ویلی و التیت فورٹ",
    regionEn: "Gilgit-Baltistan",
    regionUr: "گلگت بلتستان",
    category: "valleys",
    query: "Hunza",
    badgeEn: "Top Rated",
    badgeUr: "بہترین درجہ بندی"
  },
  {
    nameEn: "Skardu & Deosai Plains",
    nameUr: "سکردو و دیوسائی پلینز",
    regionEn: "Baltistan",
    regionUr: "بلتستان",
    category: "peaks",
    query: "Skardu",
    badgeEn: "Popular",
    badgeUr: "مقبول ترین"
  },
  {
    nameEn: "Gilgit & Khunjerab Pass",
    nameUr: "گلگت و خنجراب پاس",
    regionEn: "Pak-China Border",
    regionUr: "پاک چین بارڈر",
    category: "peaks",
    query: "Khunjerab",
    badgeEn: "Highest Border",
    badgeUr: "بلند ترین سرحد"
  },
  {
    nameEn: "Neelum Valley & Arang Kel",
    nameUr: "وادی نیلم و ارنگ کھیل",
    regionEn: "Azad Kashmir",
    regionUr: "آزاد کشمیر",
    category: "valleys",
    query: "Kashmir",
    badgeEn: "Paradise",
    badgeUr: "جنت نظیر"
  },
  {
    nameEn: "Attabad Lake & Passu Cones",
    nameUr: "عطا آباد جھیل و پاسو کونز",
    regionEn: "Upper Hunza",
    regionUr: "اپر ہنزہ",
    category: "lakes",
    query: "Passu",
  },
  {
    nameEn: "Swat Valley & Malam Jabba",
    nameUr: "سوات ویلی و مالم جبہ",
    regionEn: "Khyber Pakhtunkhwa",
    regionUr: "خیبر پختونخوا",
    category: "valleys",
    query: "Swat",
  }
];

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = CONTENT[lang].hero;
  const isUrdu = lang === 'ur';
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate news ticker
  useEffect(() => {
    const newsTimer = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % NEWS_BULLETINS.length);
    }, 4500);
    return () => clearInterval(newsTimer);
  }, []);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = (searchQuery !== undefined ? searchQuery : location).trim();
    setIsDropdownOpen(false);
    navigate(`/packages?location=${encodeURIComponent(finalQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const selectDestination = (dest: DestinationSuggestion) => {
    const query = isUrdu ? dest.nameUr : dest.nameEn;
    setLocation(query);
    handleSearch(dest.query);
  };

  const filteredSuggestions = POPULAR_DESTINATIONS.filter(item => {
    if (!location.trim()) return true;
    const q = location.toLowerCase().trim();
    return (
      item.nameEn.toLowerCase().includes(q) ||
      item.nameUr.includes(q) ||
      item.regionEn.toLowerCase().includes(q) ||
      item.regionUr.includes(q) ||
      item.query.toLowerCase().includes(q)
    );
  });

  const accentColorClass = HERO_SLIDES[currentSlide].accentColor || "text-amber-300";

  return (
    <div className="relative w-full bg-gray-50 pt-20 pb-4 px-2 sm:px-4 lg:px-6 flex justify-center overflow-hidden">
       {/* Main Card Container */}
       <div className="relative w-full max-w-[1500px] h-[85vh] min-h-[600px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl group border-[6px] border-white ring-1 ring-gray-200">
          
          {/* Background Image Slider */}
          {HERO_SLIDES.map((slide, index) => (
             <div 
               key={index}
               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
             >
                <img 
                  src={slide.image} 
                  alt={slide.name} 
                  className="w-full h-full object-cover" 
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
             </div>
          ))}

          {/* Right Side Rotated Name */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 flex items-center justify-center z-30 border-l border-white/10 backdrop-blur-sm hidden sm:flex">
             <div className="rotate-90 whitespace-nowrap text-white font-bold text-lg md:text-xl tracking-[0.2em] uppercase drop-shadow-md">
                {HERO_SLIDES[currentSlide].name}
             </div>
          </div>

          {/* Top Middle News Update / Coming Tours Ticker Banner */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[94%] sm:w-[88%] max-w-3xl lg:max-w-4xl z-30 pointer-events-auto">
             <div className="bg-black/60 hover:bg-black/75 backdrop-blur-xl border border-white/25 text-white rounded-2xl sm:rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-2 transition-all duration-300">
                
                {/* News Badge with Live Glow */}
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-red-600/95 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md shrink-0 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <Bell size={13} className="text-white animate-bounce" />
                  <span>{isUrdu ? "تازہ ترین اپ ڈیٹس" : "Coming Tours Update"}</span>
                </div>

                {/* Dynamic News Headline */}
                <div className="flex-grow min-w-0 px-2 text-center sm:text-left w-full overflow-hidden">
                  <p className={`text-[11px] sm:text-xs md:text-sm font-medium text-emerald-300/95 truncate transition-all duration-500 ${isUrdu ? 'font-urdu sm:text-right' : ''}`}>
                    {isUrdu ? NEWS_BULLETINS[activeNewsIndex].ur : NEWS_BULLETINS[activeNewsIndex].en}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className={`flex items-center gap-2 shrink-0 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <a
                    href="https://wa.me/923334737025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                  >
                    <MessageCircle size={13} />
                    <span>{isUrdu ? "بکنگ و معلومات" : "Inquire Now"}</span>
                  </a>
                </div>

             </div>
          </div>

          {/* Floating Badges */}
          <div className="hidden lg:block absolute top-[15%] left-[5%] animate-float-slow z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Compass size={18} className={accentColorClass.replace('text-', 'text-opacity-80 text-')} />
                <span className="text-sm font-semibold tracking-wide">Adventure</span>
             </div>
          </div>
          <div className="hidden lg:block absolute top-[15%] right-[12%] animate-float-delayed z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Home size={18} className={accentColorClass.replace('text-', 'text-opacity-80 text-')} />
                <span className="text-sm font-semibold tracking-wide">Accommodation</span>
             </div>
          </div>
          
          <div className="hidden lg:block absolute bottom-[40%] left-[5%] animate-float z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Coffee size={18} className={accentColorClass.replace('text-', 'text-opacity-80 text-')} />
                <span className="text-sm font-semibold tracking-wide">Breakfast</span>
             </div>
          </div>

           <div className="hidden lg:block absolute bottom-[35%] right-[10%] animate-float-slow z-10" style={{ animationDelay: '2s' }}>
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Camera size={18} className={accentColorClass.replace('text-', 'text-opacity-80 text-')} />
                <span className="text-sm font-semibold tracking-wide">Photography</span>
             </div>
          </div>


          {/* Central Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pb-20">
             <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-2xl mb-6 leading-tight transition-colors duration-1000 select-none ${isUrdu ? 'font-urdu' : ''}`}>
               {t.title.includes(' ') ? (
                 <>
                   <span 
                     className="text-brand-900"
                     style={{
                       WebkitTextStroke: '2.5px #ffffff',
                       paintOrder: 'stroke fill',
                       textShadow: '0 4px 20px rgba(0,0,0,0.6)'
                     }}
                   >
                     {t.title.split(' ')[0]}
                   </span>{' '}
                   <span 
                     className={`${accentColorClass} transition-colors duration-1000`}
                     style={{
                       WebkitTextStroke: '2.5px #ffffff',
                       paintOrder: 'stroke fill',
                       textShadow: '0 4px 20px rgba(0,0,0,0.6)'
                     }}
                   >
                     {t.title.split(' ').slice(1).join(' ')}
                   </span>
                 </>
               ) : (
                 <span 
                   className={`${accentColorClass} transition-colors duration-1000`}
                   style={{
                     WebkitTextStroke: '2.5px #ffffff',
                     paintOrder: 'stroke fill',
                     textShadow: '0 4px 20px rgba(0,0,0,0.6)'
                   }}
                 >
                   {t.title}
                 </span>
               )}
             </h1>

             {/* Subtitle with 35% opacity black background */}
             <div className="max-w-3xl mx-auto mb-10 px-2">
                <p 
                  className={`text-base sm:text-lg md:text-2xl text-white drop-shadow-lg leading-relaxed font-medium px-6 py-3.5 rounded-2xl md:rounded-full border border-white/20 shadow-2xl inline-block backdrop-blur-sm ${isUrdu ? 'font-urdu' : ''}`}
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
                >
                  {t.subtitle}
                </p>
             </div>

             {/* Redesigned Professional Tourism Location Search Bar */}
             <div ref={searchContainerRef} className="w-full max-w-3xl mx-auto px-2 sm:px-4 relative z-40">
                {/* Main Search Bar Capsule */}
                <div className={`bg-white/95 backdrop-blur-2xl p-2 sm:p-2.5 rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.28)] border border-white/80 transition-all duration-300 flex flex-col md:flex-row items-center gap-2 focus-within:ring-4 focus-within:ring-emerald-400/30 focus-within:shadow-[0_25px_60px_rgba(0,0,0,0.4)] ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Location Icon & Input Group */}
                    <div className={`flex items-center gap-2.5 sm:gap-3.5 flex-grow w-full px-3 py-1.5 sm:py-2 ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}>
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner flex-shrink-0">
                            <MapPin size={22} className="animate-bounce-short" />
                        </div>
                        
                        <div className="flex flex-col flex-grow min-w-0">
                            <label className={`text-[10px] font-extrabold uppercase tracking-wider text-emerald-800/80 flex items-center gap-1 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                              <Sparkles size={11} className="text-amber-500" />
                              <span>{isUrdu ? "سیاحتی مقام یا وادی تلاش کریں" : "Tourism Destination / Valley"}</span>
                            </label>
                            <input 
                               type="text" 
                               value={location}
                               onChange={(e) => {
                                 setLocation(e.target.value);
                                 setIsDropdownOpen(true);
                               }}
                               onFocus={() => setIsDropdownOpen(true)}
                               onKeyDown={handleKeyDown}
                               placeholder={isUrdu ? "ہنزہ، سکردو، خنجراب، کشمیر، سوات یا عطاء آباد..." : "Search Hunza, Skardu, Gilgit, Khunjerab, Kashmir, Swat..."}
                               className={`w-full bg-transparent border-none focus:ring-0 text-gray-900 font-semibold text-sm sm:text-base md:text-lg placeholder-gray-400 outline-none p-0 ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}
                            />
                        </div>

                        {location && (
                          <button 
                            type="button"
                            onClick={() => {
                              setLocation('');
                              setIsDropdownOpen(true);
                            }}
                            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                            title="Clear search"
                          >
                            <X size={16} />
                          </button>
                        )}
                    </div>

                    {/* Search Action Button */}
                    <button 
                       type="button"
                       onClick={() => handleSearch()}
                       className={`w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-3.5 rounded-xl md:rounded-full shadow-lg hover:shadow-emerald-600/30 active:scale-95 transition-all duration-300 flex-shrink-0 cursor-pointer ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                    >
                       <Search size={18} className="stroke-[2.5]" />
                       <span>{isUrdu ? 'ٹورز تلاش کریں' : 'Find Tours'}</span>
                       {isUrdu ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                </div>

                {/* Smart Tourism Autocomplete Dropdown */}
                {isDropdownOpen && (
                  <div className={`absolute left-2 right-2 sm:left-4 sm:right-4 top-full mt-3 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left transition-all animate-fadeIn ${isUrdu ? 'text-right' : ''}`}>
                    
                    {/* Dropdown Header */}
                    <div className={`px-4 py-2.5 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                       <div className={`flex items-center gap-1.5 text-emerald-700 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Sparkles size={14} className="text-amber-500" />
                          <span>{isUrdu ? "مقبول سیاحتی مقامات اور وادیاں" : "Top Tourist Destinations"}</span>
                       </div>
                       <span className="text-[11px] text-gray-400 font-normal">
                          {filteredSuggestions.length} {isUrdu ? 'مقامات' : 'locations'}
                       </span>
                    </div>

                    {/* Suggestions List */}
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 p-1.5">
                       {filteredSuggestions.length === 0 ? (
                          <div className="p-4 text-center text-sm text-gray-500">
                             <p className={isUrdu ? 'font-urdu' : ''}>
                                {isUrdu ? `"${location}" کے لیے کوئی خاص مقام نہیں ملا۔ پورا نام سرچ کرنے کے لیے انٹر دبائیں۔` : `No direct match for "${location}". Press Enter to search all packages.`}
                             </p>
                             <button
                                type="button"
                                onClick={() => handleSearch()}
                                className="mt-2 text-xs text-emerald-600 font-bold hover:underline"
                             >
                                {isUrdu ? 'اس نام کے تمام پیکیجز سرچ کریں' : 'Search all packages with this keyword'}
                             </button>
                          </div>
                       ) : (
                          filteredSuggestions.map((dest, idx) => (
                             <div
                               key={idx}
                               onClick={() => selectDestination(dest)}
                               className={`px-3.5 py-2.5 rounded-xl hover:bg-emerald-50/80 cursor-pointer transition flex items-center justify-between group ${isUrdu ? 'flex-row-reverse' : ''}`}
                             >
                                <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                   <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                                      {dest.category === 'peaks' ? (
                                        <Mountain size={16} />
                                      ) : dest.category === 'lakes' ? (
                                        <Waves size={16} />
                                      ) : (
                                        <MapPin size={16} />
                                      )}
                                   </div>
                                   <div>
                                      <p className={`text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition ${isUrdu ? 'font-urdu' : ''}`}>
                                         {isUrdu ? dest.nameUr : dest.nameEn}
                                      </p>
                                      <p className={`text-xs text-gray-500 ${isUrdu ? 'font-urdu' : ''}`}>
                                         {isUrdu ? dest.regionUr : dest.regionEn}
                                      </p>
                                   </div>
                                </div>

                                <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                   {((isUrdu ? dest.badgeUr : dest.badgeEn)) && (
                                     <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                                        {isUrdu ? dest.badgeUr : dest.badgeEn}
                                     </span>
                                   )}
                                   <span className="text-gray-300 group-hover:text-emerald-600 transition">
                                      {isUrdu ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                                   </span>
                                </div>
                             </div>
                          ))
                       )}
                    </div>

                    {/* Dropdown Footer Tip */}
                    <div className={`px-4 py-2 bg-gray-50 text-[11px] text-gray-500 border-t border-gray-100 flex items-center justify-between ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                       <span>{isUrdu ? "💡 کسی بھی سیاحتی مقام پر کلک کریں یا انٹر دبائیں" : "💡 Click any location to see available tours & packages"}</span>
                       <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="text-gray-400 hover:text-gray-600 font-medium"
                       >
                          {isUrdu ? "بند کریں" : "Close"}
                       </button>
                    </div>
                  </div>
                )}

                {/* Popular Quick-Pick Destination Tags */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2">
                   <span className={`text-xs font-semibold text-white/90 drop-shadow flex items-center gap-1 mr-1 ${isUrdu ? 'font-urdu' : ''}`}>
                      <Sparkles size={13} className="text-amber-300" />
                      {isUrdu ? "مقبول سیاحتی مقامات:" : "Popular Destinations:"}
                   </span>
                   {POPULAR_DESTINATIONS.slice(0, 5).map((dest, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectDestination(dest)}
                        className={`text-xs font-medium px-3 py-1 rounded-full bg-black/40 hover:bg-emerald-600 text-white border border-white/20 hover:border-emerald-400 shadow-md backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer ${isUrdu ? 'font-urdu' : ''}`}
                      >
                        {isUrdu ? dest.nameUr.split(' ')[0] : dest.nameEn.split(' ')[0]} {dest.category === 'peaks' ? '🏔️' : dest.category === 'lakes' ? '🌊' : '🌲'}
                      </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Bottom Elements Wrapper with responsive layout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 flex flex-col items-center justify-end h-full pointer-events-none z-30">
             
             {/* Bottom Corners */}
             <div className="w-full flex justify-between items-end px-2 md:px-6 pb-2 md:pb-4 pointer-events-none">
                
                {/* Map Circle (Left) */}
                <div className="hidden lg:flex pointer-events-auto items-center justify-center w-28 h-28 rounded-full bg-gray-100 border-4 border-white/80 shadow-2xl overflow-hidden hover:scale-110 transition cursor-pointer relative group/map z-30">
                   <div className="absolute inset-0 bg-blue-100 opacity-80 group-hover/map:opacity-100 transition">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rotate-45"></div>
                      <div className="absolute top-1/2 left-1/3 w-1 h-full bg-gray-300"></div>
                      <div className="absolute top-1/4 left-1/2 w-full h-1 bg-gray-300"></div>
                   </div>
                   <MapPin className="text-red-500 relative z-10 drop-shadow-md" size={32} fill="currentColor" />
                   <div className="absolute bottom-2 text-[10px] font-bold text-gray-600 bg-white/80 px-2 rounded-full">MAP</div>
                </div>

                {/* Rating (Right) */}
                <div className="pointer-events-auto hidden md:flex flex-col items-end text-white drop-shadow-lg z-30 mr-8 lg:mr-0">
                   <div className="flex items-center gap-2 mb-1">
                      <Star className={`${accentColorClass}`} size={36} fill="currentColor" />
                      <span className="text-5xl font-bold tracking-tighter">4.9</span>
                   </div>
                   <p className="text-base font-medium text-gray-100 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">from 2,400+ stays</p>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

export default Hero;
