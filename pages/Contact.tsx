
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const isUrdu = lang === 'ur';

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <div className="bg-brand-800 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                {t.title}
            </h1>
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
