import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, CloudSun, MessageCircle, X, ChevronRight, ChevronLeft, 
  Maximize2, Minimize2, Flame, MapPin, RefreshCw, Sun, CloudRain, 
  CloudSnow, CloudLightning, Cloud, Wind, Droplets, ArrowUp, ArrowDown,
  ShieldCheck, ArrowRight, ArrowLeft, Phone, User, Users, Send, 
  Sparkles, CheckCircle2, Bell, ExternalLink, HelpCircle
} from 'lucide-react';
import { Language, TourPackage } from '../types';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { DESTINATIONS_GEO, DestinationGeo } from './DestinationWeatherWidget';

interface RightSideFloatingHubProps {
  lang: Language;
}

type ActiveTab = 'departures' | 'weather' | 'inquiry';

interface UpcomingTourItem {
  id: string;
  packageId?: string;
  titleEn: string;
  titleUr: string;
  destinationEn: string;
  destinationUr: string;
  departureDateEn: string;
  departureDateUr: string;
  departureCityEn: string;
  departureCityUr: string;
  durationEn: string;
  durationUr: string;
  price: string;
  seatsStatus: 'few_left' | 'booking_open' | 'confirmed';
  seatsCountEn: string;
  seatsCountUr: string;
  image: string;
  badgeEn?: string;
  badgeUr?: string;
}

