
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTENT, LOGO_URL } from '../constants';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const isUrdu = lang === 'ur';

  const quickLinks = [
    { name: CONTENT[lang].nav.home, path: "/" },
    { name: CONTENT[lang].nav.about, path: "/about" },
    { name: CONTENT[lang].nav.packages, path: "/packages" },
    { name: CONTENT[lang].nav.travelHistory, path: "/travel-history" },
    { name: CONTENT[lang].nav.gallery, path: "/gallery" },
    { name: CONTENT[lang].nav.contact, path: "/contact" },
  ];

  return (
    <footer className="bg-brand-900 text-white pt-16 pb-8 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${isUrdu ? 'text-right' : 'text-left'}`}>
          
          {/* Brand Info */}
          <div className={`space-y-6 ${isUrdu ? 'order-last md:order-first' : ''}`}>
            <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse justify-start' : ''}`}>
               <img src={LOGO_URL} alt="Safar-e-Parbat" className="h-14 w-14 rounded-full border-2 border-brand-500 shadow-lg" />
               <h3 className={`text-2xl font-bold tracking-tight ${isUrdu ? 'font-urdu' : ''}`}>{lang === 'en' ? 'Safar-e-Parbat' : 'سفر پربت'}</h3>
            </div>
            <p className={`text-gray-300 leading-relaxed text-sm md:text-base opacity-90 ${isUrdu ? 'font-urdu' : ''}`}>
              {lang === 'en' ? 
                "Your trusted partner for exploring the majestic landscapes of Pakistan. From the peaks of Hunza to the lakes of Skardu, we make your journey memorable." : 
                "پاکستان کے شاندار مناظر کی سیر کے لیے آپ کا قابل اعتماد ساتھی۔ ہنزہ کی چوٹیوں سے لے کر سکردو کی جھیلوں تک، ہم آپ کے سفر کو یادگار بناتے ہیں۔"}
            </p>
            <div className={`flex gap-4 pt-2 ${isUrdu ? 'justify-end' : ''}`}>
              <a href="https://www.facebook.com/safareparbat" target="_blank" rel="noopener noreferrer" className="bg-brand-800 p-2.5 rounded-full hover:bg-white hover:text-brand-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"><Facebook size={20} /></a>
              <a href="#" className="bg-brand-800 p-2.5 rounded-full hover:bg-white hover:text-brand-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"><Instagram size={20} /></a>
              <a href="#" className="bg-brand-800 p-2.5 rounded-full hover:bg-white hover:text-brand-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isUrdu ? 'md:text-right' : ''}`}>
             <h3 className={`text-xl font-bold mb-6 text-brand-100 relative inline-block ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? 'فوری روابط' : 'Quick Links'}
                <span className={`absolute bottom-0 ${isUrdu ? 'right-0' : 'left-0'} w-1/2 h-0.5 bg-brand-500`}></span>
             </h3>
             <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className={`text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group ${isUrdu ? 'flex-row-reverse hover:pr-2 hover:pl-0' : ''}`}
                    >
                      {isUrdu ? (
                        <ChevronLeft size={16} className="text-brand-500 group-hover:text-brand-300 transition" />
                      ) : (
                        <ChevronRight size={16} className="text-brand-500 group-hover:text-brand-300 transition" />
                      )}
                      <span className={isUrdu ? 'font-urdu text-lg' : ''}>{link.name}</span>
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 ${isUrdu ? 'font-urdu' : ''}`}>
            <h3 className={`text-xl font-bold mb-6 text-brand-100 relative inline-block`}>
                {t.title}
                <span className={`absolute bottom-0 ${isUrdu ? 'right-0' : 'left-0'} w-1/2 h-0.5 bg-brand-500`}></span>
            </h3>
            
            <div className={`flex items-start gap-4 group ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="bg-brand-800 p-2 rounded-lg text-brand-400 group-hover:text-white transition-colors">
                 <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-200 text-sm mb-1">{isUrdu ? 'پتہ' : 'Address'}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{t.address}</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-4 group ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="bg-brand-800 p-2 rounded-lg text-brand-400 group-hover:text-white transition-colors">
                 <Phone size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-200 text-sm mb-1">{isUrdu ? 'فون' : 'Phone'}</h4>
                <p className="text-gray-300" dir="ltr">{t.phone}</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-4 group ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="bg-brand-800 p-2 rounded-lg text-brand-400 group-hover:text-white transition-colors">
                 <Mail size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-brand-200 text-sm mb-1">{isUrdu ? 'ای میل' : 'Email'}</h4>
                <p className="text-gray-300 break-all text-sm" dir="ltr">{t.email}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-brand-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <p className={isUrdu ? 'font-urdu' : ''}>© {new Date().getFullYear()} Safar-e-Parbat. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link to="/about" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/admin" className="hover:text-white transition text-brand-700 hover:text-brand-500"><Lock size={12}/></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
