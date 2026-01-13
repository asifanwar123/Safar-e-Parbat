
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import TravelHistory from './pages/TravelHistory';
import WhatsAppButton from './components/WhatsAppButton';
import AdminButton from './components/AdminButton';
import { Language } from './types';
import { DataProvider } from './context/DataContext';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <DataProvider>
        <Router>
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
                <Route path="/admin" element={<Admin />} />
            </Routes>
            </main>
            <WhatsAppButton />
            <AdminButton />
            <Footer lang={lang} />
        </div>
        </Router>
    </DataProvider>
  );
};

export default App;
