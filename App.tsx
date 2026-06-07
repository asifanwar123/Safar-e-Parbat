
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import TravelHistory from './pages/TravelHistory';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FloatingInquiry from './components/FloatingInquiry';
import PinEntry from './components/PinEntry';
import { Language, VisitorLog } from './types';
import { DataProvider, useData } from './context/DataContext';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Visitor Tracker Component
const VisitorTracker = () => {
  const { logVisitor } = useData();

  useEffect(() => {
    const trackVisitor = async () => {
        // Simple session check to avoid logging the same user on every refresh within a session
        if (sessionStorage.getItem('visitor_logged')) return;

        let geoData = null;

        // Try to fetch geographic data silently
        try {
            const response = await fetch('https://ipwho.is/');
            if (response.ok) {
                const data = await response.json();
                if (data && data.success) {
                    geoData = { city: data.city, country: data.country, ip: data.ip };
                }
            }
        } catch (e) {
            // Silent catch
        }

        if (!geoData) {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.ip) {
                        geoData = { city: data.city || 'Visitor', country: data.country_name || 'Pakistan', ip: data.ip };
                    }
                }
            } catch (e) {
                // Silent catch
            }
        }

        // Safe elegant fallback to prevent CORS / AdBlocker / Offline failures completely silently
        if (!geoData) {
            geoData = { city: "Safar-e-Parbat", country: "Portal Explorer", ip: "Secured IP" };
        }

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
            location: `${geoData.city}, ${geoData.country}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            device: `${device} (${os})`,
            browser: browser,
            ip: geoData.ip
        };

        try {
            await logVisitor(newLog);
            sessionStorage.setItem('visitor_logged', 'true');
        } catch (e) {
            // Safe logging catch
        }
    };

    trackVisitor();
  }, [logVisitor]);

  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Session state lookup
    if (sessionStorage.getItem('site_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('site_unlocked', 'true');
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <PinEntry onUnlock={handleUnlock} />;
  }

  return (
    <DataProvider>
      <Router>
        <VisitorTracker />
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col font-sans text-gray-900 ${lang === 'ur' ? 'font-urdu' : ''}`}>
            <Navbar lang={lang} setLang={setLang} />
            <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home lang={lang} />} />
                <Route path="/about" element={<About lang={lang} />} />
                <Route path="/packages" element={<Packages lang={lang} />} />
                <Route path="/packages/:id" element={<PackageDetails lang={lang} />} />
                <Route path="/gallery" element={<Gallery lang={lang} />} />
                <Route path="/contact" element={<Contact lang={lang} />} />
                <Route path="/travel-history" element={<TravelHistory lang={lang} />} />
                <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
                <Route path="/terms" element={<TermsOfService lang={lang} />} />
            </Routes>
            </main>
            <FloatingInquiry lang={lang} />
            <Footer lang={lang} />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
