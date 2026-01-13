import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, 
  Home, Coffee, Compass, Camera
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
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    navigate(`/packages?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}&guests=${encodeURIComponent(guests)}`);
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

          {/* Floating Badges (Repositioned to corners/sides to avoid overlapping) */}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pb-40 md:pb-32">
             <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl mb-6 leading-tight transition-colors duration-1000 ${isUrdu ? 'font-urdu' : ''}`}>
               {t.title.includes(' ') ? (
                 <>
                   {t.title.split(' ')[0]} <span className={`${accentColorClass} transition-colors duration-1000`}>{t.title.split(' ').slice(1).join(' ')}</span>
                 </>
               ) : (
                 <span className={`${accentColorClass} transition-colors duration-1000`}>{t.title}</span>
               )}
             </h1>
             <p className={`text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg leading-relaxed font-medium mb-8 ${isUrdu ? 'font-urdu' : ''}`}>
               {t.subtitle}
             </p>
          </div>

          {/* Bottom Elements Wrapper with responsive layout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 flex flex-col items-center justify-end h-full pointer-events-none z-30">
             
             {/* Search Bar (Responsive) */}
             <div className="pointer-events-auto bg-white/95 backdrop-blur rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl w-full mx-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/50 relative z-40 mt-10">
                
                {/* Location Input */}
                <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-2 md:py-4 md:border-r border-b md:border-b-0 border-gray-200 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item relative">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <MapPin size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Location</span>
                   </div>
                   <input 
                      type="text" 
                      placeholder={isUrdu ? "کہاں جانا ہے؟" : "Where to?"}
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-bold text-lg placeholder-gray-400 outline-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                   />
                </div>

                {/* Date Input */}
                <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-2 md:py-4 md:border-r border-b md:border-b-0 border-gray-200 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item relative">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Check-in</span>
                   </div>
                   <input 
                      type="date"
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-bold text-lg outline-none cursor-pointer"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                   />
                </div>

                {/* Guests Input */}
                <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-2 md:py-4 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item relative">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Users size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Guests</span>
                   </div>
                   <div className="flex items-center">
                     <input 
                        type="number" 
                        min="1"
                        className="w-16 bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-bold text-lg outline-none"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                     />
                     <span className="text-lg font-bold text-gray-900 ml-1">Adults</span>
                   </div>
                </div>

                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className={`w-full md:w-auto ${accentColorClass.replace('text-', 'bg-').replace('300', '400').replace('400', '500').replace('500', '500')} hover:brightness-110 text-black px-10 py-4 md:py-5 rounded-[1.5rem] font-bold shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3 whitespace-nowrap`}
                >
                   {isUrdu ? 'تلاش کریں' : 'Book Your Stay'}
                </button>
             </div>


             {/* Bottom Corners */}
             <div className="w-full flex justify-between items-end px-2 md:px-6 pb-2 md:pb-4 pointer-events-none">
                
                {/* Map Circle (Left) */}
                <div className="hidden lg:flex pointer-events-auto items-center justify-center w-28 h-28 rounded-full bg-gray-100 border-4 border-white/80 shadow-2xl overflow-hidden hover:scale-110 transition cursor-pointer relative group/map z-30">
                   {/* Fake Map Background */}
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