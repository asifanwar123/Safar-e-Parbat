
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CommentsSection from '../components/CommentsSection';
import { Mountain, Users, Camera, Star, Quote, MapPin, Bus, Zap, Moon, Compass, Shield, Wind, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, Comment } from '../types';
import { CONTENT, GALLERY_IMAGES, TESTIMONIALS, JSONBIN_BIN_ID, JSONBIN_API_KEY } from '../constants';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = CONTENT[lang];
  const isUrdu = lang === 'ur';
  const { packages, history } = useData(); // Use dynamic data
  const [recentComments, setRecentComments] = useState<Comment[]>([]);

  // Fetch comments for the Testimonials section
  useEffect(() => {
    const fetchComments = async () => {
      // Don't fetch if keys are not set
      if ((JSONBIN_BIN_ID as string) === "REPLACE_WITH_YOUR_BIN_ID" || (JSONBIN_API_KEY as string) === "REPLACE_WITH_YOUR_API_KEY") return;

      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
          headers: {
            'X-Master-Key': JSONBIN_API_KEY
          }
        });
        
        if (!response.ok) return; // Silent fail, fall back to static
        
        const data = await response.json();
        const remoteComments = Array.isArray(data.record) ? data.record : [];
        setRecentComments(remoteComments);
      } catch (err) {
        console.error("Error fetching comments for testimonials:", err);
      }
    };

    fetchComments();
  }, []);

  const features = [
    { icon: <Mountain size={40} />, title: t.features.adventure, color: "bg-blue-100 text-blue-600" },
    { icon: <Camera size={40} />, title: t.features.cultural, color: "bg-amber-100 text-amber-600" },
    { icon: <Users size={40} />, title: t.features.family, color: "bg-green-100 text-green-600" },
  ];

  // Pick top 3 images for grid
  const showcaseImages = GALLERY_IMAGES.slice(0, 3);

  // Determine what to show in testimonials (Dynamic vs Static)
  const showDynamicTestimonials = recentComments.length > 0;
  // Get top 3 latest comments
  const dynamicTestimonials = recentComments.slice(0, 3);

  // Use only first 3 packages for home page
  const displayPackages = packages.slice(0, 3);
  
  // Use first 3 history items
  const displayHistory = history.slice(0, 3);

  // Partners Data
  const partners = [
    { name: "Faisal Movers", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: <Bus size={24}/> },
    { name: "Daewoo Express", color: "text-blue-800", bg: "bg-blue-50", border: "border-blue-200", icon: <Zap size={24}/> },
    { name: "Al Makkah", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: <Moon size={24}/> },
    { name: "Madina Transport", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <MapPin size={24}/> },
    { name: "Kainat Travels", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", icon: <Compass size={24}/> },
    { name: "Rajput Travels", color: "text-rose-800", bg: "bg-rose-50", border: "border-rose-200", icon: <Shield size={24}/> },
    { name: "Skyways", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200", icon: <Wind size={24}/> }
  ];

  return (
    <div className="bg-gray-50">
      <Hero lang={lang} />

      {/* Trusted Partners Section */}
      <section className="bg-white py-10 border-b border-gray-100 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
            <p className={`text-sm md:text-base font-bold text-gray-400 uppercase tracking-[0.2em] ${isUrdu ? 'font-urdu' : ''}`}>
               {isUrdu ? 'ہمارے قابل اعتماد سفری شراکت دار' : 'Our Trusted Travel Partners'}
            </p>
          </div>
          
          <div className="relative w-full">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

            <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                {/* Triple the list for seamless looping on wide screens */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div key={index} className={`mx-4 md:mx-6 px-6 py-4 rounded-xl border-2 ${partner.border} ${partner.bg} flex items-center justify-center gap-3 min-w-[240px] shadow-sm transform transition hover:scale-105 hover:shadow-md cursor-default group`}>
                        <div className={`${partner.color} opacity-80 group-hover:opacity-100 transition`}>
                          {partner.icon}
                        </div>
                        <span className={`text-lg font-black italic tracking-tighter ${partner.color} uppercase group-hover:tracking-normal transition-all duration-300`}>
                            {partner.name}
                        </span>
                    </div>
                ))}
            </div>
          </div>
      </section>

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
            {displayPackages.map((pkg) => (
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
            {showDynamicTestimonials ? (
                // Dynamic Testimonials from Comments
                dynamicTestimonials.map((comment) => (
                   <div key={comment.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 relative mt-4 md:mt-0">
                     <div className={`absolute -top-4 ${isUrdu ? 'right-8' : 'left-8'} bg-brand-500 text-white p-3 rounded-full shadow-lg`}>
                       <Quote size={20} fill="currentColor" />
                     </div>
                     <div className={`pt-4 ${isUrdu ? 'text-right' : ''}`}>
                       <p className={`text-gray-600 italic mb-6 leading-relaxed line-clamp-3 ${isUrdu ? 'font-urdu text-lg' : ''}`}>
                         "{comment.text}"
                       </p>
                       
                       <div className={`flex items-center gap-3 md:gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                         <div className={`h-10 w-10 md:h-12 md:w-12 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-xl flex-shrink-0`}>
                           {comment.name.charAt(0).toUpperCase()}
                         </div>
                         <div>
                           <h4 className={`font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>{comment.name}</h4>
                           <div className={`flex items-center text-xs md:text-sm text-gray-500 gap-1 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                             <MapPin size={12} />
                             <span>{comment.date}</span>
                           </div>
                         </div>
                         <div className={`flex-grow flex ${isUrdu ? 'justify-start' : 'justify-end'}`}>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < (comment.rating || 5) ? "fill-current" : "text-gray-300"} />
                              ))}
                            </div>
                         </div>
                       </div>
                     </div>
                   </div>
                ))
            ) : (
                // Static Fallback Testimonials
                TESTIMONIALS.map((testimonial) => (
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
                ))
            )}
          </div>
        </section>

      </section>

      {/* Recent Travel History Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-10 gap-4 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
            <div className={`text-center md:text-left ${isUrdu ? 'md:text-right w-full' : 'w-full'}`}>
              <h2 className={`text-3xl md:text-5xl font-bold text-brand-900 mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.nav.travelHistory}
              </h2>
              <p className={`text-gray-500 ${isUrdu ? 'font-urdu' : ''}`}>
                 {isUrdu ? 'ہمارے حالیہ دوروں کی جھلکیاں' : 'Memories from our recent expeditions'}
              </p>
            </div>
            <Link 
              to="/travel-history" 
              className={`flex-shrink-0 bg-brand-100 text-brand-700 px-6 py-2 rounded-full font-bold hover:bg-brand-200 transition flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}
            >
              {isUrdu ? 'سب دیکھیں' : 'View All'}
              {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />} 
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayHistory.length > 0 ? (
              displayHistory.map((item) => (
                <Link key={item.id} to="/travel-history" className="group block bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1">
                      <Calendar size={12} />
                      {item.date}
                    </div>
                  </div>
                  <div className={`p-6 ${isUrdu ? 'text-right' : ''}`}>
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-brand-700 transition ${isUrdu ? 'font-urdu' : ''}`}>
                      {item.title}
                    </h3>
                    <div className={`flex items-center gap-2 text-sm text-gray-500 mb-4 ${isUrdu ? 'flex-row-reverse justify-start' : ''}`}>
                       <MapPin size={14} className="text-brand-500" />
                       <span>{item.location}</span>
                    </div>
                    <p className={`text-gray-600 line-clamp-2 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                      {item.description}
                    </p>
                    <div className={`mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider ${isUrdu ? 'flex-row-reverse' : ''}`}>
                       <Users size={14} />
                       <span>{item.visitors.length} {isUrdu ? 'مسافر' : 'Travelers'}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
                <div className="col-span-3 text-center py-10 text-gray-400">
                   <p>{isUrdu ? 'کوئی تاریخ دستیاب نہیں' : 'No travel history yet.'}</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Comments Section */}
      <CommentsSection lang={lang} />
    </div>
  );
};

export default Home;
