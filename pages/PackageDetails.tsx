import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PACKAGES, CONTENT } from '../constants';
import { Language } from '../types';
import { MapPin, Clock, Star, Phone, CheckCircle, Calendar, Users, X, Send } from 'lucide-react';

interface PackageDetailsProps {
  lang: Language;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const pkg = PACKAGES.find((p) => p.id === id);
  const t = CONTENT[lang].packageDetails;
  const isUrdu = lang === 'ur';

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    travelers: '2',
    message: ''
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    
    const packageName = isUrdu ? pkg.titleUr : pkg.titleEn;
    const text = `*New Booking Inquiry for: ${packageName}*\n` +
      `----------------\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Travelers:* ${formData.travelers}\n` +
      `*Note:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/923334737025?text=${encodedText}`, '_blank');
    setIsModalOpen(false);
  };

  if (!pkg) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">{t.notFound}</h2>
        <Link to="/packages" className="mt-4 text-brand-600 hover:underline">Back to Packages</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 bg-white min-h-screen pb-20 relative">
      
      {/* Hero Header - Responsive Height */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
         <img src={pkg.image} alt={pkg.titleEn} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 text-white bg-gradient-to-t from-black/90 to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col gap-2 md:gap-4 ${isUrdu ? 'items-end text-right' : 'items-start'}`}>
                    <div className="flex items-center gap-2 bg-brand-600/90 px-3 py-1 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm">
                        <Star fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                        <span>{pkg.rating} / 5.0</span>
                    </div>
                    <h1 className={`text-2xl md:text-5xl font-bold leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
                        {isUrdu ? pkg.titleUr : pkg.titleEn}
                    </h1>
                    <div className={`flex flex-wrap gap-4 md:gap-6 text-sm md:text-lg ${isUrdu ? 'flex-row-reverse' : ''}`}>
                         <div className={`flex items-center gap-1 md:gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="text-brand-400" size={18} /> 
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.locationUr : pkg.locationEn}</span>
                         </div>
                         <div className={`flex items-center gap-1 md:gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <Clock className="text-brand-400" size={18} /> 
                            <span className={isUrdu ? 'font-urdu' : ''}>{isUrdu ? pkg.durationUr : pkg.durationEn}</span>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-8 md:space-y-12 ${isUrdu ? 'order-last text-right' : ''}`}>
                
                {/* Overview */}
                <section>
                    <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.overview}
                    </h2>
                    <p className={`text-gray-600 leading-relaxed text-base md:text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                        {isUrdu ? pkg.descriptionUr : pkg.descriptionEn}
                    </p>
                </section>

                {/* Itinerary */}
                <section>
                    <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-6 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.itinerary}
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                        {(isUrdu ? pkg.itineraryUr : pkg.itineraryEn).map((day, idx) => (
                            <div key={idx} className={`flex gap-3 md:gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xs md:text-sm">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className={`bg-gray-50 p-3 md:p-4 rounded-xl flex-grow ${isUrdu ? 'font-urdu' : ''}`}>
                                    <p className="text-gray-800 text-sm md:text-base">{day}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions */}
                <section>
                    <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-6 border-b pb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.inclusions}
                    </h2>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 ${isUrdu ? 'font-urdu' : ''}`}>
                         {(isUrdu ? pkg.inclusionsUr : pkg.inclusionsEn).map((inc, idx) => (
                             <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 shadow-sm ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                 <CheckCircle className="text-brand-500 flex-shrink-0" size={18} />
                                 <span className="text-gray-700 text-sm md:text-base">{inc}</span>
                             </div>
                         ))}
                    </div>
                </section>

            </div>

            {/* Sidebar Booking Card */}
            <div className="lg:col-span-1 order-first lg:order-last">
                <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <div className={`text-center mb-6 border-b pb-6 ${isUrdu ? 'font-urdu' : ''}`}>
                        <span className="text-gray-500 block mb-2 text-sm">{isUrdu ? 'فی شخص قیمت' : 'Price Per Person'}</span>
                        <span className="text-3xl md:text-4xl font-bold text-brand-700">{pkg.price}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                         <div className={`flex items-center gap-3 text-gray-600 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                            <Calendar size={20} className="text-gray-400" />
                            <span className={`text-sm md:text-base ${isUrdu ? 'font-urdu' : ''}`}>{isUrdu ? 'دستیابی: سارا سال' : 'Availability: All Year Round'}</span>
                         </div>
                         <div className={`flex items-center gap-3 text-gray-600 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                            <Users size={20} className="text-gray-400" />
                            <span className={`text-sm md:text-base ${isUrdu ? 'font-urdu' : ''}`}>{isUrdu ? 'گروپ سائز: کم از کم 2' : 'Group Size: Min 2 People'}</span>
                         </div>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className={`w-full bg-brand-600 hover:bg-brand-700 text-white py-3 md:py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                    >
                        <Phone size={20} />
                        {t.bookPackage}
                    </button>
                    
                    <p className="text-xs text-center text-gray-400 mt-4">
                        {isUrdu ? 'کسی کریڈٹ کارڈ کی ضرورت نہیں' : 'No credit card required for inquiry'}
                    </p>
                </div>
            </div>

        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-scale-up">
                {/* Modal Header */}
                <div className={`bg-brand-600 p-5 md:p-6 text-white flex justify-between items-center ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-xl font-bold ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.modalTitle}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="hover:bg-brand-700 p-1 rounded-full transition text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 md:p-8">
                    <p className={`text-gray-600 mb-6 text-sm ${isUrdu ? 'text-right font-urdu' : ''}`}>
                        {t.modalDesc}
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className={`block text-sm font-bold text-gray-700 mb-1 ${isUrdu ? 'text-right font-urdu' : ''}`}>
                                {t.labelName}
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition ${isUrdu ? 'text-right' : ''}`}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className={`block text-sm font-bold text-gray-700 mb-1 ${isUrdu ? 'text-right font-urdu' : ''}`}>
                                {t.labelPhone}
                            </label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition ${isUrdu ? 'text-right' : ''}`}
                            />
                        </div>

                        {/* Date & Travelers Row */}
                        <div className={`flex flex-col sm:flex-row gap-4 ${isUrdu ? 'sm:flex-row-reverse' : ''}`}>
                            <div className="flex-1">
                                <label className={`block text-sm font-bold text-gray-700 mb-1 ${isUrdu ? 'text-right font-urdu' : ''}`}>
                                    {t.labelDate}
                                </label>
                                <input
                                    required
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition ${isUrdu ? 'text-right' : ''}`}
                                />
                            </div>
                            <div className="flex-1">
                                <label className={`block text-sm font-bold text-gray-700 mb-1 ${isUrdu ? 'text-right font-urdu' : ''}`}>
                                    {t.labelTravelers}
                                </label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    name="travelers"
                                    value={formData.travelers}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition ${isUrdu ? 'text-right' : ''}`}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className={`block text-sm font-bold text-gray-700 mb-1 ${isUrdu ? 'text-right font-urdu' : ''}`}>
                                {t.labelMessage}
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition resize-none ${isUrdu ? 'text-right' : ''}`}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2 mt-4 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                        >
                            <Send size={20} />
                            {t.submitBtn}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;