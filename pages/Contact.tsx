
import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe, Smartphone, Clock, User } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language, VisitorLog } from '../types';
import { useData } from '../context/DataContext';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const isUrdu = lang === 'ur';
  const { visitorLogs, logVisitor } = useData();

  // Visitor Tracking Logic
  useEffect(() => {
    const trackVisitor = async () => {
        // Simple session check to avoid logging the same user on every refresh within a session
        if (sessionStorage.getItem('visitor_logged')) return;

        try {
            // Using a free IP geolocation API
            const response = await fetch('https://ipwho.is/');
            const data = await response.json();

            if (data.success) {
                const ua = navigator.userAgent;
                let device = "Desktop";
                if (/mobile/i.test(ua)) device = "Mobile";
                else if (/tablet/i.test(ua)) device = "Tablet";
                
                let browser = "Unknown Browser";
                if(ua.indexOf("Chrome") > -1) browser = "Chrome";
                else if(ua.indexOf("Safari") > -1) browser = "Safari";
                else if(ua.indexOf("Firefox") > -1) browser = "Firefox";

                // OS Detection
                let os = "Unknown OS";
                if (ua.indexOf("Win") !== -1) os = "Windows";
                else if (ua.indexOf("Mac") !== -1) os = "MacOS";
                else if (ua.indexOf("Linux") !== -1) os = "Linux";
                else if (ua.indexOf("Android") !== -1) os = "Android";
                else if (ua.indexOf("like Mac") !== -1) os = "iOS";

                const newLog: VisitorLog = {
                    id: Date.now().toString(),
                    location: `${data.city}, ${data.country}`,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    device: `${device} (${os})`,
                    browser: browser,
                    ip: data.ip
                };

                await logVisitor(newLog);
                sessionStorage.setItem('visitor_logged', 'true');
            }
        } catch (error) {
            console.error("Error tracking visitor:", error);
        }
    };

    trackVisitor();
  }, [logVisitor]);

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

        {/* --- Recent Visitors Log Section --- */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
             <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h3 className={`text-xl font-bold text-gray-800 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                     <Globe className="text-brand-600" size={20} />
                     {isUrdu ? 'ویب سائٹ کے آخری 20 زائرین' : 'Last 20 Website Visitors'}
                 </h3>
                 <span className="text-xs font-bold bg-brand-100 text-brand-700 px-2 py-1 rounded-full">Live</span>
             </div>
             
             <div className="overflow-x-auto">
                 <table className={`w-full text-left border-collapse ${isUrdu ? 'text-right' : ''}`}>
                     <thead>
                         <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                             <th className={`px-6 py-3 font-semibold ${isUrdu ? 'text-right' : ''}`}>{isUrdu ? 'مہمان' : 'Visitor'}</th>
                             <th className={`px-6 py-3 font-semibold ${isUrdu ? 'text-right' : ''}`}>{isUrdu ? 'مقام' : 'Location'}</th>
                             <th className={`px-6 py-3 font-semibold ${isUrdu ? 'text-right' : ''}`}>{isUrdu ? 'وقت' : 'Time'}</th>
                             <th className={`px-6 py-3 font-semibold ${isUrdu ? 'text-right' : ''}`}>{isUrdu ? 'آلہ' : 'Device'}</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                         {visitorLogs.length > 0 ? (
                             visitorLogs.map((log) => (
                                 <tr key={log.id} className="hover:bg-gray-50 transition">
                                     <td className="px-6 py-4">
                                         <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                             <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                 <User size={16} />
                                             </div>
                                             <span className="font-medium text-gray-900">Guest</span>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <div className={`flex items-center gap-2 text-gray-600 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                             <MapPin size={14} className="text-gray-400" />
                                             {log.location}
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <div className={`flex flex-col ${isUrdu ? 'items-end' : ''}`}>
                                             <span className="text-sm font-medium text-gray-900">{log.date}</span>
                                             <span className="text-xs text-gray-500 flex items-center gap-1">
                                                 <Clock size={10} /> {log.time}
                                             </span>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                         <div className={`flex items-center gap-2 text-sm text-gray-600 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                             <Smartphone size={14} className="text-gray-400" />
                                             <span>{log.device}</span>
                                             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{log.browser}</span>
                                         </div>
                                     </td>
                                 </tr>
                             ))
                         ) : (
                             <tr>
                                 <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                     {isUrdu ? 'زائرین کا ڈیٹا لوڈ ہو رہا ہے...' : 'Waiting for visitors...'}
                                 </td>
                             </tr>
                         )}
                     </tbody>
                 </table>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
