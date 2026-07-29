
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, ChevronDown, Smartphone, Download, Share, PlusSquare, ArrowLeftRight } from 'lucide-react';
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
  
  // PWA states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  const t = CONTENT[lang].nav;
  const isUrdu = lang === 'ur';
  const location = useLocation();

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Initial standalone status check
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsStandaloneMode(isStandalone);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandaloneMode(true);
      }
    } else {
      setShowInstallGuide(true);
    }
  };

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
              <img className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-brand-600 object-cover" src={LOGO_URL} alt="Safar-e-Parbat" referrerPolicy="no-referrer" />
              <div className="flex flex-col leading-tight hidden sm:flex">
                <span className={`text-xl md:text-2xl font-bold text-brand-800 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
                  {lang === 'en' ? 'Safar-e-Parbat™' : 'سفر پربت™'}
                </span>
                <span className={`text-[10px] md:text-xs font-medium text-brand-600 tracking-[0.05em] uppercase italic ${isUrdu ? 'font-urdu text-right' : 'font-sans'}`}>
                  {lang === 'en' ? 'Travel & Tourism (SMC Private) Limited' : 'ٹریول اینڈ ٹورازم (ایس ایم سی پرائیویٹ) لمیٹڈ'}
                </span>
              </div>
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

            {!isStandaloneMode && (
              <button
                onClick={handleInstallClick}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-50 transition text-sm font-semibold whitespace-nowrap ${isUrdu ? 'font-urdu' : ''}`}
              >
                <Download size={16} />
                <span>{isUrdu ? "ایپ ڈاؤن لوڈ کریں" : "Get App"}</span>
              </button>
            )}

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

            {/* Install Application Button for Mobile & Tablet only, shows on toggle menu */}
            {!isStandaloneMode && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleInstallClick();
                }}
                className={`w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-brand-700 hover:from-emerald-700 hover:to-brand-800 text-white px-3 py-3 rounded-md font-bold shadow-lg active:scale-95 transition border border-emerald-500/20 w-full ${isUrdu ? 'font-urdu flex-row-reverse' : ''}`}
                id="pwa-install-mobile-btn"
              >
                <Smartphone size={20} className="animate-pulse" />
                <span>{isUrdu ? "ایپلیکیشن انسٹال کریں" : "Install Application"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Custom PWA Installation Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="pwa-install-modal">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform scale-up relative">
            
            {/* Header Design */}
            <div className="bg-brand-950 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <button 
                onClick={() => setShowInstallGuide(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition focus:outline-none"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-800/60 rounded-2xl border border-brand-700/30">
                  <Smartphone className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
                    {isUrdu ? "ایپلیکیشن انسٹال کریں" : "Install Safar-e-Parbat"}
                  </h3>
                  <p className={`text-xs text-brand-200 mt-0.5 ${isUrdu ? 'font-urdu text-right' : 'font-sans'}`}>
                    {isUrdu ? "ٹریول اسسٹنٹ کو ہوم اسکرین پر حاصل کریں" : "Add our travel buddy to your Home Screen"}
                  </p>
                </div>
              </div>
            </div>

            {/* Instruction content */}
            <div className="p-6 space-y-6">
              <div className={`text-sm text-gray-600 leading-relaxed ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
                {isIOS ? (
                  isUrdu ? (
                    "سفاری براؤزر استعمال کرتے ہوئے اپنے آئی فون یا آئی پیڈ پر انسٹال کرنے کے لیے درج ذیل مراحل پر عمل کریں:"
                  ) : (
                    "To install on your iPhone or iPad using the Safari browser, follow these simple steps:"
                  )
                ) : (
                  isUrdu ? (
                    "اپنے اینڈرائیڈ ڈیوائس پر ویب ایپ انسٹال کرنے کے لیے درج ذیل مراحل پر عمل کریں:"
                  ) : (
                    "To install the application on your mobile device, follow these quick steps:"
                  )
                )}
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {isIOS ? (
                  // iOS Safari instructions
                  <>
                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        1
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "شیئر مینو کھولیں" : "Open Share Menu"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap ${isUrdu ? 'font-urdu justify-end' : ''}`}>
                          {isUrdu ? "سفاری براؤزر کے نیچے موجود" : "Tap the"}{' '}
                          <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-semibold text-gray-700 text-[10px]">
                            <Share size={12} /> Share
                          </span>{' '}
                          {isUrdu ? "بٹن پر کلک کریں" : "button at the bottom toolbar."}
                        </p>
                      </div>
                    </div>

                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        2
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "ہوم اسکرین میں شامل کریں" : "Add to Home Screen"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap ${isUrdu ? 'font-urdu justify-end' : ''}`}>
                          {isUrdu ? "نیچے اسکرول کریں اور منتخب کریں" : "Scroll down and request"}{' '}
                          <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-semibold text-gray-700 text-[10px]">
                            <PlusSquare size={12} /> Add to Home Screen
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        3
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "انسٹالیشن مکمل کریں" : "Complete installation"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "اوپر دائیں کونے میں موجود 'Add' یا 'شامل کریں' پر دبائیں۔" : "Tap 'Add' in the top right corner to save to your home screen."}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Android / Others instructions
                  <>
                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        1
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "براؤزر مینو کھولیں" : "Open Browser Menu"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "اوپر دائیں کونے میں موجود تین نقاط (3 dots) والے بٹن پر دہائیں مینو کھولنے کے لیے۔" : "Tap the settings menu button (three dots) in the top-right corner of your browser."}
                        </p>
                      </div>
                    </div>

                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        2
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "ایپ انسٹال کریں منتخب کریں" : "Select Install App"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap ${isUrdu ? 'font-urdu justify-end' : ''}`}>
                          {isUrdu ? "مینو متبادل سے منتخب کریں" : "Look for and select"}{' '}
                          <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-semibold text-gray-700 text-[10px]">
                            <Download size={11} /> Install App
                          </span>{' '}
                          {isUrdu ? "یا 'Add to Home screen'۔" : "or 'Add to Home screen'."}
                        </p>
                      </div>
                    </div>

                    <div className={`flex gap-3 items-start ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-sm border border-brand-100 mt-0.5">
                        3
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-800 text-sm ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "تصدیق کریں" : "Confirm and download"}
                        </p>
                        <p className={`text-xs text-gray-500 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "ظاہر ہونے والے ڈائیلاگ باکس میں 'انسٹال' یا 'شامل کریں' پر دبائیں۔" : "Click 'Install' or 'Add' to place Safar-e-Parbat icon in your app library."}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer action */}
            <div className={`bg-gray-50 px-6 py-4 border-t border-gray-100 flex ${isUrdu ? 'justify-start font-urdu' : 'justify-end'}`}>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="px-5 py-2.5 bg-brand-900 text-white font-semibold rounded-xl text-sm transition hover:bg-brand-950 hover:shadow-lg focus:outline-none"
              >
                {isUrdu ? "ٹھیک ہے، سمجھ گیا" : "Got it, thanks"}
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