const UPCOMING_TOURS: UpcomingTourItem[] = [
  {
    id: "tour-aug-1",
    packageId: "6",
    titleEn: "Hunza, Attabad Lake & Khunjerab Pass Expedition",
    titleUr: "ہنزہ، عطا آباد جھیل و خنجراب پاس لگژری ٹور",
    destinationEn: "Hunza, Passu, Sost, China Border",
    destinationUr: "ہنزہ، پاسو، سوست، پاک چین بارڈر",
    departureDateEn: "Every Friday Night (Weekly Departures)",
    departureDateUr: "ہر جمعہ کی رات (ہفتہ وار روانگی)",
    departureCityEn: "Multan, Kabirwala, Khanewal, Lahore & Islamabad",
    departureCityUr: "ملتان، کبیروالہ، خانیوال، لاہور و اسلام آباد",
    durationEn: "6 Days / 5 Nights",
    durationUr: "6 دن / 5 راتیں",
    price: "PKR 35,000",
    seatsStatus: "few_left",
    seatsCountEn: "Only 4 Seats Left",
    seatsCountUr: "صرف 4 سیٹیں باقی",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyNrOnrlOzuAoh93MExA4axcXnF6LFb3yQJHk1A441OSJ7w0afX7YNJ9dNnczzkJdtj-Qx5Zae9e_J9_514WZRBoryo0OOeJm-fkGGUP_ITtzXlEhdk5es0sp4hayfW9ssoeXp2mlio2m9T02Wi4hcaNXprfRxMSP76-JnIKMUnxmOU1Vs7LbZzOhb6MU/s1600/khunjerab%20pass.jpg",
    badgeEn: "Most Popular",
    badgeUr: "سب سے مقبول"
  },
  {
    id: "tour-aug-2",
    packageId: "1",
    titleEn: "Skardu, Shangrila, Katpana & Deosai Plains Tour",
    titleUr: "سکردو، شنگریلا، کٹپانہ و دیوسائی پلینز ٹور",
    destinationEn: "Skardu, Shigar, Khaplu, Deosai",
    destinationUr: "سکردو، شگر، خپلو، دیوسائی",
    departureDateEn: "Mid-Month Departure (Limited Seats)",
    departureDateUr: "وسط ماہ کی خصوصی روانگی (محدود نشستیں)",
    departureCityEn: "Multan, Lahore & Islamabad Pickups",
    departureCityUr: "ملتان، لاہور و اسلام آباد سے پک اپ",
    durationEn: "8 Days / 7 Nights",
    durationUr: "8 دن / 7 راتیں",
    price: "PKR 45,000",
    seatsStatus: "few_left",
    seatsCountEn: "6 Seats Remaining",
    seatsCountUr: "6 نشستیں باقی",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6w7U0e72gZ-n1GqK1JjJ0ZgGZ0lYV1G1a9G2c1vF-b6A7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2/s1600/skardu.jpg",
    badgeEn: "Confirmed",
    badgeUr: "روانگی کنفرم"
  },
  {
    id: "tour-aug-3",
    packageId: "3",
    titleEn: "Neelum Valley, Arang Kel & Kutton Waterfall Escape",
    titleUr: "وادی نیلم، ارنگ کھیل و کٹن آبشار ویک اینڈ ٹور",
    destinationEn: "Kutton, Keran, Sharda, Arang Kel",
    destinationUr: "کٹن، کیرن، شاردا، ارنگ کھیل",
    departureDateEn: "Every Thursday Departure (Weekend Special)",
    departureDateUr: "ہر جمعرات کی رات روانگی (ویک اینڈ اسپیشل)",
    departureCityEn: "Direct Routes from Multan & Islamabad",
    departureCityUr: "ملتان و اسلام آباد سے براہ راست روانگی",
    durationEn: "3 Days / 2 Nights",
    durationUr: "3 دن / 2 راتیں",
    price: "PKR 18,500",
    seatsStatus: "booking_open",
    seatsCountEn: "Booking Open",
    seatsCountUr: "بکنگ جاری ہے",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCASpap2OIwRvtBjvMNILXOnvqzrGAHyb4HnLWfK5u-2ntvnDtRxcFMzG83GY3CwZPlreczK556VPd0EWLCFMY0IKrt_YIUvauTsf-MXs1XblyqtidfZT4xwIKs_8Lo-tkDYLcVAx81d9iveER_n1kiRAMEi8VZ08An2bbiRhhTZgzRA653lwO-U6ywuE/s1600/image_5612.jpg",
    badgeEn: "Weekend Trip",
    badgeUr: "ویک اینڈ اسپیشل"
  },
  {
    id: "tour-aug-4",
    packageId: "5",
    titleEn: "Swat Valley, Kalam & Malam Jabba Adventure",
    titleUr: "سوات ویلی، کالام و مالم جبہ ایڈونچر ٹور",
    destinationEn: "Fizagat, Bahrain, Kalam, Malam Jabba",
    destinationUr: "فضاگٹ، بحرین، کالام، مالم جبہ",
    departureDateEn: "Upcoming Weekend Batch",
    departureDateUr: "آئندہ ویک اینڈ بیچ",
    departureCityEn: "Multan, Faisalabad, Islamabad",
    departureCityUr: "ملتان، فیصل آباد، اسلام آباد",
    durationEn: "4 Days / 3 Nights",
    durationUr: "4 دن / 3 راتیں",
    price: "PKR 22,000",
    seatsStatus: "booking_open",
    seatsCountEn: "Seats Available",
    seatsCountUr: "سیٹیں دستیاب ہیں",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkneqir5evMb9aN6XKxg4N68Yhne3CyznQi-piVKt4crJ_GTdkQA60MMGI39AYU2iqG9JmtrplZDpH9e0HwrlLT2aha7ohxRYZjEocVhZW_l_eyTuDTyXEE1zJLI9JbPoDcxNyjYy6olCqhk8XyjRpN6WYrjGJ-1ngNLkw-G3jCrAWzEjeGaAXiGrcZDE/s1600/tourism-in-pakistan.jpeg",
    badgeEn: "Family Friendly",
    badgeUr: "فیملی اسپیشل"
  }
];

interface SimpleWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  maxTemp: number;
  minTemp: number;
}

const getWeatherHelper = (code: number) => {
  switch (code) {
    case 0:
      return { labelEn: "Clear Sky", labelUr: "صاف مطلع", icon: <Sun className="text-amber-400" size={22} />, color: "text-amber-400" };
    case 1:
    case 2:
      return { labelEn: "Partly Cloudy", labelUr: "جزوی بادل", icon: <CloudSun className="text-teal-300" size={22} />, color: "text-teal-300" };
    case 3:
      return { labelEn: "Overcast", labelUr: "ابر آلود", icon: <Cloud className="text-gray-300" size={22} />, color: "text-gray-300" };
    case 51:
    case 61:
    case 80:
      return { labelEn: "Rain Showers", labelUr: "بارش", icon: <CloudRain className="text-blue-400" size={22} />, color: "text-blue-400" };
    case 71:
    case 85:
      return { labelEn: "Snowfall", labelUr: "برفباری", icon: <CloudSnow className="text-cyan-200" size={22} />, color: "text-cyan-200" };
    case 95:
      return { labelEn: "Thunderstorm", labelUr: "گرج چمک", icon: <CloudLightning className="text-amber-400" size={22} />, color: "text-amber-400" };
    default:
      return { labelEn: "Pleasant", labelUr: "خوشگوار", icon: <CloudSun className="text-emerald-300" size={22} />, color: "text-emerald-300" };
  }
};

