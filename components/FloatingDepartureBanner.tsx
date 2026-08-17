import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { Phone, MessageCircle, Sparkles, ChevronRight, ChevronLeft, Calendar, Star } from 'lucide-react';

interface FloatingDepartureBannerProps {
  lang: Language;
}

export const FloatingDepartureBanner: React.FC<FloatingDepartureBannerProps> = ({ lang }) => {
  const { packages } = useData();
  const isUrdu = lang === 'ur';
  const [isOpen, setIsOpen] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto slide every 8 seconds
  useEffect(() => {
    if (!packages || packages.length <= 1 || !isOpen) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % packages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [packages?.length, isOpen]);

  if (!packages || packages.length === 0) return null;

  const currentPkg = packages[currentIdx];

  return (
    <div className="fixed bottom-24 left-4 z-[40] max-w-sm sm:max-w-md transition-all duration-500 ease-in-out font-sans">
      {/* Trigger icon when closed/hidden */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-500 hover:to-brand-500 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400/30 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="text-amber-300 animate-pulse" size={18} />
          <span className="text-xs font-black tracking-wider uppercase">
            {isUrdu ? "آنے والے ٹورز شیڈول" : "Upcoming Tours Schedule"}
          </span>
          <ChevronRight size={16} />
        </button>
      )}

      {/* Expanded Floating Banner with Left Hide/Show Icon */}
      {isOpen && (
        <div className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex items-stretch">
          
          {/* LEFT HIDE AND SHOW ICON COLUMN */}
          <button
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/90 hover:bg-slate-850 text-slate-400 hover:text-white px-3 border-r border-slate-800 flex flex-col items-center justify-center gap-1 transition group cursor-pointer"
            title="Hide Banner"
          >
            <ChevronLeft size={18} className="transition-transform group-hover:scale-110" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold rotate-180 writing-mode-vertical [writing-mode:vertical-lr]">
              {isUrdu ? "چھپائیں" : "Hide"}
            </span>
          </button>

          {/* RIGHT DETAILS WRAPPER */}
          <div className="p-4 flex-1 flex flex-col justify-between gap-3 min-w-0">
            {/* Top row */}
            <div className={`flex items-start gap-3 min-w-0 ${isUrdu ? 'flex-row-reverse text-right font-urdu' : 'text-left'}`}>
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800 shadow-inner">
                <img
                  src={currentPkg.image}
                  alt={currentPkg.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-black border border-emerald-500/20 uppercase tracking-widest">
                    {isUrdu ? "آنے والا ٹور" : "Departing Soon"}
                  </span>
                  <span className="text-[10px] text-amber-400 font-extrabold flex items-center gap-0.5">
                    <Star size={10} fill="currentColor" />
                    {currentPkg.rating}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white truncate mt-1">
                  {isUrdu ? currentPkg.titleUr : currentPkg.titleEn}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
                  <Calendar size={10} className="text-emerald-400 shrink-0" />
                  <span>{currentPkg.dates || (isUrdu ? "ہفتہ وار روانگی" : "Weekly Schedule")}</span>
                </p>
              </div>
            </div>

            {/* Bottom Row / Actions */}
            <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-900/60">
              <span className="text-emerald-400 font-extrabold text-xs sm:text-sm whitespace-nowrap shrink-0">
                {currentPkg.price}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20instantly%20book%20my%20seats%20for%20the%20upcoming%20tour:%20${encodeURIComponent(currentPkg.titleEn)}%20(${currentPkg.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] sm:text-xs rounded-xl shadow-lg transition"
                >
                  <MessageCircle size={12} fill="currentColor" />
                  <span>{isUrdu ? "واٹس ایپ" : "Book Now"}</span>
                </a>

                <a
                  href="tel:03454737025"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] sm:text-xs rounded-xl shadow-lg transition"
                >
                  <Phone size={11} />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default FloatingDepartureBanner;
