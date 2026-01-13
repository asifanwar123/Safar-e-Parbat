
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

// Partner Logo Component with Fallback
const PartnerLogo = ({ partner }: { partner: any }) => {
  const [imgError, setImgError] = useState(false);

  // If we have a logo URL and no error occurred loading it
  if (partner.logo && !imgError) {
    return (
      <img 
        src={partner.logo} 
        alt={partner.name} 
        className="h-12 md:h-16 w-auto max-w-[150px] object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback to Icon + Text
  return (
    <div className={`flex items-center gap-3 ${partner.color} opacity-80 group-hover:opacity-100 transition`}>
      {partner.icon}
      <span className="text-lg font-black italic tracking-tighter uppercase group-hover:tracking-normal transition-all duration-300">
        {partner.name}
      </span>
    </div>
  );
};

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
    { icon: <Mountain size={32} />, title: t.features.adventure, color: "bg-blue-100 text-blue-600" },
    { icon: <Camera size={32} />, title: t.features.cultural, color: "bg-amber-100 text-amber-600" },
    { icon: <Users size={32} />, title: t.features.family, color: "bg-green-100 text-green-600" },
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

  // Partners Data with Logos (and fallbacks)
  const partners = [
    { 
        name: "Faisal Movers", 
        logo: "https://faisalmovers.com/wp-content/uploads/2021/04/FM-Logo.png", 
        color: "text-red-700", bg: "bg-white", border: "border-gray-200", icon: <Bus size={24}/> 
    },
    { 
        name: "Daewoo Express", 
        logo: "https://daewoo.com.pk/assets/images/logo.png", 
        color: "text-blue-800", bg: "bg-white", border: "border-gray-200", icon: <Zap size={24}/> 
    },
    { 
        name: "Kainat Travels", 
        logo: "https://kainattravels.com/assets/img/logo.png", 
        color: "text-orange-600", bg: "bg-white", border: "border-gray-200", icon: <Compass size={24}/> 
    },
    { 
        name: "Skyways", 
        logo: "https://skyways.pk/assets/images/logo.png", 
        color: "text-sky-600", bg: "bg-white", border: "border-gray-200", icon: <Wind size={24}/> 
    },
    { 
        name: "Rajput Travels", 
        logo: "https://rajputtravels.com/assets/images/logo.png", 
        color: "text-rose-800", bg: "bg-white", border: "border-gray-200", icon: <Shield size={24}/> 
    },
    { 
        name: "Al Makkah", 
        // No reliable public logo URL found, will use elegant fallback
        color: "text-emerald-700", bg: "bg-white", border: "border-gray-200", icon: <Moon size={24}/> 
    },
    { 
        name: "Madina Transport", 
        // No reliable public logo URL found, will use elegant fallback
        color: "text-green-600", bg: "bg-white", border: "border-gray-200", icon: <MapPin size={24}/> 
    }
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

            <div className="flex w-max animate-scroll hover:[animation-play-state:paused] items-center">
                {/* Triple the list for seamless looping on wide screens */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div key={index} className={`mx-4 md:mx-6 px-6 py-4 rounded-xl border-2 ${partner.border} ${partner.bg} flex items-center justify-center min-w-[200px] md:min-w-[240px] h-24 shadow-sm transform transition hover:scale-105 hover:shadow-md cursor-default group`}>
                        <PartnerLogo partner={partner} />
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Updated Discover the North Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
          {/* Decorative Background Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 ${isUrdu ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Composition */}
                  <div className="w-full lg:w-1/2 relative group px-4 lg:px-0">
                      <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-[1.02]">
                          <img 
                            src="https://images.pexels.com/photos/19442078/pexels-photo-19442078.jpeg" 
                            alt="Northern Pakistan Landscape" 
                            className="w-full h-[400px] lg:h-[500px] object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className={`absolute bottom-6 left-6 right-6 text-white ${isUrdu ? 'text-right' : ''}`}>
                             <div className="flex items-center gap-2 mb-2 text-brand-300 font-bold uppercase tracking-widest text-xs">
                                <MapPin size={14} /> Gilgit-Baltistan
                             </div>
                             <p className={`text-lg font-medium opacity-90 ${isUrdu ? 'font-urdu' : ''}`}>
                               {isUrdu ? 'زمین پر جنت کا تجربہ کریں' : 'Experience heaven on earth'}
                             </p>
                          </div>
                      </div>
                      
                      {/* Floating secondary image */}
                      <div className={`absolute -bottom-10 -right-4 lg:-right-10 w-40 h-40 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block transform transition duration-500 hover:scale-105 hover:rotate-3 ${isUrdu ? '-left-10 right-auto' : ''}`}>
                          <img src={GALLERY_IMAGES[0]} alt="Detail" className="w-full h-full object-cover" />
                      </div>

                      {/* Decoration dots */}
                      <div className={`absolute -top-4 -left-4 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')] opacity-40 z-0 ${isUrdu ? '-right-4 left-auto' : ''}`}></div>
                  </div>

                  {/* Text Content */}
                  <div className={`w-full lg:w-1/2 space-y-8 ${isUrdu ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-bold text-sm ${isUrdu ? 'flex-row-reverse' : ''}`}>
                         <Compass size={16} />
                         <span>{isUrdu ? 'شمال کی تلاش' : 'Explore the North'}</span>
                      </div>

                      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.about.title}
                      </h2>
                      
                      <p className={`text-lg text-gray-600 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
                        {t.about.desc}
                      </p>
                      
                      <div className={`p-6 bg-gray-50 rounded-2xl border-l-4 border-brand-500 ${isUrdu ? 'border-r-4 border-l-0' : ''}`}>
                          <p className={`text-gray-700 italic font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                             "{t.about.subDesc}"
                          </p>
                      </div>

                      <div className={`flex flex-wrap gap-4 ${isUrdu ? 'justify-end' : ''}`}>
                         <Link to="/about" className={`px-8 py-3 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 transition shadow-lg flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            {isUrdu ? 'مزید جانیں' : 'Learn More'}
                            {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                         </Link>
                      </div>
                  </div>
              </div>

              {/* Features Grid (Improved) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, idx) => (
                    <div key={idx} className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color.includes('blue') ? 'from-blue-50 to-blue-100' : feature.color.includes('amber') ? 'from-amber-50 to-amber-100' : 'from-green-50 to-green-100'} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform group-hover:rotate-12 transition-transform duration-300 ${feature.color}`}>
                                {feature.icon}
                            </div>
                            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isUrdu ? 'font-urdu text-2xl' : ''}`}>
                                {feature.title}
                            </h3>
                            <p className={`text-gray-500 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                                {isUrdu ? 'بہترین تجربہ اور یادگار لمحات۔' : 'Curated experiences designed for unforgettable memories.'}
                            </p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Featured Tours Preview */}
      <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
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
