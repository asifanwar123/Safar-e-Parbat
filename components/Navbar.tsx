
import React, { useState } from 'react';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL, CONTENT } from '../constants';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const t = CONTENT[lang].nav;
  const isUrdu = lang === 'ur';
  const location = useLocation();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ur' : 'en');
  };

  const navLinks = [
    { name: t.home, path: "/" },
    { 
      name: t.about, 
      path: "/about",
      children: [
        { name: t.travelHistory, path: "/travel-history" },
        { name: t.gallery, path: "/gallery" }
      ]
    },
    { name: t.packages, path: "/packages" },
    { name: t.contact, path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  const isParentActive = (children: {path: string}[]) => {
     return children.some(c => location.pathname === c.path);
  };

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
              <div key={link.path} className="relative group">
                {link.children ? (
                   <>
                     <Link
                        to={link.path}
                        className={`${
                          isActive(link.path) || isParentActive(link.children) ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'
                        } transition-colors duration-200 whitespace-nowrap flex items-center gap-1 ${isUrdu ? 'font-urdu text-lg flex-row-reverse' : 'font-sans text-sm lg:text-base'}`}
                      >
                        {link.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                      </Link>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 invisible group-hover:visible z-50 ${isUrdu ? 'text-right' : 'text-left'}`}>
                          {link.children.map(child => (
                              <Link 
                                  key={child.path}
                                  to={child.path}
                                  className={`block px-4 py-3 text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition border-b border-gray-50 last:border-0 ${isActive(child.path) ? 'bg-brand-50 text-brand-600 font-semibold' : ''} ${isUrdu ? 'font-urdu' : 'text-sm'}`}
                              >
                                  {child.name}
                              </Link>
                          ))}
                      </div>
                   </>
                ) : (
                    <Link
                        to={link.path}
                        className={`${
                        isActive(link.path) ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'
                        } transition-colors duration-200 whitespace-nowrap ${isUrdu ? 'font-urdu text-lg' : 'font-sans text-sm lg:text-base'}`}
                    >
                        {link.name}
                    </Link>
                )}
              </div>
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
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl max-h-[80vh] overflow-y-auto">
          <div className={`px-4 pt-2 pb-6 space-y-2 flex flex-col ${isUrdu ? 'items-end' : 'items-start'}`}>
            {navLinks.map((link) => (
              <div key={link.path} className="w-full">
                 {link.children ? (
                     <div className="w-full border-b border-gray-50 last:border-0">
                         <div className={`flex items-center justify-between w-full ${isUrdu ? 'flex-row-reverse' : ''}`}>
                             <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 flex-grow ${isUrdu ? 'text-right font-urdu text-xl' : 'text-left'}`}
                             >
                                 {link.name}
                             </Link>
                             <button
                                 onClick={(e) => {
                                     e.preventDefault();
                                     setMobileSubmenuOpen(mobileSubmenuOpen === link.path ? null : link.path);
                                 }}
                                 className="p-3 text-gray-400 hover:text-brand-600 focus:outline-none"
                             >
                                 <ChevronDown size={20} className={`transform transition-transform duration-200 ${mobileSubmenuOpen === link.path ? 'rotate-180' : ''}`} />
                             </button>
                         </div>
                         <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubmenuOpen === link.path ? 'max-h-48 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                             <div className={`bg-gray-50 rounded-lg py-1 px-2 ${isUrdu ? 'mr-4' : 'ml-4'}`}>
                                 {link.children.map(child => (
                                     <Link
                                         key={child.path}
                                         to={child.path}
                                         onClick={() => setIsOpen(false)}
                                         className={`block px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-white transition mb-1 last:mb-0 ${isUrdu ? 'text-right font-urdu text-lg' : 'text-left'}`}
                                     >
                                         {child.name}
                                     </Link>
                                 ))}
                             </div>
                         </div>
                     </div>
                 ) : (
                    <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${isUrdu ? 'text-right font-urdu text-xl' : 'text-left'}`}
                    >
                        {link.name}
                    </Link>
                 )}
              </div>
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