const RightSideFloatingHub: React.FC<RightSideFloatingHubProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const { packages } = useData();

  // Sidebar slider visibility state (can be collapsed or expanded)
  const [isSliderVisible, setIsSliderVisible] = useState<boolean>(true);

  // Floating Window state
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('departures');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Weather sub-state
  const [weatherMap, setWeatherMap] = useState<Record<string, SimpleWeather>>({});
  const [selectedDestId, setSelectedDestId] = useState<string>("hunza");
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);

  // Inquiry Form state
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    destination: '',
    travellers: '2',
    date: '',
    message: ''
  });

  // Category filter for tours
  const [tourCategory, setTourCategory] = useState<'all' | 'hunza' | 'skardu' | 'kashmir'>('all');

  // Fetch real-time weather
  const fetchWeather = useCallback(async () => {
    try {
      setIsWeatherLoading(true);
      const results: Record<string, SimpleWeather> = {};
      await Promise.all(
        DESTINATIONS_GEO.map(async (dest) => {
          try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKarachi`;
            const res = await fetch(url);
            if (res.ok) {
              const data = await res.json();
              results[dest.id] = {
                temp: Math.round(data.current.temperature_2m),
                feelsLike: Math.round(data.current.apparent_temperature),
                humidity: Math.round(data.current.relative_humidity_2m),
                windSpeed: Math.round(data.current.wind_speed_10m),
                weatherCode: data.current.weather_code,
                isDay: Boolean(data.current.is_day),
                maxTemp: Math.round(data.daily?.temperature_2m_max?.[0] ?? data.current.temperature_2m),
                minTemp: Math.round(data.daily?.temperature_2m_min?.[0] ?? data.current.temperature_2m - 7)
              };
            }
          } catch (e) {
            results[dest.id] = {
              temp: dest.id === 'islamabad' ? 32 : dest.id === 'hunza' ? 19 : 22,
              feelsLike: 21,
              humidity: 45,
              windSpeed: 10,
              weatherCode: 1,
              isDay: true,
              maxTemp: 26,
              minTemp: 14
            };
          }
        })
      );
      setWeatherMap(results);
    } finally {
      setIsWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const openFloatingWindow = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsWindowOpen(true);
  };

  const convertTemp = (tempC: number) => {
    if (tempUnit === 'F') {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`;
    }
    return `${tempC}°C`;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Quick Inquiry - Safar-e-Parbat Portal*%0A%0A` +
      `*Name:* ${inquiryForm.name}%0A` +
      `*Phone:* ${inquiryForm.phone}%0A` +
      `*Destination:* ${inquiryForm.destination || 'Upcoming Tour'}%0A` +
      `*Persons:* ${inquiryForm.travellers}%0A` +
      `*Preferred Date:* ${inquiryForm.date}%0A` +
      `*Note:* ${inquiryForm.message}`;

    window.open(`https://wa.me/923334737025?text=${msg}`, '_blank');
    setIsWindowOpen(false);
  };

  const getTourWhatsAppLink = (tour: UpcomingTourItem) => {
    const text = isUrdu
      ? `السلام علیکم! میں سفرِ پربت کے آنے والے ٹور "${tour.titleUr}" (${tour.departureDateUr}) کی بکنگ اور نشستوں کی تفصیلات حاصل کرنا چاہتا ہوں۔`
      : `Hello Safar-e-Parbat! I would like to inquire about booking seats for upcoming tour: "${tour.titleEn}" departing on "${tour.departureDateEn}".`;
    return `https://wa.me/923334737025?text=${encodeURIComponent(text)}`;
  };

  const filteredTours = UPCOMING_TOURS.filter((tour) => {
    if (tourCategory === 'all') return true;
    if (tourCategory === 'hunza') return tour.destinationEn.toLowerCase().includes('hunza');
    if (tourCategory === 'skardu') return tour.destinationEn.toLowerCase().includes('skardu');
    if (tourCategory === 'kashmir') return tour.destinationEn.toLowerCase().includes('kashmir') || tour.destinationEn.toLowerCase().includes('kutton') || tour.destinationEn.toLowerCase().includes('swat');
    return true;
  });

  const activeDestObj = DESTINATIONS_GEO.find(d => d.id === selectedDestId) || DESTINATIONS_GEO[0];
  const activeDestWeather = weatherMap[activeDestObj.id];
  const activeWeatherHelper = activeDestWeather ? getWeatherHelper(activeDestWeather.weatherCode) : getWeatherHelper(0);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. RIGHT SIDE SLIDER DOCK (COLLAPSIBLE / HIDE & SHOW)                     */}
      {/* ========================================================================= */}
      <div 
        id="right-floating-slider-dock"
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[55] flex items-center transition-all duration-500 ease-in-out ${
          isSliderVisible ? 'translate-x-0' : 'translate-x-[calc(100%-36px)]'
        }`}
      >
        
        {/* Toggle Handle Button (Hide / Show Slider) */}
        <button
          type="button"
          onClick={() => setIsSliderVisible(!isSliderVisible)}
          className="bg-brand-900/95 hover:bg-brand-900 text-white p-2.5 rounded-l-2xl shadow-[-4px_0_15px_rgba(0,0,0,0.25)] border-y border-l border-brand-500/40 backdrop-blur-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform duration-300 hover:scale-105 group"
          title={isSliderVisible ? (isUrdu ? "سلائیڈر چھپائیں" : "Hide Slider") : (isUrdu ? "سلائیڈر کھولیں" : "Show Slider")}
          aria-label="Toggle Right Side Quick Dock"
        >
          {isSliderVisible ? (
            <ChevronRight size={18} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft size={18} className="text-amber-400 group-hover:-translate-x-0.5 transition-transform animate-pulse" />
          )}
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-black uppercase tracking-widest text-emerald-300 mt-1">
            {isSliderVisible ? (isUrdu ? "بند کریں" : "QUICK DOCK") : (isUrdu ? "کھولیں" : "OPEN HUB")}
          </span>
        </button>

        {/* Floating Quick Action Buttons Stack */}
        <div className="bg-slate-950/90 backdrop-blur-xl border-y border-l border-white/20 p-2.5 rounded-l-3xl shadow-[-10px_10px_35px_rgba(0,0,0,0.4)] flex flex-col gap-2 min-w-[170px] sm:min-w-[190px]">
          
          {/* Top Label */}
          <div className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center justify-between border-b border-white/10 pb-1.5 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles size={11} />
              {isUrdu ? "کوئیک مینو" : "Quick Actions"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Button 1: Upcoming Scheduled Departures */}
          <button
            type="button"
            onClick={() => openFloatingWindow('departures')}
            className={`w-full p-2.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 hover:from-emerald-900 hover:to-brand-900 border border-emerald-500/40 text-white text-left transition-all duration-300 hover:scale-[1.03] shadow-md group flex items-center justify-between gap-2.5 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-black text-white leading-tight block">
                    {isUrdu ? "آنے والے ٹورز" : "Coming Tours"}
                  </span>
                </div>
                <span className="text-[9px] text-emerald-300 font-semibold block">
                  {isUrdu ? "ہفتہ وار روانگیاں" : "Departures"}
                </span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse shrink-0">
              HOT
            </span>
          </button>

          {/* Button 2: Live Travel Weather Forecast */}
          <button
            type="button"
            onClick={() => openFloatingWindow('weather')}
            className={`w-full p-2.5 rounded-2xl bg-gradient-to-r from-sky-950 to-slate-900 hover:from-sky-900 hover:to-indigo-950 border border-sky-500/40 text-white text-left transition-all duration-300 hover:scale-[1.03] shadow-md group flex items-center justify-between gap-2.5 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition shrink-0">
                <CloudSun size={16} />
              </div>
              <div>
                <span className="text-[11px] font-black text-white leading-tight block">
                  {isUrdu ? "لائیو ویدر" : "Live Weather"}
                </span>
                <span className="text-[9px] text-sky-300 font-semibold block">
                  {isUrdu ? "شمالی علاقہ جات" : "6 Destinations"}
                </span>
              </div>
            </div>
            {weatherMap['hunza'] && (
              <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-amber-300 text-[10px] font-black shrink-0">
                {convertTemp(weatherMap['hunza'].temp)}
              </span>
            )}
          </button>

          {/* Button 3: Plan Trip / Instant Inquiry */}
          <button
            type="button"
            onClick={() => openFloatingWindow('inquiry')}
            className={`w-full p-2.5 rounded-2xl bg-gradient-to-r from-brand-900 to-emerald-950 hover:from-brand-800 hover:to-emerald-900 border border-brand-400/40 text-white text-left transition-all duration-300 hover:scale-[1.03] shadow-md group flex items-center justify-between gap-2.5 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition shrink-0">
                <MessageCircle size={16} />
              </div>
              <div>
                <span className="text-[11px] font-black text-white leading-tight block">
                  {isUrdu ? "فوری انکوائری" : "Plan Trip"}
                </span>
                <span className="text-[9px] text-brand-200 font-semibold block">
                  {isUrdu ? "24/7 ہیلپ لائن" : "WhatsApp Desk"}
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE FLOATING WINDOW / MODAL POPUP                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isWindowOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
            
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0" onClick={() => setIsWindowOpen(false)} />

            {/* Floating Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative z-10 bg-slate-950 text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden flex flex-col transition-all duration-300 ${
                isMaximized 
                  ? 'w-full h-full max-w-7xl max-h-[94vh]' 
                  : 'w-full max-w-4xl max-h-[88vh]'
              }`}
            >
              
              {/* Window Title Bar & Navigation Tabs */}
              <div className="bg-slate-900/90 border-b border-white/10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
                
                {/* Left: Window Tabs */}
                <div className={`flex items-center gap-1.5 sm:gap-2 overflow-x-auto ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  
                  {/* Departures Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('departures')}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'departures'
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    } ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                  >
                    <Calendar size={15} />
                    <span>{isUrdu ? "آنے والے شیڈولڈ ٹورز" : "Upcoming Scheduled Departures"}</span>
                  </button>

                  {/* Weather Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('weather')}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'weather'
                        ? 'bg-sky-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    } ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                  >
                    <CloudSun size={15} />
                    <span>{isUrdu ? "لائیو ویدر فورکاسٹ" : "Live Weather Forecast"}</span>
                  </button>

                  {/* Inquiry Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('inquiry')}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'inquiry'
                        ? 'bg-brand-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                    } ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                  >
                    <MessageCircle size={15} />
                    <span>{isUrdu ? "ٹریول انکوائری" : "Book / Inquire"}</span>
                  </button>

                </div>

                {/* Right: Window Controls */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
                    title={isMaximized ? "Restore Window" : "Maximize Window"}
                  >
                    {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWindowOpen(false)}
                    className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition shadow-md"
                    title="Close Window"
                  >
                    <X size={16} />
                  </button>
                </div>

              </div>

              {/* Window Content Body with Scroll */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-grow custom-scrollbar">
                
                {/* ------------------------------------------------------------- */}
                {/* TAB 1: UPCOMING SCHEDULED DEPARTURES (BANNER ONLY)            */}
                {/* ------------------------------------------------------------- */}
                {activeTab === 'departures' && (
                  <div className="space-y-6 max-w-4xl mx-auto">
                    
                    {/* Header Strip with Live Badge & Shareable URL */}
                    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10 ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                      <div>
                        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                          <Flame size={14} className="text-amber-400 animate-pulse" />
                          <span>{isUrdu ? "آنے والے ٹورز کا آفیشل شیڈول" : "Official Coming Tours Schedule"}</span>
                          <Sparkles size={13} className="text-amber-400" />
                        </div>
                        <h3 className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "سفرِ پربت ٹورز شیڈول و پیکجز" : "Safar-e-Parbat Coming Tour Banner"}
                        </h3>
                        <p className={`text-xs sm:text-sm text-gray-300 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "بابر سر ٹاپ، ناران، شگران و سری پائے - 4 دن / 3 راتیں لگژری فیملی و گروپ ٹور" : "4 Days / 3 Nights - Babusar Top, Naran & Siri Paye (Multan, Bahawalpur, Khanewal Pickups)"}
                        </p>
                      </div>

                      {/* Direct Booking Phone Numbers & WhatsApp */}
                      <div className={`flex flex-wrap items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                        <a
                          href="https://wa.me/923454737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20book%20seats%20for%20the%204%20Days%20Naran%20Babusar%20Tour%20(Rs.%2022,500%20/%20Rs.%2050,000%20couple)."
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-lg hover:scale-105 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                        >
                          <MessageCircle size={16} />
                          <span>{isUrdu ? "واٹس ایپ بکنگ" : "Book on WhatsApp"}</span>
                        </a>
                      </div>
                    </div>

                    {/* Image URL Generator & Direct Link Box */}
                    <div className="bg-slate-900/90 border border-brand-500/30 rounded-2xl p-3.5 sm:p-4 shadow-inner">
                      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <ExternalLink size={15} />
                          <span>{isUrdu ? "تصویر کا براہ راست یو آر ایل لنک:" : "Official Banner Image URL Link:"}</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/banner_Jul_2026.jpg`}
                            className="bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl text-[11px] text-gray-200 w-full sm:w-80 select-all font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/banner_Jul_2026.jpg`);
                              alert(isUrdu ? "تصویر کا لنک کاپی کر لیا گیا ہے!" : "Banner URL Link copied to clipboard!");
                            }}
                            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs whitespace-nowrap transition shadow-sm"
                          >
                            {isUrdu ? "کاپی لنک" : "Copy Link"}
                          </button>
                          <a
                            href="/banner_Jul_2026.jpg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs whitespace-nowrap transition"
                          >
                            {isUrdu ? "بڑے سائز میں دیکھیں" : "Open Full"}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* THE BANNER (ONLY ITEM SHOWN) */}
                    <div className="relative rounded-3xl overflow-hidden border-2 border-brand-500/50 shadow-2xl bg-black group">
                      
                      {/* Image Asset Display */}
                      <img
                        src="/banner_Jul_2026.jpg"
                        alt="Safar-e-Parbat Travel & Tourism SMC Pvt Limited - 4 Days 3 Nights Babusar Top, Naran, Siri Paye Tour Banner"
                        className="w-full h-auto object-contain max-h-[75vh] mx-auto rounded-3xl"
                        referrerPolicy="no-referrer"
                      />

                      {/* Floating Quick Action Overlay at Bottom */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className={`text-white ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
                          <p className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">
                            {isUrdu ? "خصوصی رعایت • نشستیں محدود ہیں" : "Rs. 22,500 / Person • Couple Rs. 50,000"}
                          </p>
                          <p className="text-sm sm:text-base font-black text-white">
                            {isUrdu ? "بکنگ و معلومات: 0345-4737025 / 0333-4737025" : "Call / WhatsApp: 0345-4737025 | 0333-4737025"}
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
                            href="https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20I%20want%20to%20book%20seats%20for%20the%204%20Days%20Babusar%20Top%20Naran%20Tour%20from%20Multan/Bahawalpur/Khanewal."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition shadow-lg"
                          >
                            <MessageCircle size={16} />
                            <span>{isUrdu ? "فوری بک کریں" : "BOOK NOW"}</span>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TAB 2: LIVE TRAVEL WEATHER FORECAST                           */}
                {/* ------------------------------------------------------------- */}
                {activeTab === 'weather' && (
                  <div className="space-y-6">
                    
                    {/* Header Strip & Unit Toggle */}
                    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10 ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                      <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold mb-1 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                          <CloudSun size={14} className="text-amber-400" />
                          <span>{isUrdu ? "اوپن ویدر لائیو اسٹیشن ڈیٹا" : "Real-Time Station & Satellite Data"}</span>
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-extrabold text-white ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? "اہم سیاحتی مقامات کا لائیو موسم" : "Live Travel Weather Forecast"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Unit Switcher */}
                        <div className="bg-white/10 p-1 rounded-xl border border-white/15 flex items-center text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setTempUnit('C')}
                            className={`px-2.5 py-1 rounded-lg transition ${tempUnit === 'C' ? 'bg-sky-600 text-white' : 'text-gray-300 hover:text-white'}`}
                          >
                            °C
                          </button>
                          <button
                            type="button"
                            onClick={() => setTempUnit('F')}
                            className={`px-2.5 py-1 rounded-lg transition ${tempUnit === 'F' ? 'bg-sky-600 text-white' : 'text-gray-300 hover:text-white'}`}
                          >
                            °F
                          </button>
                        </div>

                        {/* Refresh */}
                        <button
                          type="button"
                          onClick={fetchWeather}
                          disabled={isWeatherLoading}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
                          title="Refresh live weather"
                        >
                          <RefreshCw size={14} className={isWeatherLoading ? "animate-spin text-sky-400" : ""} />
                        </button>
                      </div>
                    </div>

                    {/* Destination Switcher Strip */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {DESTINATIONS_GEO.map((d) => {
                        const isSelected = d.id === selectedDestId;
                        const w = weatherMap[d.id];
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDestId(d.id)}
                            className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border transition cursor-pointer text-xs font-bold ${
                              isSelected
                                ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                                : 'bg-white/10 text-gray-300 hover:bg-white/15 border-white/10'
                            } ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                          >
                            <MapPin size={13} className={isSelected ? "text-white" : "text-sky-400"} />
                            <span>{isUrdu ? d.nameUr : d.nameEn}</span>
                            {w && (
                              <span className="bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-extrabold text-amber-300">
                                {convertTemp(w.temp)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Destination Main Weather Display */}
                    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        
                        {/* Info & Main Temp */}
                        <div className={`${isUrdu ? 'text-right' : 'text-left'}`}>
                          <span className="text-xs text-sky-300 font-bold uppercase tracking-wider block mb-1">
                            {isUrdu ? activeDestObj.regionUr : activeDestObj.regionEn} • {isUrdu ? activeDestObj.altitudeUr : activeDestObj.altitudeEn}
                          </span>
                          <h4 className={`text-2xl sm:text-3xl font-extrabold text-white mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                            {isUrdu ? activeDestObj.nameUr : activeDestObj.nameEn}
                          </h4>

                          <div className={`flex items-center gap-3 my-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                              {activeWeatherHelper.icon}
                            </div>
                            <div>
                              <div className="text-4xl sm:text-5xl font-black text-white">
                                {activeDestWeather ? convertTemp(activeDestWeather.temp) : "--"}
                              </div>
                              <span className="text-xs text-emerald-300 font-bold">
                                {isUrdu ? activeWeatherHelper.labelUr : activeWeatherHelper.labelEn}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full md:w-auto">
                          <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center">
                            <span className="text-[11px] text-gray-400 block mb-1">{isUrdu ? "محسوس" : "Feels Like"}</span>
                            <span className="text-sm font-bold text-white">
                              {activeDestWeather ? convertTemp(activeDestWeather.feelsLike) : "--"}
                            </span>
                          </div>

                          <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center">
                            <span className="text-[11px] text-gray-400 block mb-1">{isUrdu ? "ہوا کی رفتار" : "Wind Speed"}</span>
                            <span className="text-sm font-bold text-cyan-300">
                              {activeDestWeather ? `${activeDestWeather.windSpeed} km/h` : "--"}
                            </span>
                          </div>

                          <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center col-span-2 sm:col-span-1">
                            <span className="text-[11px] text-gray-400 block mb-1">{isUrdu ? "نمی" : "Humidity"}</span>
                            <span className="text-sm font-bold text-teal-300">
                              {activeDestWeather ? `${activeDestWeather.humidity}%` : "--"}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Travel Safety Note */}
                      <div className={`mt-5 pt-4 border-t border-white/10 flex items-start gap-2.5 text-xs text-gray-200 ${isUrdu ? 'flex-row-reverse text-right font-urdu' : 'text-left'}`}>
                        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          {isUrdu 
                            ? "موسم کی تازہ صورتحال کے مطابق ہلکی گرم جیکٹ، واٹر پروف شوز اور کیمرہ ساتھ رکھیں۔ مزید رہنمائی کے لیے ہمارے واٹس ایپ ٹریول ایکسپرٹ سے رابطہ کریں۔" 
                            : "Scenic mountain conditions. Pack comfortable layers and camera gear. Check with our 24/7 helpline for current road & pass statuses."}
                        </span>
                      </div>
                    </div>

                    {/* Direct Advice Action */}
                    <div className="text-center pt-2">
                      <a
                        href="https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20Please%20provide%20live%20weather%20and%20road%20updates."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-lg transition ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                      >
                        <MessageCircle size={16} />
                        <span>{isUrdu ? "لائیو روٹ اور موسم پر رہنمائی لیں" : "Get Live Route & Weather Advice on WhatsApp"}</span>
                      </a>
                    </div>

                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TAB 3: INSTANT TRAVEL INQUIRY FORM                            */}
                {/* ------------------------------------------------------------- */}
                {activeTab === 'inquiry' && (
                  <div className="max-w-2xl mx-auto">
                    <div className={`text-center mb-5 ${isUrdu ? 'font-urdu' : ''}`}>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        {isUrdu ? "کسٹم ٹور یا فوری بکنگ انکوائری" : "Plan Your Tour with Safar-e-Parbat™"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {isUrdu ? "اپنی تفصیلات درج کریں، ہم فوری طور پر واٹس ایپ پر پیکیج کوٹیشن فراہم کریں گے۔" : "Fill the quick form below to receive a personalized quote in minutes."}
                      </p>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={`text-xs font-bold text-gray-400 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <User size={12} /> {isUrdu ? 'آپ کا نام' : 'Full Name'}
                          </label>
                          <input
                            required
                            type="text"
                            value={inquiryForm.name}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                            className={`w-full p-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-brand-500 transition ${isUrdu ? 'text-right' : ''}`}
                            placeholder={isUrdu ? 'نام درج کریں' : 'e.g. Asif Anwar'}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className={`text-xs font-bold text-gray-400 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <Phone size={12} /> {isUrdu ? 'واٹس ایپ نمبر' : 'WhatsApp Number'}
                          </label>
                          <input
                            required
                            type="tel"
                            value={inquiryForm.phone}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                            className={`w-full p-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-brand-500 transition ${isUrdu ? 'text-right' : ''}`}
                            placeholder="+92 3XX XXXXXXX"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={`text-xs font-bold text-gray-400 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <MapPin size={12} /> {isUrdu ? 'پسندیدہ ٹور / منزل' : 'Destination'}
                          </label>
                          <select
                            value={inquiryForm.destination}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                            className={`w-full p-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-brand-500 transition ${isUrdu ? 'text-right' : ''}`}
                          >
                            <option value="">{isUrdu ? 'منتخب کریں' : 'Select Destination'}</option>
                            {packages.map((pkg) => (
                              <option key={pkg.id} value={pkg.titleEn}>
                                {isUrdu ? pkg.titleUr : pkg.titleEn}
                              </option>
                            ))}
                            <option value="Custom Family Tour">{isUrdu ? 'کسٹم فیملی ٹور' : 'Customized Private Tour'}</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className={`text-xs font-bold text-gray-400 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                            <Users size={12} /> {isUrdu ? 'افراد کی تعداد' : 'Number of Travelers'}
                          </label>
                          <select
                            value={inquiryForm.travellers}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, travellers: e.target.value })}
                            className="w-full p-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-brand-500 transition"
                          >
                            {['1', '2', '3-4', '5-7', '8-12', '15+ Group'].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className={`text-xs font-bold text-gray-400 uppercase flex items-center gap-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <MessageCircle size={12} /> {isUrdu ? 'اضافی ضروریات یا سوال' : 'Message / Questions'}
                        </label>
                        <textarea
                          rows={3}
                          value={inquiryForm.message}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                          className={`w-full p-3 bg-slate-900 border border-white/15 rounded-xl text-white outline-none focus:border-brand-500 transition resize-none ${isUrdu ? 'text-right' : ''}`}
                          placeholder={isUrdu ? 'روانگی کا شہر، ہوٹل کیٹیگری یا دیگر تفصیلات...' : 'Pickup city, preferred date, hotel category, etc.'}
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
                      >
                        <Send size={18} />
                        <span>{isUrdu ? "واٹس ایپ پر کوٹیشن حاصل کریں" : "Send Inquiry via WhatsApp"}</span>
                      </button>
                    </form>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RightSideFloatingHub;
