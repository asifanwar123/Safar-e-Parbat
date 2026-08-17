import React, { useState, useEffect } from 'react';
import { CONTENT, GALLERY_IMAGES, CEO_IMAGE } from '../constants';
import { Language } from '../types';
import { CheckCircle, Quote, Shield, Compass, Award, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const t = CONTENT[lang].aboutPage;
  const isUrdu = lang === 'ur';

  const slides = [
    {
      id: 'secp',
      icon: Shield,
      titleEn: 'SECP Registered (SMC-Pvt Limited)',
      titleUr: 'SECP رجسٹرڈ (SMC-Pvt Limited)',
      subtitleEn: 'Securities & Exchange Commission of Pakistan',
      subtitleUr: 'سیکیورٹیز اینڈ ایکسچینج کمیشن آف پاکستان',
      badgeEn: 'Corporate Registration',
      badgeUr: 'کارپوریٹ رجسٹریشن',
      regNoEn: 'Corporate ID: #0122340 / 229384-A',
      regNoUr: 'کارپوریٹ آئی ڈی: #0122340 / 229384-A',
      descEn: 'Officially registered under the Securities and Exchange Commission of Pakistan (SECP), complying with nationwide corporate regulations to ensure absolute legality, security, and financial transparency.',
      descUr: 'سیکیورٹیز اینڈ ایکسچینج کمیشن آف پاکستان سے باقاعدہ رجسٹرڈ، جو ملک کے تمام کارپوریٹ اور سفری قوانین کے مطابق کارپوریٹ سطح پر مکمل قانونی تحفظ اور مالیاتی شفافیت فراہم کرتا ہے۔',
      pointsEn: ['Full SECP Compliance', 'Corporate Legal Protection', 'Absolute Financial Audits', 'National Security Clearing'],
      pointsUr: ['ایس ای سی پی کے تمام اصولوں کی پاسداری', 'کارپوریٹ قانونی تحفظ', 'مکمل مالیاتی شفافیت', 'قومی سلامتی کلیئرنس'],
      gradient: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/40 hover:bg-emerald-50/60 border-emerald-100',
      iconColor: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50',
      iconBorder: 'border-emerald-200/60'
    },
    {
      id: 'dts',
      icon: Compass,
      titleEn: 'DTS Licensed Tour Operator',
      titleUr: 'DTS لائسنس یافتہ ٹور آپریٹر',
      subtitleEn: 'Department of Tourist Services, Pakistan',
      subtitleUr: 'محکمہ سیاحتی خدمات، حکومتِ پاکستان',
      badgeEn: 'Government Tourism License',
      badgeUr: 'حکومتی سیاحتی لائسنس',
      regNoEn: 'Official DTS License: #4238-DTS',
      regNoUr: 'آفیشل ڈی ٹی ایس لائسنس: #4238-DTS',
      descEn: 'Licensed tourist operator by the Department of Tourist Services (DTS), Government of Pakistan, authorized to deliver top-tier guest experiences and standard adventure tour packages across Pakistan.',
      descUr: 'محکمہ سیاحتی خدمات (ڈیپارٹمنٹ آف ٹورسٹ سروسز) حکومتِ پاکستان سے لائسنس حاصل کردہ باضابطہ ٹور آپریٹر، جو ہر سفر کو محفوظ، آرام دہ اور یادگار بنانے کے عزم کے ساتھ سرگرمِ عمل ہے۔',
      pointsEn: ['DTS Authorized Operator', 'Vetted Professional Guides', 'Official Hospitality Standard', 'Government Travel Approvals'],
      pointsUr: ['ڈی ٹی ایس سے منظور شدہ آپریٹر', 'تجربہ کار اور تربیت یافتہ گائیڈز', 'اعلیٰ رہائشی و سفری سہولیات', 'باضابطہ حکومتی کلیئرنس'],
      gradient: 'from-emerald-600 to-brand-600',
      textColor: 'text-brand-700',
      bgColor: 'bg-brand-50/40 hover:bg-brand-50/60 border-brand-100',
      iconColor: 'bg-brand-100/80 text-brand-700 border-brand-200/50',
      iconBorder: 'border-brand-200/60'
    },
    {
      id: 'tmr',
      icon: Award,
      titleEn: 'IPO-Pakistan Registered Trademark',
      titleUr: 'آئی پی او پاکستان رجسٹرڈ ٹریڈ مارک',
      subtitleEn: 'Trade Marks Registry (TMR)',
      subtitleUr: 'ٹریڈ مارکس رجسٹری (TMR)',
      badgeEn: 'Brand Name Protected',
      badgeUr: 'برانڈ نام قانونی تحفظ',
      regNoEn: 'Trade Mark Registry ID: #518392',
      regNoUr: 'ٹریڈ مارک رجسٹری آئی ڈی: #518392',
      descEn: 'Officially registered with the Trade Marks Registry (TMR), operating under the Intellectual Property Organization of Pakistan (IPO-Pakistan). "Safar-e-Parbat" is a legally protected and registered trademark.',
      descUr: 'ٹریڈ مارکس رجسٹری (TMR) سے باضابطہ رجسٹرڈ، جو انٹلیکچوئل پراپرٹی آرگنائزیشن آف پاکستان (IPO-Pakistan) کے تحت کام کرتی ہے۔ "سفرِ پربت" ایک قانونی طور پر محفوظ اور رجسٹرڈ برانڈ نیم ہے۔',
      pointsEn: ['IPO Trademark Protected', 'Genuine Travel Brand', 'Intellectual Property Security', 'Copycat Defense System'],
      pointsUr: ['آئی پی او کے تحت محفوظ برانڈ', 'مستند سفری کمپنی', 'برانڈ کی قانونی ساکھ', 'جعل سازی کے خلاف تحفظ'],
      gradient: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50/40 hover:bg-amber-50/60 border-amber-100',
      iconColor: 'bg-amber-100/80 text-amber-700 border-amber-200/50',
      iconBorder: 'border-amber-200/60'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="pt-16 md:pt-20 bg-white min-h-screen pb-16 md:pb-20">
      <SEO 
        title={isUrdu ? "ہمارے بارے میں - سفرِ پربت" : "About Us - Safar-e-Parbat Travel & Tourism"}
        description={isUrdu ? "سفرِ پربت ٹریول اینڈ ٹورازم کی کہانی، مشن اور بانی شاہد امین یاسر کا پیغام۔ ہم محفوظ، معیاری اور یادگار سیاحتی خدمات فراہم کرتے ہیں۔" : "Learn about Safar-e-Parbat, our journey since 2008, mission, SECP registration, DTS license, and CEO message from Shahid Amin Yasir."}
        keywords="About Safar-e-Parbat, Shahid Amin Yasir, Pakistan travel agency, SECP registered tourism, DTS licensed tour operator, tourism in Pakistan"
        canonicalUrl="/about"
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
              <span>{isUrdu ? "سفرِ پربت تعارف و مشن" : "Our Journey & Mission"}</span>
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
                    ہمارے
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    بارے میں تفصیلات
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
                    About
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    Safar-e-Parbat
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Frosted Backing */}
            <div className="max-w-2xl mx-auto px-2">
              <p className={`text-gray-200 text-xs sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/35 border border-white/10 backdrop-blur-sm shadow-xl inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu 
                  ? "سفرِ پربت ٹریول اینڈ ٹورازم کی کہانی، مشن اور بانی شاہد امین یاسر کا پیغام۔" 
                  : "Discover our roots, values, and why we are Pakistan's most trusted travel partner since 2008."}
              </p>
            </div>
        </div>
      </div>

      {/* Our Official Registrations Section (Fancy Interactive Slider) */}
      <section className="bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 border-b border-gray-100/80 relative overflow-hidden mb-12 md:mb-16">
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-brand-500/5 rounded-full filter blur-3xl opacity-60"></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-xs ${isUrdu ? 'font-urdu' : ''}`}>
              <Shield size={12} className="text-emerald-600 animate-pulse" />
              {isUrdu ? 'حکومتی منظوری اور قانونی رجسٹریشن' : 'Government Approved & Legally Registered'}
            </span>
            <h2 className={`text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu ? 'ہماری آفیشل رجسٹریشنز' : 'Our Official Registrations'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Fancy Slider Container */}
          <div className="relative group/slider">
            
            {/* Main Interactive Slide Card */}
            <AnimatePresence mode="wait">
              {slides.map((slide, idx) => {
                if (idx !== activeSlide) return null;
                const CurrentIcon = slide.icon;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className={`bg-white rounded-3xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.08)] p-6 md:p-10 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center ${isUrdu ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Background slide accent line */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${slide.gradient}`}></div>

                    {/* Left: Giant badge icon with seal decoration */}
                    <div className="flex-shrink-0 relative flex items-center justify-center">
                      <div className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl flex items-center justify-center bg-gradient-to-b from-gray-50 to-white border-2 ${slide.iconBorder} relative z-10 shadow-lg group-hover/slider:scale-105 transition-transform duration-300`}>
                        <div className={`w-20 h-20 md:w-26 md:h-26 rounded-xl flex items-center justify-center ${slide.iconColor} shadow-inner`}>
                          <CurrentIcon size={44} className="stroke-2" />
                        </div>
                      </div>
                      {/* Decorative background glow behind the giant icon */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${slide.gradient} opacity-10 filter blur-xl scale-125`}></div>
                    </div>

                    {/* Right: Rich detail panel */}
                    <div className={`flex-grow space-y-4 ${isUrdu ? 'text-right w-full md:w-auto' : 'text-left w-full md:w-auto'}`}>
                      <div className={`flex flex-wrap gap-2 items-center ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[10px] uppercase font-bold tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/50 px-2.5 py-1 rounded-md ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? slide.badgeUr : slide.badgeEn}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                          {isUrdu ? slide.regNoUr : slide.regNoEn}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className={`text-2xl md:text-3xl font-black text-gray-900 leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? slide.titleUr : slide.titleEn}
                        </h3>
                        <p className={`text-xs md:text-sm text-slate-500 font-semibold tracking-wide ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? slide.subtitleUr : slide.subtitleEn}
                        </p>
                      </div>

                      <p className={`text-slate-600 text-sm md:text-base leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
                        {isUrdu ? slide.descUr : slide.descEn}
                      </p>

                      {/* Vetted points checklist */}
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 ${isUrdu ? 'direction-rtl' : ''}`}>
                        {(isUrdu ? slide.pointsUr : slide.pointsEn).map((point, index) => (
                          <div key={index} className={`flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200/40">
                              <Check size={12} className="stroke-[3]" />
                            </div>
                            <span className={isUrdu ? 'font-urdu' : ''}>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              className={`absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 w-11 h-11 rounded-full bg-white hover:bg-emerald-600 text-slate-700 hover:text-white shadow-xl border border-gray-100/80 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 z-20`}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} className="stroke-[2.5]" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className={`absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 w-11 h-11 rounded-full bg-white hover:bg-emerald-600 text-slate-700 hover:text-white shadow-xl border border-gray-100/80 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 z-20`}
              aria-label="Next Slide"
            >
              <ChevronRight size={20} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveSlide(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeSlide
                    ? 'w-8 bg-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
           <div className={`space-y-4 md:space-y-6 ${isUrdu ? 'md:order-last text-right' : ''}`}>
              <h2 className={`text-2xl md:text-3xl font-bold text-brand-800 ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.storyTitle}
              </h2>
              <div className="w-20 h-1 bg-brand-500 rounded-full"></div>
              <p className={`text-gray-600 text-base md:text-lg leading-loose ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.storyText}
              </p>
           </div>
           <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition duration-500 mt-6 md:mt-0">
              <img src={GALLERY_IMAGES[7]} alt="Our Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
           </div>
        </div>

        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-16 md:mb-24 group border-4 border-white/50">
           <img 
             src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkneqir5evMb9aN6XKxg4N68Yhne3CyznQi-piVKt4crJ_GTdkQA60MMGI39AYU2iqG9JmtrplZDpH9e0HwrlLT2aha7ohxRYZjEocVhZW_l_eyTuDTyXEE1zJLI9JbPoDcxNyjYy6olCqhk8XyjRpN6WYrjGJ-1ngNLkw-G3jCrAWzEjeGaAXiGrcZDE/s1600/tourism-in-pakistan.jpeg" 
             alt="Our Story Since 2008" 
             className="w-full h-full object-cover rounded-3xl transform group-hover:scale-105 transition duration-1000 ease-in-out" 
             referrerPolicy="no-referrer" 
           />
           <div className="absolute inset-0 flex items-center justify-center p-4">
             <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-105">
               <h3 className="text-2xl md:text-4xl font-bold">
                 <span className="text-brand-600">Our </span>
                 <span className="text-amber-500">Story </span>
                 <span className="text-emerald-500">- </span>
                 <span className="text-blue-600">Since </span>
                 <span className="text-purple-600">2008</span>
               </h3>
             </div>
           </div>
        </div>

        {/* CEO Section - Responsive Stack */}
        <div className="mb-16 md:mb-24 bg-brand-50 rounded-3xl p-6 md:p-12 border border-brand-100 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-brand-200">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-200 rounded-full opacity-20 hidden md:block"></div>
           
           <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 ${isUrdu ? 'md:flex-row-reverse text-center md:text-right' : 'text-center md:text-left'}`}>
              <div className="flex-shrink-0 relative group">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-brand-400 to-amber-300 shadow-2xl mx-auto">
                      <img src={CEO_IMAGE} alt={t.ceo.name} className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className={`absolute bottom-2 md:bottom-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-4 bg-brand-600 text-white p-2 rounded-full shadow-lg ${isUrdu ? 'md:left-4 md:right-auto' : ''}`}>
                      <Quote className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                  </div>
              </div>
              
              <div className="flex-grow space-y-3 md:space-y-4">
                  <h3 className={`text-xs md:text-sm font-bold text-brand-600 uppercase tracking-widest ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.title}
                  </h3>
                  <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.name}
                  </h2>
                  <p className={`text-brand-700 font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                      {t.ceo.role}
                  </p>
                  <div className="w-16 h-1 bg-amber-400 rounded-full my-4 mx-auto md:mx-0"></div>
                  <p className={`text-gray-700 text-base md:text-lg leading-relaxed italic ${isUrdu ? 'font-urdu' : ''}`}>
                      "{t.ceo.message}"
                  </p>
              </div>
           </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 mb-16 md:mb-24 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-32 h-32 bg-brand-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
           <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
           
           <h2 className={`text-2xl md:text-3xl font-bold text-brand-800 mb-4 md:mb-6 relative z-10 ${isUrdu ? 'font-urdu' : ''}`}>
              {t.missionTitle}
           </h2>
           <p className={`text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10 ${isUrdu ? 'font-urdu' : ''}`}>
              "{t.missionText}"
           </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
           <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl font-bold text-brand-900 ${isUrdu ? 'font-urdu' : ''}`}>
                 {t.whyUsTitle}
              </h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {t.whyUsPoints.map((point, idx) => (
                 <div key={idx} className={`bg-white border border-gray-100 p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition flex items-center gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="bg-brand-100 p-3 rounded-full text-brand-600 flex-shrink-0">
                       <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className={`font-semibold text-gray-800 text-base md:text-lg ${isUrdu ? 'font-urdu' : ''}`}>
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