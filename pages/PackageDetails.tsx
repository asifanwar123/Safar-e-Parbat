import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PACKAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { MapPin, Clock, Star, Phone, CheckCircle, Calendar, ArrowLeft, ArrowRight, Users } from 'lucide-react';

interface PackageDetailsProps {
  lang: Language;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const pkg = PACKAGES.find((p) => p.id === id);
  const t = CONTENT[lang].packageDetails;
  const isUrdu = lang === 'ur';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">{t.notFound}</h2>
        <Link to="/packages" className="mt-4 text-brand-600 hover:underline">Back to Packages</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full">
         <img src={pkg.image} alt={pkg.titleEn} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white bg-gradient-to-t from-black/90 to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col gap-4 ${isUrdu ? 'items-end text-right' : 'items-start'}`}>
                    <div className="flex items-center gap-2 bg-brand-600/90 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                        <Star size={16} fill="currentColor" className="text-amber-400" />
                        <span>{pkg.rating} / 5.0</span>
                    </div>
                    <h1 className={`text-3xl md:text-5xl font-bold ${isUrdu ? 'font-urdu' : ''}`}>
                        {isUrdu ? pkg.titleUr : pkg.titleEn}
                    </h1>
                    <div className={`flex flex-wrap gap-6 text-lg ${isUrdu ? 'flex-row-reverse' : ''}`}>
                         <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="text-brand-400" /> 
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.locationUr : pkg.locationEn}</span>
                         </div>
                         <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <Clock className="text-brand-400" /> 
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.durationUr : pkg.durationEn}</span>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-12 ${isUrdu ? 'order-last text-right' : ''}`}>
                
                {/* Overview */}
                <section>
                    <h2 className={`text-2xl font-bold text-gray-900 mb-4 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.overview}
                    </h2>
                    <p className={`text-gray-600 leading-relaxed text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                        {isUrdu ? pkg.descriptionUr : pkg.descriptionEn}
                    </p>
                </section>

                {/* Itinerary */}
                <section>
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.itinerary}
                    </h2>
                    <div className="space-y-6">
                        {(isUrdu ? pkg.itineraryUr : pkg.itineraryEn).map((day, idx) => (
                            <div key={idx} className={`flex gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className={`bg-gray-50 p-4 rounded-xl flex-grow ${isUrdu ? 'font-urdu' : ''}`}>
                                    <p className="text-gray-800">{day}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions */}
                <section>
                    <h2 className={`text-2xl font-bold text-gray-900 mb-6 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.inclusions}
                    </h2>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isUrdu ? 'font-urdu' : ''}`}>
                         {(isUrdu ? pkg.inclusionsUr : pkg.inclusionsEn).map((inc, idx) => (
                             <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 shadow-sm ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                 <CheckCircle className="text-brand-500 flex-shrink-0" size={20} />
                                 <span className="text-gray-700">{inc}</span>
                             </div>
                         ))}
                    </div>
                </section>

            </div>

            {/* Sidebar Booking Card */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className={`text-center mb-6 border-b pb-6 ${isUrdu ? 'font-urdu' : ''}`}>
                        <span className="text-gray-500 block mb-2">{isUrdu ? 'فی شخص قیمت' : 'Price Per Person'}</span>
                        <span className="text-4xl font-bold text-brand-700">{pkg.price}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                         <div className={`flex items-center gap-3 text-gray-600 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                            <Calendar size={20} className="text-gray-400" />
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? 'دستیابی: سارا سال' : 'Availability: All Year Round'}</span>
                         </div>
                         <div className={`flex items-center gap-3 text-gray-600 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                            <Users size={20} className="text-gray-400" />
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? 'گروپ سائز: کم از کم 2' : 'Group Size: Min 2 People'}</span>
                         </div>
                    </div>

                    <Link 
                        to="/contact" 
                        className={`w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                    >
                        <Phone size={20} />
                        {t.bookPackage}
                    </Link>
                    
                    <p className="text-xs text-center text-gray-400 mt-4">
                        {isUrdu ? 'کسی کریڈٹ کارڈ کی ضرورت نہیں' : 'No credit card required for inquiry'}
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetails;