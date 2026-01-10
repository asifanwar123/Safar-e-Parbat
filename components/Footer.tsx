import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { CONTENT, LOGO_URL } from '../constants';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const isUrdu = lang === 'ur';

  return (
    <footer className="bg-brand-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${isUrdu ? 'text-right' : 'text-left'}`}>
          
          {/* Brand Info */}
          <div className={`space-y-4 ${isUrdu ? 'order-last md:order-first' : ''}`}>
            <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse justify-start' : ''}`}>
               <img src={LOGO_URL} alt="Safar-e-Parbat" className="h-12 w-12 rounded-full border-2 border-brand-500" />
               <h3 className={`text-2xl font-bold ${isUrdu ? 'font-urdu' : ''}`}>{lang === 'en' ? 'Safar-e-Parbat' : 'سفر پربت'}</h3>
            </div>
            <p className={`text-gray-300 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
              {lang === 'en' ? 
                "Your trusted partner for exploring the majestic landscapes of Pakistan. We make your journey memorable." : 
                "پاکستان کے شاندار مناظر کی سیر کے لیے آپ کا قابل اعتماد ساتھی۔ ہم آپ کے سفر کو یادگار بناتے ہیں۔"}
            </p>
            <div className={`flex gap-4 pt-4 ${isUrdu ? 'justify-end' : ''}`}>
              <a href="#" className="bg-brand-800 p-2 rounded-full hover:bg-brand-700 transition"><Facebook size={20} /></a>
              <a href="#" className="bg-brand-800 p-2 rounded-full hover:bg-brand-700 transition"><Instagram size={20} /></a>
              <a href="#" className="bg-brand-800 p-2 rounded-full hover:bg-brand-700 transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links - Simplified for this demo */}
          <div className={`${isUrdu ? 'md:text-right' : ''}`}>
             {/* Intentionally left simple to focus on contact info as requested */}
          </div>

          {/* Contact Info */}
          <div className={`space-y-4 ${isUrdu ? 'font-urdu' : ''}`}>
            <h3 className="text-xl font-bold mb-6 text-brand-100">{t.title}</h3>
            
            <div className={`flex items-start gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <MapPin className="text-brand-500 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-300">{t.address}</p>
            </div>
            
            <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Phone className="text-brand-500 flex-shrink-0" size={20} />
              <p className="text-gray-300" dir="ltr">{t.phone}</p>
            </div>
            
            <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Mail className="text-brand-500 flex-shrink-0" size={20} />
              <p className="text-gray-300 break-all" dir="ltr">{t.email}</p>
            </div>
          </div>

        </div>

        <div className="border-t border-brand-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Safar-e-Parbat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
