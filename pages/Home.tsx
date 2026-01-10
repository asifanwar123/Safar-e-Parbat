import React from 'react';
import Hero from '../components/Hero';
import { Mountain, Users, Camera, Star, Quote, MapPin } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, PACKAGES, GALLERY_IMAGES, TESTIMONIALS } from '../constants';
import { Link } from 'react-router-dom';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = CONTENT[lang];
  const isUrdu = lang === 'ur';

  const features = [
    { icon: <Mountain size={40} />, title: t.features.adventure, color: "bg-blue-100 text-blue-600" },
    { icon: <Camera size={40} />, title: t.features.cultural, color: "bg-amber-100 text-amber-600" },
    { icon: <Users size={40} />, title: t.features.family, color: "bg-green-100 text-green-600" },
  ];

  // Pick top 3 images for grid
  const showcaseImages = GALLERY_IMAGES.slice(0, 3);

  return (
    <div className="bg-gray-50">
      <Hero lang={lang} />

      {/* About / Intro Section */}
      <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <h2 className={`text-3xl md:text-5xl font-bold text-brand-900 ${isUrdu ? 'font-urdu' : ''}`}>
            {t.about.title}
          </h2>
          <div className={`w-24 h-1 bg-brand-500 mx-auto rounded-full`}></div>
          <p className={`text-lg md:text-xl text-gray-600 leading-relaxed ${isUrdu ? 'font-urdu text-right md:text-center' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
            {t.about.desc}
          </p>
          <p className={`text-gray-500 ${isUrdu ? 'font-urdu text-lg text-right md:text-center' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
            {t.about.subDesc}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100">
              <div className={`p-4 rounded-full mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold text-gray-800 ${isUrdu ? 'font-urdu text-2xl' : ''}`}>
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Featured Tours Preview */}
        <div className="mb-16 md:mb-20">
          <div className={`flex flex-col sm:flex-row justify-between items-end mb-6 md:mb-10 ${isUrdu ? 'sm:flex-row-reverse' : ''} gap-2`}>
            <h2 className={`text-2xl md:text-3xl font-bold text-brand-900 w-full sm:w-auto ${isUrdu ? 'font-urdu text-right' : ''}`}>
              {lang === 'en' ? 'Popular Packages' : 'مقبول پیکیجز'}
            </h2>
            <Link to="/packages" className={`text-brand-600 font-semibold hover:text-brand-700 w-full sm:w-auto ${isUrdu ? 'font-urdu text-right' : ''}`}>
              {lang === 'en' ? 'View All ->' : '<- سب دیکھیں'}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PACKAGES.map((pkg) => (
              <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-56 md:h-64 overflow-hidden relative">
                   <img src={pkg.image} alt={pkg.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-amber-500 shadow-sm">
                      <Star size={14} fill="currentColor" /> {pkg.rating}
                   </div>
                </div>
                <div className={`p-5 md:p-6 ${isUrdu ? 'text-right' : ''}`}>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 line-clamp-1 ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? pkg.titleUr : pkg.titleEn}
                  </h3>
                  <p className={`text-brand-600 font-medium text-sm md:text-base ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? pkg.locationUr : pkg.locationEn}
                  </p>
                  <div className={`mt-4 pt-4 border-t border-gray-100 flex justify-between items-center ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-500 text-xs md:text-sm">{isUrdu ? pkg.durationUr : pkg.durationEn}</span>
                    <span className="text-lg md:text-xl font-bold text-brand-700">{pkg.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mini Gallery */}
        <div className="rounded-3xl overflow-hidden relative h-64 md:h-96 mb-16 md:mb-20 shadow-xl">
            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                <Link to="/gallery" className={`bg-white text-brand-900 px-6 py-2 md:px-8 md:py-3 rounded-full text-lg font-bold hover:bg-brand-50 transition transform hover:scale-105 z-20 ${isUrdu ? 'font-urdu' : ''}`}>
                   {t.nav.gallery}
                </Link>
            </div>
            <div className="grid grid-cols-3 h-full">
                {showcaseImages.map((img, i) => (
                    <img key={i} src={img} alt="Gallery" className="w-full h-full object-cover" />
                ))}
            </div>
        </div>

        {/* Testimonials Section */}
        <section className="py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold text-brand-900 mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
              {t.testimonials.title}
            </h2>
            <p className={`text-gray-500 text-sm md:text-base ${isUrdu ? 'font-urdu' : ''}`}>
              {t.testimonials.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial) => (
               <div key={testimonial.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 relative mt-4 md:mt-0">
                 <div className={`absolute -top-4 ${isUrdu ? 'right-8' : 'left-8'} bg-brand-500 text-white p-3 rounded-full shadow-lg`}>
                   <Quote size={20} fill="currentColor" />
                 </div>
                 <div className={`pt-4 ${isUrdu ? 'text-right' : ''}`}>
                   <p className={`text-gray-600 italic mb-6 leading-relaxed ${isUrdu ? 'font-urdu text-lg' : ''}`}>
                     "{isUrdu ? testimonial.textUr : testimonial.textEn}"
                   </p>
                   
                   <div className={`flex items-center gap-3 md:gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                     <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl flex-shrink-0">
                       {testimonial.name.charAt(0)}
                     </div>
                     <div>
                       <h4 className={`font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>{testimonial.name}</h4>
                       <div className={`flex items-center text-xs md:text-sm text-gray-500 gap-1 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                         <MapPin size={12} />
                         <span>{testimonial.location}</span>
                       </div>
                     </div>
                     <div className={`flex-grow flex ${isUrdu ? 'justify-start' : 'justify-end'}`}>
                        <div className="flex text-amber-400">
                          {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </section>

      </section>
    </div>
  );
};

export default Home;