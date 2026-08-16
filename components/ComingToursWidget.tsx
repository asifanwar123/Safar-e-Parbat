import React, { useState } from 'react';
import { Language, TourPackage } from '../types';
import { 
  Calendar, Flame, Sparkles, MessageCircle, Phone, ExternalLink, CheckCircle2, Copy
} from 'lucide-react';

interface ComingToursWidgetProps {
  lang: Language;
  packages?: TourPackage[];
}

const ComingToursWidget: React.FC<ComingToursWidgetProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [copied, setCopied] = useState(false);
  const bannerUrl = typeof window !== 'undefined' ? `${window.location.origin}/banner_Jul_2026.jpg` : '/banner_Jul_2026.jpg';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bannerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="coming-tours-banner-section" className="py-12 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Header Strip */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>{isUrdu ? "آنے والے ٹورز کا آفیشل بینر" : "Official Coming Tours Banner"}</span>
              <Sparkles size={13} className="text-amber-400" />
            </div>
            <h2 className={`text-2xl sm:text-4xl font-black text-white ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu ? "سفرِ پربت ٹورز شیڈول و پیکجز" : "Upcoming Scheduled Tour"}
            </h2>
            <p className={`text-xs sm:text-sm text-gray-300 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu ? "بابر سر ٹاپ، ناران، شگران و سری پائے - 4 دن / 3 راتیں لگژری فیملی و گروپ ٹور" : "4 Days / 3 Nights • Babusar Top, Naran & Siri Paye (Multan, Bahawalpur, Khanewal Pickups)"}
            </p>
          </div>

          {/* Quick WhatsApp Link */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/923454737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20inquire%20about%20the%204%20Days%20Naran%20Babusar%20Tour%20(Rs.%2022,500%20/%20Rs.%2050,000%20couple)."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-lg hover:scale-105 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
            >
              <MessageCircle size={16} />
              <span>{isUrdu ? "واٹس ایپ پر رابطہ کریں" : "WhatsApp Inquiry"}</span>
            </a>
          </div>
        </div>

        {/* Shareable URL Link Card */}
        <div className="bg-slate-900/90 border border-brand-500/30 rounded-2xl p-4 mb-6 shadow-inner">
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ExternalLink size={15} />
              <span>{isUrdu ? "تصویر کا براہ راست شیئریبل لنک:" : "Official Banner Image URL Link:"}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                readOnly
                value={bannerUrl}
                className="bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl text-[11px] text-gray-200 w-full sm:w-80 select-all font-mono"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs whitespace-nowrap transition shadow-sm"
              >
                {copied ? <CheckCircle2 size={13} className="text-emerald-300" /> : <Copy size={13} />}
                <span>{copied ? (isUrdu ? "کاپی ہو گیا" : "Copied!") : (isUrdu ? "کاپی لنک" : "Copy Link")}</span>
              </button>
              <a
                href="/banner_Jul_2026.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs whitespace-nowrap transition"
              >
                {isUrdu ? "مکمل تصویر" : "View Full"}
              </a>
            </div>
          </div>
        </div>

        {/* MAIN BANNER CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-brand-500/50 shadow-2xl bg-black group">
          
          <img
            src="/banner_Jul_2026.jpg"
            alt="Safar-e-Parbat Travel & Tourism SMC Pvt Limited - 4 Days 3 Nights Babusar Top, Naran, Siri Paye Tour Banner"
            className="w-full h-auto object-contain max-h-[80vh] mx-auto rounded-3xl"
            referrerPolicy="no-referrer"
          />

          {/* Action Bar */}
          <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`text-white ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
              <p className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">
                {isUrdu ? "شروع قیمت: 22,500 روپے فی کس • کپل پیکج: 50,000 روپے" : "Starting from Rs. 22,500 / Person • Couple Package Rs. 50,000"}
              </p>
              <p className="text-sm sm:text-base font-black text-white">
                {isUrdu ? "بکنگ و معلومات: 0345-4737025 / 0333-4737025" : "Helpline: 0345-4737025 | 0333-4737025"}
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href="tel:03454737025"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition shadow-lg"
              >
                <Phone size={15} />
                <span>0345-4737025</span>
              </a>

              <a
                href="https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20book%20seats%20for%20the%204%20Days%20Babusar%20Top%20Naran%20Tour."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition shadow-lg"
              >
                <MessageCircle size={16} />
                <span>{isUrdu ? "ابھی بک کریں" : "BOOK NOW"}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComingToursWidget;
