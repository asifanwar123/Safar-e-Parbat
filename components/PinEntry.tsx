
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up border-4 border-white/80 ring-1 ring-gray-300"
      >
        <div className="bg-gray-50 p-6 flex flex-col items-center border-b border-gray-200">
          <img src={LOGO_URL} alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-white" />
          <a
            href="https://www.asifanwar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-lg font-bold text-gray-800 hover:text-brand-700 transition group flex items-center gap-2"
          >
            www.asifanwar.online
            <ExternalLink size={16} className="opacity-50 group-hover:opacity-100" />
          </a>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
                <Mail size={16} className="text-gray-500" />
                <p className="text-gray-700">m.asif.anwar@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-3">
                <MessageCircle size={16} className="text-gray-500" />
                <p className="text-gray-700" dir="ltr">+92 302 6834300 / +92 300 8885072</p>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                <ShieldCheck size={20} />
             </div>
             <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={7}
              placeholder="Enter 7-Digit PIN"
              className="w-full text-center tracking-[8px] font-bold text-lg px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                <AlertTriangle size={16} /> {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg transform active:scale-95"
          >
            Enter Website
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            Please contact the admin to request your personal PIN for access.
          </p>
        </div>
      </form>
    </div>
  );
};

export default PinEntry;
