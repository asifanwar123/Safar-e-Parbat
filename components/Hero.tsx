
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, 
  Home, Coffee, Compass, Camera, Search
} from 'lucide-react';
import { CONTENT, HERO_SLIDES } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = CONTENT[lang].hero;
  const isUrdu = lang === 'ur';
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    navigate(`/packages?location=${encodeURIComponent(location)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };

  const accentColorClass = HERO_SLIDES[currentSlide].accentColor || "text-amber-300";

  return (
    <div className="relative w-full bg-gray-50 pt-20 pb-4 px-2 sm:px-4 lg:px-6 flex justify-center overflow-hidden">
       {/* Main Card Container */}
       <div className="relative w-full max-w-[1500px] h-[85vh] min-h-[600px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl group border-[6px] border-white ring-1 ring-gray-200">
          
          {/* Background Image Slider */}
          {HERO_SLIDES.map((slide, index) => (
             <div 
               key={index}
               className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
               style={{ backgroundImage: `url(${slide.image})` }}
             >
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
             <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl mb-6 leading-tight transition-colors duration-1000 ${isUrdu ? 'font-urdu' : ''}`}>
               {t.title.includes(' ') ? (
                 <>
                   {t.title.split(' ')[0]} <span className={`${accentColorClass} transition-colors duration-1000`}>{t.title.split(' ').slice(1).join(' ')}</span>
                 </>
               ) : (
                 <span className={`${accentColorClass} transition-colors duration-1000`}>{t.title}</span>
               )}
             </h1>
             <p className={`text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg leading-relaxed font-medium mb-12 ${isUrdu ? 'font-urdu' : ''}`}>
               {t.subtitle}
             </p>

             {/* Simple Search Bar */}
             <div className="w-full max-w-2xl mx-auto px-4 relative z-40">
                 <div className="bg-white/95 backdrop-blur-xl p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center transition-all focus-within:ring-4 focus-within:ring-white/30 focus-within:scale-105">
                     <div className="pl-4 md:pl-6 text-gray-400">
                         <Search size={24} />
                     </div>
                     <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isUrdu ? "آپ کہاں جانا چاہتے ہیں؟" : "Where would you like to go?"}
                        className={`flex-grow bg-transparent border-none focus:ring-0 text-gray-800 text-lg md:text-xl placeholder-gray-500 py-3 md:py-4 px-3 md:px-4 outline-none w-full ${isUrdu ? 'text-right font-urdu' : ''}`}
                     />
                     <button 
                        onClick={handleSearch}
                        className={`${accentColorClass.replace('text-', 'bg-').replace('300', '500')} hover:brightness-110 text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg transform active:scale-95 transition-all whitespace-nowrap text-base md:text-lg`}
                     >
                        {isUrdu ? 'تلاش' : 'Search'}
                     </button>
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
