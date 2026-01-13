
import React, { useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL, CONTENT } from '../constants';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = CONTENT[lang].nav;
  const isUrdu = lang === 'ur';
  const location = useLocation();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ur' : 'en');
  };

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/about" },
    { name: t.packages, path: "/packages" },
    { name: t.travelHistory, path: "/travel-history" },
    { name: t.gallery, path: "/gallery" },
    { name: t.contact, path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 md:h-20 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-brand-600 object-cover" src={LOGO_URL} alt="Safar-e-Parbat" />
              <span className={`text-xl md:text-2xl font-bold text-brand-800 hidden sm:block ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
                {lang === 'en' ? 'Safar-e-Parbat' : 'سفر پربت'}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-6 lg:space-x-8 ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path) ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'
                } transition-colors duration-200 whitespace-nowrap ${isUrdu ? 'font-urdu text-lg' : 'font-sans text-sm lg:text-base'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50 text-brand-700 transition"
            >
              <Globe size={16} />
              <span className="text-sm font-semibold">{lang === 'en' ? 'UR' : 'EN'}</span>
            </button>

            <Link
              to="/contact"
              className={`bg-brand-600 text-white px-4 lg:px-5 py-2 rounded-full hover:bg-brand-700 transition shadow-lg flex items-center gap-2 whitespace-nowrap ${isUrdu ? 'flex-row-reverse font-urdu' : 'text-sm'}`}
            >
              <Phone size={16} />
              {t.bookNow}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button
              onClick={toggleLang}
              className="mx-3 flex items-center gap-1 px-2 py-1 rounded border border-gray-200 text-brand-700 hover:bg-gray-50"
            >
              <span className="text-xs font-bold">{lang === 'en' ? 'UR' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-600 focus:outline-none p-1"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className={`px-4 pt-2 pb-6 space-y-2 flex flex-col ${isUrdu ? 'items-end' : 'items-start'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${isUrdu ? 'text-right font-urdu text-xl' : 'text-left'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`w-full mt-4 block text-center bg-brand-600 text-white px-3 py-3 rounded-md font-bold shadow-md active:scale-95 transition ${isUrdu ? 'font-urdu' : ''}`}
            >
              {t.bookNow}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
