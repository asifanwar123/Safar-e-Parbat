import React from 'react';
import { PACKAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { MapPin, Clock, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface PackagesProps {
  lang: Language;
}

const Packages: React.FC<PackagesProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location')?.toLowerCase() || '';

  const filteredPackages = PACKAGES.filter(pkg => {
    if (!locationQuery) return true;
    
    // Check both English and Urdu fields, and check if the location matches
    const matchesTitle = pkg.titleEn.toLowerCase().includes(locationQuery) || pkg.titleUr.includes(locationQuery);
    const matchesLocation = pkg.locationEn.toLowerCase().includes(locationQuery) || pkg.locationUr.includes(locationQuery);
    
    return matchesTitle || matchesLocation;
  });

  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-20">
      <div className="bg-brand-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {CONTENT[lang].nav.packages}
            </h1>
            <p className={`text-brand-100 text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? "اپنے اگلے ایڈونچر کا انتخاب کریں" : "Choose your next adventure"}
            </p>
            {locationQuery && (
              <p className="mt-4 text-amber-300 font-medium">
                {isUrdu ? `تلاش کے نتائج: "${locationQuery}"` : `Showing results for "${locationQuery}"`}
              </p>
            )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Link key={pkg.id} to={`/packages/${pkg.id}`} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:translate-y-[-5px] transition-transform duration-300 group">
                <div className="h-64 relative overflow-hidden">
                  <img 
                      src={pkg.image} 
                      alt={pkg.titleEn} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-sm font-bold text-amber-500 flex items-center gap-1 shadow-sm">
                    <Star size={14} fill="currentColor" /> {pkg.rating}
                  </div>
                </div>
                
                <div className={`p-6 flex-grow flex flex-col ${isUrdu ? 'text-right' : ''}`}>
                  <div className="flex-grow">
                      <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? pkg.titleUr : pkg.titleEn}
                      </h3>
                      
                      <div className={`flex items-center gap-2 text-gray-600 mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <MapPin size={18} className="text-brand-500" />
                          <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.locationUr : pkg.locationEn}</span>
                      </div>

                      <div className={`flex items-center gap-2 text-gray-500 mb-6 bg-gray-50 p-2 rounded-lg inline-block w-full ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Clock size={18} className="text-brand-500" />
                          <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.durationUr : pkg.durationEn}</span>
                      </div>
                  </div>

                  <div className={`border-t border-gray-100 pt-6 mt-2 flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
                      <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {isUrdu ? 'قیمت' : 'Starting From'}
                          </span>
                          <span className="text-2xl font-bold text-brand-700">{pkg.price}</span>
                      </div>
                      <div 
                          className={`text-brand-600 font-bold flex items-center gap-2 group-hover:text-brand-700 transition ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                      >
                          {isUrdu ? 'تفصیلات دیکھیں' : 'View Details'}
                          {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="text-gray-400 mb-4">
               <MapPin size={64} className="mx-auto" />
             </div>
             <h3 className="text-2xl font-bold text-gray-700 mb-2">
               {isUrdu ? 'کوئی پیکیج نہیں ملا' : 'No Packages Found'}
             </h3>
             <p className="text-gray-500">
               {isUrdu ? 'براہ کرم مختلف الفاظ کے ساتھ دوبارہ تلاش کریں۔' : 'Try searching for a different location like "Hunza" or "Skardu".'}
             </p>
             <button 
                onClick={() => window.history.back()}
                className="mt-6 text-brand-600 font-bold hover:underline"
             >
                {isUrdu ? 'واپس جائیں' : 'Go Back'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;