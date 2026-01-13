import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Users, Star, 
  Wifi, Coffee, Compass, Map, ChevronDown
} from 'lucide-react';
import { CONTENT, HERO_BG } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = CONTENT[lang].hero;
  const isUrdu = lang === 'ur';

  return (
    <div className="relative w-full bg-gray-50 pt-20 pb-4 px-2 sm:px-4 lg:px-6 flex justify-center overflow-hidden">
       {/* Main Card Container */}
       <div className="relative w-full max-w-[1500px] h-[85vh] min-h-[600px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl group border-[6px] border-white ring-1 ring-gray-200">
          
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] group-hover:scale-110"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          >
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
          </div>

          {/* Floating Badges (Hidden on mobile for cleaner look) */}
          <div className="hidden lg:block absolute top-[20%] left-[10%] animate-float-slow z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Compass size={18} className="text-amber-400" />
                <span className="text-sm font-semibold tracking-wide">Adventure</span>
             </div>
          </div>
          <div className="hidden lg:block absolute top-[30%] right-[10%] animate-float-delayed z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Wifi size={18} className="text-amber-400" />
                <span className="text-sm font-semibold tracking-wide">Fast Wifi</span>
             </div>
          </div>
          <div className="hidden lg:block absolute bottom-[35%] left-[15%] animate-float z-10">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white flex items-center gap-3 hover:bg-white/20 transition cursor-default shadow-lg">
                <Coffee size={18} className="text-amber-400" />
                <span className="text-sm font-semibold tracking-wide">Breakfast</span>
             </div>
          </div>


          {/* Central Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10 pb-32 z-20">
             <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl mb-6 leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
               {/* Splitting the title to apply accent color to the second word or part of it */}
               {t.title.includes(' ') ? (
                 <>
                   {t.title.split(' ')[0]} <span className="text-amber-300">{t.title.split(' ').slice(1).join(' ')}</span>
                 </>
               ) : (
                 <span className="text-amber-300">{t.title}</span>
               )}
             </h1>
             <p className={`text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg leading-relaxed font-medium ${isUrdu ? 'font-urdu' : ''}`}>
               {t.subtitle}
             </p>
          </div>

          {/* Bottom Elements Wrapper */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 flex flex-col items-center justify-end h-full pointer-events-none z-30">
             
             {/* Search Bar (Floating) - Pointer events auto to allow interaction */}
             <div className="pointer-events-auto bg-white/95 backdrop-blur rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl w-full mx-4 mb-6 hidden md:flex items-center justify-between gap-2 border border-white/50">
                
                {/* Location Input */}
                <div className="flex-1 px-6 py-4 border-r border-gray-200 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <MapPin size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Location</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-lg">Northern Areas</span>
                      <ChevronDown size={16} className="text-gray-400" />
                   </div>
                </div>

                {/* Date Input */}
                <div className="flex-1 px-6 py-4 border-r border-gray-200 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Check-in</span>
                   </div>
                   <div className="flex items-center justify-between">
                       <span className="font-bold text-gray-900 text-lg">Add Dates</span>
                       <ChevronDown size={16} className="text-gray-400" />
                   </div>
                </div>

                {/* Guests Input */}
                <div className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-2xl transition cursor-pointer group/item">
                   <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Users size={16} className="text-brand-600" />
                      <span className="font-bold text-xs uppercase tracking-widest">Guests</span>
                   </div>
                   <div className="flex items-center justify-between">
                       <span className="font-bold text-gray-900 text-lg">4 Adults</span>
                       <ChevronDown size={16} className="text-gray-400" />
                   </div>
                </div>

                {/* Search Button */}
                <Link 
                  to="/packages"
                  className="bg-amber-400 hover:bg-amber-500 text-black px-10 py-5 rounded-[1.5rem] font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-3 whitespace-nowrap"
                >
                   {isUrdu ? 'تلاش کریں' : 'Book Your Stay'}
                   {/* <Search size={20} /> */}
                </Link>
             </div>

             {/* Mobile CTA (Replacement for Search Bar) */}
             <div className="pointer-events-auto md:hidden w-full px-2 mb-6">
                <Link 
                  to="/packages"
                  className="block w-full bg-amber-400 text-black text-center py-4 rounded-2xl font-bold shadow-xl text-lg hover:bg-amber-500 transition"
                >
                  {t.cta}
                </Link>
             </div>


             {/* Bottom Corners */}
             <div className="w-full flex justify-between items-end px-2 md:px-6 pb-2 md:pb-4">
                
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
                <div className="pointer-events-auto flex flex-col items-end text-white drop-shadow-lg z-30">
                   <div className="flex items-center gap-2 mb-1">
                      <Star className="text-amber-400 fill-amber-400" size={36} />
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