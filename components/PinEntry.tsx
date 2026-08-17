
import React, { useState } from 'react';
import { ShieldCheck, Mail, MessageCircle, ExternalLink, AlertTriangle } from 'lucide-react';

interface PinEntryProps {
  onUnlock: () => void;
}

const CORRECT_PIN = "8885072";
const LOGO_URL = "https://asifanwar.online/wp-content/uploads/2025/04/cropped-asifanwar.online1.png";

const PinEntry: React.FC<PinEntryProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setError('');
      onUnlock();
    } else {
      setError('Invalid PIN. Please try again.');
      // Add a shake animation on error
      const form = e.currentTarget as HTMLFormElement;
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up border border-gray-100 ring-1 ring-black/5"
      >
        <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950 p-8 flex flex-col items-center border-b border-brand-800/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

          <img src={LOGO_URL} alt="Logo" className="h-24 w-24 rounded-2xl shadow-2xl border-4 border-white/10 backdrop-blur-md relative z-10 transform hover:rotate-3 transition duration-300" referrerPolicy="no-referrer" />
          <a
            href="https://www.asifanwar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 text-xl font-black tracking-tight text-white hover:text-emerald-300 transition group flex items-center gap-2 relative z-10"
          >
            www.asifanwar.online
            <ExternalLink size={16} className="opacity-65 group-hover:opacity-100 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
          <p className="text-xs text-brand-300 font-medium mt-1 tracking-wider uppercase relative z-10">
            Official Tourism Portal Partner
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3.5 bg-gray-50/80 border border-gray-100 p-4 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-3">
                <Mail size={15} className="text-emerald-600" />
                <p className="text-gray-700 font-medium text-sm">m.asif.anwar@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-3">
                <MessageCircle size={15} className="text-emerald-600" />
                <p className="text-gray-700 font-semibold text-sm" dir="ltr">+92 302 6834300 / +92 300 8885072</p>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-600 pointer-events-none">
                <ShieldCheck size={22} className="animate-pulse" />
             </div>
             <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={7}
              placeholder="Enter 7-Digit PIN"
              className="w-full text-center tracking-[12px] placeholder:tracking-normal font-black text-xl pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-300 bg-gray-50/50 focus:bg-white text-gray-800 shadow-sm"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2 animate-pulse">
                <AlertTriangle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-700 hover:to-brand-700 text-white font-extrabold py-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-300 transform active:scale-95 text-base tracking-wide"
          >
            Unlock Portal Access
          </button>
          
          <p className="text-xs text-gray-400 text-center font-normal leading-relaxed">
            Please contact the administration or support line to request your secure 7-digit access PIN.
          </p>
        </div>
      </form>
    </div>
  );
};

export default PinEntry;
