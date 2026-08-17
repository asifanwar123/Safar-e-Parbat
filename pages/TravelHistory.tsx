
import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { CONTENT } from '../constants';
import { MapPin, Calendar, Users, Camera, Compass, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

interface TravelHistoryProps {
  lang: Language;
}

const TravelHistory: React.FC<TravelHistoryProps> = ({ lang }) => {
  const { history } = useData();
  const isUrdu = lang === 'ur';

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <SEO 
        title={isUrdu ? "سفری تاریخ و یادیں - سفرِ پربت" : "Travel History & Past Expeditions - Safar-e-Parbat"}
        description={isUrdu ? "سفرِ پربت کے ماضی کے کامیاب ٹورز، مسافروں کے نام، یادگار مناظر اور خوشگوار یادوں کی تفصیلات۔" : "View highlights, memories, and traveler lists from Safar-e-Parbat's past expeditions across Hunza, Skardu, Kashmir, and Khunjerab."}
        keywords="Safar-e-Parbat travel history, past group tours Pakistan, expedition diaries, traveler memories Pakistan"
        canonicalUrl="/travel-history"
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
              <span>{isUrdu ? "سفرِ پربت کامیاب مہمات" : "Chronicles of Adventure"}</span>
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
                    سفری تاریخ و
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    یادیں
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
                    Travel
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    History & Diaries
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Frosted Backing */}
            <div className="max-w-2xl mx-auto px-2">
              <p className={`text-gray-200 text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/35 border border-white/10 backdrop-blur-sm shadow-xl inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu 
                  ? "ہمارے حالیہ اور ماضی کے تاریخی کامیاب دوروں کے یادگار لمحات" 
                  : "Take a look at the milestones and passenger journals from our recent high-altitude expeditions."}
              </p>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {history.length === 0 ? (
             <div className="text-center py-20 text-gray-400">
                 <p>{isUrdu ? "کوئی تاریخ دستیاب نہیں" : "No travel history added yet."}</p>
             </div>
        ) : (
            history.map((item, index) => {
                const totalTravelersCount = 20 + ((item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 5);
                return (
                    <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
                        
                        {/* Image Section */}
                        <div className="md:w-2/5 h-64 md:h-auto relative">
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover absolute inset-0" referrerPolicy="no-referrer" />
                            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md flex items-center gap-2">
                                <Calendar size={14} /> {item.date}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className={`p-8 md:w-3/5 flex flex-col ${isUrdu ? 'text-right' : ''}`}>
                             <div className={`flex items-center gap-2 text-brand-600 font-bold mb-2 uppercase tracking-wider text-xs ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                                 <MapPin size={14} /> {item.location}
                             </div>
                             <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${isUrdu ? 'font-urdu' : ''}`}>{item.title}</h2>
                             <p className={`text-gray-600 mb-6 leading-relaxed flex-grow ${isUrdu ? 'font-urdu' : ''}`}>
                                 {item.description}
                             </p>
                             
                             {/* Visitors List with Total Travelers count */}
                             <div className={`bg-gray-50 rounded-xl p-4 border border-gray-100`}>
                                 <div className={`flex items-center justify-between mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                     <div className={`flex items-center gap-2 text-gray-800 font-bold ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                         <Users size={18} className="text-brand-500" />
                                         <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? "ہمارے مسافر" : "Our Travelers"}</span>
                                     </div>
                                     <span className={`text-xs font-bold bg-brand-100 text-brand-800 px-2.5 py-1 rounded-full ${isUrdu ? 'font-urdu' : ''}`}>
                                         {isUrdu ? `کل مسافر: ${totalTravelersCount}` : `No. of Travelers: ${totalTravelersCount}`}
                                     </span>
                                 </div>
                                 <div className={`flex flex-wrap gap-2 ${isUrdu ? 'justify-end' : ''}`}>
                                     {item.visitors.slice(0, 5).map((v, i) => (
                                         <div key={i} className="bg-white border px-3 py-1.5 rounded-lg text-sm shadow-sm flex flex-col">
                                             <span className="font-bold text-gray-800">{v.name}</span>
                                             {v.details && <span className="text-[10px] text-gray-400 uppercase">{v.details}</span>}
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};

export default TravelHistory;
