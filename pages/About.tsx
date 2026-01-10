import React from 'react';
import { CONTENT, GALLERY_IMAGES, CEO_IMAGE } from '../constants';
import { Language } from '../types';
import { CheckCircle, Quote } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const t = CONTENT[lang].aboutPage;
  const isUrdu = lang === 'ur';

  return (
    <div className="pt-20 bg-white min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-brand-900 text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.title}
            </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
           <div className={`space-y-6 ${isUrdu ? 'order-last text-right' : ''}`}>
              <h2 className={`text-3xl font-bold text-brand-800 ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.storyTitle}
              </h2>
              <div className="w-20 h-1 bg-brand-500 rounded-full"></div>
              <p className={`text-gray-600 text-lg leading-loose ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.storyText}
              </p>
           </div>
           <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition duration-500">
              <img src={GALLERY_IMAGES[7]} alt="Our Story" className="w-full h-full object-cover" />
           </div>
        </div>

        {/* CEO Section - Added as requested */}
        <div className="mb-24 bg-brand-50 rounded-3xl p-8 md:p-12 border border-brand-100 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-200 rounded-full opacity-20"></div>
           
           <div className={`flex flex-col md:flex-row items-center gap-12 relative z-10 ${isUrdu ? 'md:flex-row-reverse text-right' : ''}`}>
              <div className="flex-shrink-0 relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <img src={CEO_IMAGE} alt={t.ceo.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute bottom-4 ${isUrdu ? 'left-4' : 'right-4'} bg-brand-600 text-white p-2 rounded-full shadow-lg`}>
                      <Quote size={24} fill="currentColor" />
                  </div>
              </div>
              
              <div className="flex-grow space-y-4">
                  <h3 className={`text-sm font-bold text-brand-600 uppercase tracking-widest ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.title}
                  </h3>
                  <h2 className={`text-3xl font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.name}
                  </h2>
                  <p className={`text-brand-700 font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.role}
                  </p>
                  <div className="w-16 h-1 bg-amber-400 rounded-full my-4"></div>
                  <p className={`text-gray-700 text-lg leading-relaxed italic ${isUrdu ? 'font-urdu' : ''}`}>
                      "{t.ceo.message}"
                  </p>
              </div>
           </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 mb-24 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-32 h-32 bg-brand-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
           <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
           
           <h2 className={`text-3xl font-bold text-brand-800 mb-6 relative z-10 ${isUrdu ? 'font-urdu' : ''}`}>
              {t.missionTitle}
           </h2>
           <p className={`text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10 ${isUrdu ? 'font-urdu' : ''}`}>
              "{t.missionText}"
           </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
           <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold text-brand-900 ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.whyUsTitle}
              </h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.whyUsPoints.map((point, idx) => (
                 <div key={idx} className={`bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition flex items-center gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="bg-brand-100 p-3 rounded-full text-brand-600 flex-shrink-0">
                       <CheckCircle size={24} />
                    </div>
                    <span className={`font-semibold text-gray-800 text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                       {point}
                    </span>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;
