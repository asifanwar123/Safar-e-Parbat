import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CONTENT, HERO_BG } from '../constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = CONTENT[lang].hero;
  const isUrdu = lang === 'ur';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[20s]"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-white space-y-6 md:space-y-8 animate-fade-in-up">
          <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-4 drop-shadow-lg ${isUrdu ? 'font-urdu leading-relaxed py-2' : 'font-sans'}`}>
            {t.title}
          </h1>
          <p className={`text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 md:mb-8 max-w-xs sm:max-w-2xl mx-auto drop-shadow-md ${isUrdu ? 'font-urdu leading-loose' : 'font-sans'}`}>
            {t.subtitle}
          </p>
          <div className="flex justify-center">
            <Link 
              to="/packages"
              className={`group relative overflow-hidden bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white px-8 py-3 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center gap-3 ring-4 ring-transparent hover:ring-brand-500/30 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
            >
              <span className="relative z-10">{t.cta}</span>
              {isUrdu ? (
                <ArrowLeft className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" size={24} />
              ) : (
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={24} />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;