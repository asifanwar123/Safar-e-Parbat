
import React from 'react';
import { Mail, Phone, MapPin, Send, Compass, Sparkles } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';
import SEO from '../components/SEO';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const isUrdu = lang === 'ur';

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <SEO 
        title={isUrdu ? "ہم سے رابطہ کریں - سفرِ پربت" : "Contact Us - Safar-e-Parbat Travel & Tourism"}
        description={isUrdu ? "سفرِ پربت ٹریول اینڈ ٹورازم سے رابطہ کریں۔ فون: 0333-4737025، ای میل: shahidaminyasir2@gmail.com، پتہ: کبیروالہ، پاکستان۔" : "Get in touch with Safar-e-Parbat for tour bookings, customized corporate itineraries, and travel support. Phone: +92 333 4737025."}
        keywords="Contact Safar-e-Parbat, book Pakistan tour, travel agency Kabirwala, Multan tour operator phone, Pakistan tourism contact"
        canonicalUrl="/contact"
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
              <span>{isUrdu ? "سفرِ پربت ہیلپ و رہنمائی" : "24/7 Booking Support & Helpdesk"}</span>
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
                    رابطہ
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 inline-block">
                    کریں
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
                    Contact
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
                  ? "سفرِ پربت ٹریول اینڈ ٹورازم سے رابطہ کریں۔ ہم آپ کے سفر کو خوبصورت بنانے کے لیے حاضر ہیں۔" 
                  : "Have questions about our itineraries, corporate custom packages or group deals? Drop us a message!"}
              </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          
          {/* Info Side */}
          <div className={`bg-brand-900 p-10 text-white flex flex-col justify-center ${isUrdu ? 'lg:order-last text-right' : ''}`}>
            <h2 className={`text-3xl font-bold mb-8 ${isUrdu ? 'font-urdu' : ''}`}>
               {isUrdu ? 'رابطہ کی تفصیلات' : 'Contact Information'}
            </h2>
            <div className="space-y-8">
              <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className="bg-brand-700 p-3 rounded-lg"><MapPin size={24} /></div>
                <div>
                  <h3 className={`font-bold text-brand-200 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>{isUrdu ? 'پتہ' : 'Address'}</h3>
                  <p className="text-lg">{t.address}</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className="bg-brand-700 p-3 rounded-lg"><Phone size={24} /></div>
                <div>
                  <h3 className={`font-bold text-brand-200 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>{isUrdu ? 'فون' : 'Phone'}</h3>
                  <p className="text-lg" dir="ltr">{t.phone}</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className="bg-brand-700 p-3 rounded-lg"><Mail size={24} /></div>
                <div>
                  <h3 className={`font-bold text-brand-200 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>{isUrdu ? 'ای میل' : 'Email'}</h3>
                  <p className="text-lg break-all" dir="ltr">{t.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10">
            <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${isUrdu ? 'font-urdu text-right' : ''}`}>
              {t.sendMessage}
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isUrdu ? 'font-urdu text-right text-lg' : ''}`}>
                   {t.name}
                </label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition bg-gray-50 ${isUrdu ? 'text-right' : ''}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isUrdu ? 'font-urdu text-right text-lg' : ''}`}>
                   {isUrdu ? 'فون نمبر' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition bg-gray-50 ${isUrdu ? 'text-right' : ''}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isUrdu ? 'font-urdu text-right text-lg' : ''}`}>
                   {t.message}
                </label>
                <textarea 
                  rows={4} 
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition bg-gray-50 ${isUrdu ? 'text-right' : ''}`}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition shadow-lg flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu text-xl' : ''}`}
              >
                {t.submit}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
