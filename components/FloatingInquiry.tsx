
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Phone, MapPin, Users, Calendar } from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface FloatingInquiryProps {
  lang: Language;
}

const FloatingInquiry: React.FC<FloatingInquiryProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { packages } = useData();
  const isUrdu = lang === 'ur';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    travellers: '1',
    date: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Inquiry from Safar-e-Parbat Website*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Destination:* ${formData.destination}%0A` +
      `*Travellers:* ${formData.travellers}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Message:* ${formData.message}`;

    window.open(`https://wa.me/923334737025?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`mb-4 w-[320px] sm:w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-100 ${isUrdu ? 'text-right' : 'text-left'}`}
          >
            {/* Header */}
            <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
              <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className="bg-white/20 p-2 rounded-xl">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className={`font-bold ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? 'انکوائری کریں' : 'Travel Inquiry'}
                  </h3>
                  <p className="text-xs opacity-80">
                    {isUrdu ? 'ہم آپ کی مدد کے لیے تیار ہیں' : 'We typically reply in minutes'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <User size={12} /> {isUrdu ? 'آپ کا نام' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition ${isUrdu ? 'text-right' : ''}`}
                  placeholder={isUrdu ? 'نام لکھیں' : 'John Doe'}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <Phone size={12} /> {isUrdu ? 'واٹس ایپ نمبر' : 'WhatsApp Number'}
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition ${isUrdu ? 'text-right' : ''}`}
                  placeholder="+92 3XX XXXXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 font-sans">
                <div className="space-y-1">
                  <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <Users size={12} /> {isUrdu ? 'افراد' : 'Travellers'}
                  </label>
                  <select
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <Calendar size={12} /> {isUrdu ? 'تاریخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={12} /> {isUrdu ? 'منزل' : 'Destination'}
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none ${isUrdu ? 'text-right' : ''}`}
                >
                  <option value="">{isUrdu ? 'منتخب کریں' : 'Select Destination'}</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.titleEn}>
                      {isUrdu ? pkg.titleUr : pkg.titleEn}
                    </option>
                  ))}
                  <option value="Other">{isUrdu ? 'دیگر' : 'Other / Custom Trip'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold text-gray-500 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle size={12} /> {isUrdu ? 'پیغام' : 'Message'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition resize-none ${isUrdu ? 'text-right' : ''}`}
                  placeholder={isUrdu ? 'مزید تفصیلات...' : 'Tell us more about your trip...'}
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
              >
                <Send size={18} />
                {isUrdu ? 'واٹس ایپ پر بھیجیں' : 'Send on WhatsApp'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-brand-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group relative overflow-hidden`}
        aria-label="Toggle Inquiry Form"
      >
        <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
        >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.div>
        
        {!isOpen && (
            <span className={`max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold ${isUrdu ? 'font-urdu' : ''}`}>
                {isUrdu ? 'رابطہ کریں' : 'Plan Your Trip'}
            </span>
        )}

        {/* Pulse effect when closed */}
        {!isOpen && (
            <span className="absolute inset-0 rounded-full border-4 border-brand-500/30 animate-pulse pointer-events-none"></span>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingInquiry;
