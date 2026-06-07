
import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, Globe, Facebook, MessageSquare, ExternalLink, AlertTriangle, Eye, EyeOff, Lock } from 'lucide-react';

interface PinEntryProps {
  onUnlock: () => void;
}

// "Fozia@asif1234" encrypted with code shifting by +3 is "Ir}ldCdvi4567"
const ENCRYPTED_PIN = "Ir}ldCdvi4567";

const decrypt = (str: string): string => {
  return str.split('').map(c => String.fromCharCode(c.charCodeAt(0) - 3)).join('');
};

const LOGO_URL = "https://asifanwar.online/wp-content/uploads/2025/04/cropped-asifanwar.online1.png";

const PinEntry: React.FC<PinEntryProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === decrypt(ENCRYPTED_PIN)) {
      setError('');
      onUnlock();
    } else {
      setError('Invalid PIN/Passkey. Please try again.');
      // Add a shake animation on error
      const form = e.currentTarget as HTMLFormElement;
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-md p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 my-8 transition-transform duration-300"
      >
        {/* Header Branding */}
        <div className="bg-gradient-to-b from-brand-900 to-brand-950 p-8 flex flex-col items-center text-center border-b border-brand-800 text-white relative">
          <div className="absolute top-4 right-4 bg-brand-800 text-brand-300 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
            <Lock size={12} /> RESTRICTED
          </div>
          <img 
            src={LOGO_URL} 
            alt="Logo" 
            className="h-24 w-24 rounded-full shadow-2xl border-4 border-brand-800 hover:scale-105 transition-transform duration-300 pointer-events-auto" 
            referrerPolicy="no-referrer" 
          />
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white font-sans">
            Safar-e-Parbat
          </h2>
          <p className="text-brand-300 text-xs mt-1 font-mono tracking-wider uppercase">
            Portal Control Panel
          </p>
        </div>

        {/* Input & Form Area */}
        <div className="p-8 space-y-6">
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-xs text-orange-800 leading-relaxed">
              <strong>Restricted Access Active:</strong> This website is fully protected. Please input the developer's authorization key to unlock and proceed onto the web application.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 block">
              Authorization Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                <ShieldCheck size={20} className="text-brand-600 animate-pulse" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={32}
                placeholder="Enter Authorization Master Key"
                className="w-full text-center font-mono font-bold text-gray-850 px-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-600 outline-none transition text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-brand-600 transition"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-150 rounded-xl py-2.5 px-4 text-red-600 text-sm text-center flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> <span className="font-semibold">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-brand-600/20 transform active:scale-98 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            Verify & Unlock Website
          </button>

          {/* Developer Contact Panel */}
          <div className="border-t border-gray-100 pt-6 mt-4 space-y-4">
            <h4 className="text-center text-xs font-extrabold text-gray-400 uppercase tracking-widest">
              Developer Contact Support
            </h4>
            
            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <span className="text-xs font-bold text-gray-400">Developer</span>
                <span className="text-xs font-black text-brand-900 bg-brand-50 px-2.5 py-1 rounded-full uppercase">
                  MediaPlus
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/923026834300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 bg-white rounded-xl shadow-sm hover:shadow border border-gray-100 hover:border-emerald-200 text-gray-700 transition"
                >
                  <MessageSquare size={16} className="text-emerald-500" />
                  <div>
                    <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">WhatsApp</p>
                    <p className="font-bold text-gray-800">+92 302 6834300</p>
                  </div>
                </a>

                {/* Direct Call */}
                <a 
                  href="tel:+923008885072"
                  className="flex items-center gap-2.5 p-2 bg-white rounded-xl shadow-sm hover:shadow border border-gray-100 hover:border-brand-200 text-gray-700 transition"
                >
                  <Phone size={16} className="text-brand-500" />
                  <div>
                    <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Direct Call</p>
                    <p className="font-bold text-gray-800">+92 300 8885072</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:m.asif.anwar@gmail.com"
                  className="flex items-center gap-2.5 p-2 bg-white rounded-xl shadow-sm hover:shadow border border-gray-100 hover:border-blue-200 text-gray-700 transition"
                >
                  <Mail size={16} className="text-blue-500" />
                  <div>
                    <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Email Support</p>
                    <p className="font-bold text-gray-800 truncate max-w-[140px]">m.asif.anwar@gmail.com</p>
                  </div>
                </a>

                {/* Web link */}
                <a 
                  href="http://mediaplus1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 bg-white rounded-xl shadow-sm hover:shadow border border-gray-100 hover:border-purple-200 text-gray-700 transition"
                >
                  <Globe size={16} className="text-purple-500" />
                  <div>
                    <p className="font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Website</p>
                    <p className="font-bold text-gray-800">mediaplus1.vercel.app</p>
                  </div>
                </a>
              </div>

              {/* Facebook Link */}
              <a 
                href="https://www.facebook.com/mediaplusa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 bg-blue-50/30 hover:bg-blue-50 border border-blue-100/50 hover:border-blue-200 text-xs text-blue-700 font-bold rounded-xl transition justify-center w-full"
              >
                <Facebook size={16} className="fill-blue-600 text-blue-600" />
                <span>Visit Facebook Profile</span>
                <ExternalLink size={12} className="opacity-70 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PinEntry;
