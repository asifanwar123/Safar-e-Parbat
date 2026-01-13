
import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { CONTENT } from '../constants';
import { MapPin, Calendar, Users, Camera } from 'lucide-react';

interface TravelHistoryProps {
  lang: Language;
}

const TravelHistory: React.FC<TravelHistoryProps> = ({ lang }) => {
  const { history } = useData();
  const isUrdu = lang === 'ur';

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <div className="bg-brand-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {CONTENT[lang].nav.travelHistory}
            </h1>
            <p className={`text-brand-100 text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? "ہمارے حالیہ دوروں کی جھلکیاں" : "Highlights from our recent expeditions"}
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {history.length === 0 ? (
             <div className="text-center py-20 text-gray-400">
                 <p>{isUrdu ? "کوئی تاریخ دستیاب نہیں" : "No travel history added yet."}</p>
             </div>
        ) : (
            history.map((item, index) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
                    
                    {/* Image Section */}
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover absolute inset-0" />
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
                         
                         {/* Visitors List */}
                         <div className={`bg-gray-50 rounded-xl p-4 border border-gray-100`}>
                             <div className={`flex items-center gap-2 text-gray-800 font-bold mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                 <Users size={18} className="text-brand-500" />
                                 <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? "ہمارے مہمان" : "Our Travelers"}</span>
                             </div>
                             <div className={`flex flex-wrap gap-2 ${isUrdu ? 'justify-end' : ''}`}>
                                 {item.visitors.map((v, i) => (
                                     <div key={i} className="bg-white border px-3 py-1.5 rounded-lg text-sm shadow-sm flex flex-col">
                                         <span className="font-bold text-gray-800">{v.name}</span>
                                         {v.details && <span className="text-[10px] text-gray-400 uppercase">{v.details}</span>}
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default TravelHistory;
