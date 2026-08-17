import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { Phone, MessageCircle, Sparkles, ChevronRight, ChevronLeft, Calendar, Star, Eye } from 'lucide-react';

interface FloatingDepartureBannerProps {
  lang: Language;
}

export const FloatingDepartureBanner: React.FC<FloatingDepartureBannerProps> = ({ lang }) => {
  const { packages } = useData();
  const location = useLocation();
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

  if (location.pathname !== '/') return null;
  if (!packages || packages.length === 0) return null;

  const currentPkg = packages[currentIdx];

  return (
    <div className="fixed bottom-24 left-4 z-[40] max-w-sm sm:max-w-md transition-all duration-500 ease-in-out font-sans">
      {/* Trigger icon when closed/hidden */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-950/95 hover:bg-slate-900 text-white pl-4 pr-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center gap-3 border-2 border-emerald-500/80 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <Sparkles className="text-amber-400 relative" size={16} />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-emerald-400 font-black tracking-widest uppercase mb-0.5">
              {isUrdu ? "روانگی کا آفیشل شیڈول" : "LIVE SCHEDULE"}
            </span>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white">
              {isUrdu ? "آنے والے ٹورز کا شیڈول" : "Upcoming Tours Schedule"}
            </span>
          </div>
          <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] flex items-center justify-center border border-emerald-500/30 ml-1">
            {packages.length}
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
        </button>
      )}

      {/* Expanded Floating Banner with Left Hide/Show Icon */}
      {isOpen && (
        <div className="bg-slate-950/95 backdrop-blur-md text-white border-2 border-emerald-500/40 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden flex items-stretch">
          
          {/* LEFT HIDE AND SHOW ICON COLUMN */}
          <button
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/90 hover:bg-slate-850 text-slate-400 hover:text-white px-3 border-r border-slate-800 flex flex-col items-center justify-center gap-1 transition group cursor-pointer"
            title="Hide Banner"
          >
            <ChevronLeft size={18} className="transition-transform group-hover:scale-110 text-emerald-400" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold rotate-180 writing-mode-vertical [writing-mode:vertical-lr] text-slate-500 group-hover:text-white">
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
                <Link
                  to={`/packages/${currentPkg.id}`}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-[10px] sm:text-xs rounded-xl shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Eye size={12} />
                  <span>{isUrdu ? "تفصیلات دیکھیں" : "View Itinerary"}</span>
                </Link>

                <a
                  href={`https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20instantly%20book%20my%20seats%20for%20the%20upcoming%20tour:%20${encodeURIComponent(currentPkg.titleEn)}%20(${currentPkg.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] sm:text-xs rounded-xl shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={12} fill="currentColor" />
                  <span>{isUrdu ? "بک کریں" : "Book Now"}</span>
                </a>

                <a
                  href="tel:03454737025"
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-[10px] sm:text-xs rounded-xl shadow-lg transition hover:text-white cursor-pointer"
                >
                  <Phone size={11} />
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
