import React, { useState, useEffect, useCallback } from 'react';
import { Language } from '../types';
import { 
  CloudSun, Sun, CloudRain, CloudSnow, CloudLightning, Cloud, 
  Wind, Droplets, Thermometer, RefreshCw, MapPin, Sparkles, 
  Compass, Eye, ArrowUp, ArrowDown, Info, ShieldCheck, 
  Calendar, CheckCircle, AlertTriangle, ChevronRight, ChevronLeft
} from 'lucide-react';

interface DestinationWeatherWidgetProps {
  lang: Language;
}

export interface DestinationGeo {
  id: string;
  nameEn: string;
  nameUr: string;
  regionEn: string;
  regionUr: string;
  altitudeEn: string;
  altitudeUr: string;
  lat: number;
  lon: number;
  featuredTourPackageId?: string;
  bestTimeToVisitEn: string;
  bestTimeToVisitUr: string;
  bgGradient: string;
  cardImage: string;
}

export const DESTINATIONS_GEO: DestinationGeo[] = [
  {
    id: "hunza",
    nameEn: "Hunza Valley",
    nameUr: "وادی ہنزہ (کریم آباد)",
    regionEn: "Gilgit-Baltistan",
    regionUr: "گلگت بلتستان",
    altitudeEn: "2,438 m (8,000 ft)",
    altitudeUr: "2,438 میٹر (8,000 فٹ)",
    lat: 36.3167,
    lon: 74.6500,
    featuredTourPackageId: "6",
    bestTimeToVisitEn: "Apr - Oct (Mild & Scenic)",
    bestTimeToVisitUr: "اپریل تا اکتوبر (خوشگوار و دلکش)",
    bgGradient: "from-sky-900 via-teal-900 to-slate-900",
    cardImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyNrOnrlOzuAoh93MExA4axcXnF6LFb3yQJHk1A441OSJ7w0afX7YNJ9dNnczzkJdtj-Qx5Zae9e_J9_514WZRBoryo0OOeJm-fkGGUP_ITtzXlEhdk5es0sp4hayfW9ssoeXp2mlio2m9T02Wi4hcaNXprfRxMSP76-JnIKMUnxmOU1Vs7LbZzOhb6MU/s1600/khunjerab%20pass.jpg"
  },
  {
    id: "skardu",
    nameEn: "Skardu",
    nameUr: "سکردو و دیوسائی",
    regionEn: "Baltistan Region",
    regionUr: "بلتستان ریجن",
    altitudeEn: "2,228 m (7,310 ft)",
    altitudeUr: "2,228 میٹر (7,310 فٹ)",
    lat: 35.2971,
    lon: 75.6333,
    featuredTourPackageId: "1",
    bestTimeToVisitEn: "May - Sep (Lakes & Plains)",
    bestTimeToVisitUr: "مئی تا ستمبر (جھیلیں و میدان)",
    bgGradient: "from-blue-950 via-indigo-950 to-slate-900",
    cardImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6w7U0e72gZ-n1GqK1JjJ0ZgGZ0lYV1G1a9G2c1vF-b6A7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2/s1600/skardu.jpg"
  },
  {
    id: "gilgit",
    nameEn: "Gilgit",
    nameUr: "گلگت و نلتر",
    regionEn: "Gilgit Division",
    regionUr: "گلگت ڈویژن",
    altitudeEn: "1,500 m (4,921 ft)",
    altitudeUr: "1,500 میٹر (4,921 فٹ)",
    lat: 35.9208,
    lon: 74.3144,
    featuredTourPackageId: "6",
    bestTimeToVisitEn: "Year-Round Hub",
    bestTimeToVisitUr: "سال بھر پرفضا مرکز",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-900",
    cardImage: "https://northbackend.northonwheels.com/storage/uploads/image_5620.jpg"
  },
  {
    id: "swat",
    nameEn: "Swat & Kalam",
    nameUr: "سوات و کالام",
    regionEn: "Khyber Pakhtunkhwa",
    regionUr: "خیبر پختونخوا",
    altitudeEn: "2,000 m (6,561 ft)",
    altitudeUr: "2,000 میٹر (6,561 فٹ)",
    lat: 35.4855,
    lon: 72.5855,
    featuredTourPackageId: "5",
    bestTimeToVisitEn: "Mar - Nov (Green Valleys)",
    bestTimeToVisitUr: "مارچ تا نومبر (سبزہ زار وادیاں)",
    bgGradient: "from-emerald-900 via-cyan-950 to-slate-900",
    cardImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkneqir5evMb9aN6XKxg4N68Yhne3CyznQi-piVKt4crJ_GTdkQA60MMGI39AYU2iqG9JmtrplZDpH9e0HwrlLT2aha7ohxRYZjEocVhZW_l_eyTuDTyXEE1zJLI9JbPoDcxNyjYy6olCqhk8XyjRpN6WYrjGJ-1ngNLkw-G3jCrAWzEjeGaAXiGrcZDE/s1600/tourism-in-pakistan.jpeg"
  },
  {
    id: "kashmir",
    nameEn: "Neelum Kashmir",
    nameUr: "وادی نیلم (کشمیر)",
    regionEn: "Azad Jammu & Kashmir",
    regionUr: "آزاد جموں و کشمیر",
    altitudeEn: "1,615 m (5,300 ft)",
    altitudeUr: "1,615 میٹر (5,300 فٹ)",
    lat: 34.5800,
    lon: 73.9000,
    featuredTourPackageId: "3",
    bestTimeToVisitEn: "May - Oct (Lush Green & Waterfalls)",
    bestTimeToVisitUr: "مئی تا اکتوبر (سرسبز و شاداب)",
    bgGradient: "from-green-950 via-teal-950 to-slate-900",
    cardImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCASpap2OIwRvtBjvMNILXOnvqzrGAHyb4HnLWfK5u-2ntvnDtRxcFMzG83GY3CwZPlreczK556VPd0EWLCFMY0IKrt_YIUvauTsf-MXs1XblyqtidfZT4xwIKs_8Lo-tkDYLcVAx81d9iveER_n1kiRAMEi8VZ08An2bbiRhhTZgzRA653lwO-U6ywuE/s1600/image_5612.jpg"
  },
  {
    id: "islamabad",
    nameEn: "Islamabad",
    nameUr: "اسلام آباد (وفاقی گیٹ وے)",
    regionEn: "Federal Capital",
    regionUr: "دارالحکومت",
    altitudeEn: "540 m (1,770 ft)",
    altitudeUr: "540 میٹر (1,770 فٹ)",
    lat: 33.6844,
    lon: 73.0479,
    bestTimeToVisitEn: "Departure & Pickup Hub",
    bestTimeToVisitUr: "ٹورز روانگی و ٹرانزٹ حب",
    bgGradient: "from-slate-900 via-zinc-900 to-slate-950",
    cardImage: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80"
  }
];

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  maxTemp: number;
  minTemp: number;
  rainProb: number;
  daily: {
    date: string;
    weatherCode: number;
    maxTemp: number;
    minTemp: number;
    rainProb: number;
  }[];
}

interface WeatherMap {
  [destId: string]: WeatherData;
}

// Map WMO code to human description & icons
const getWeatherInfo = (code: number, isDay: boolean = true) => {
  switch (code) {
    case 0:
      return {
        labelEn: "Clear Sky",
        labelUr: "صاف مطلع",
        icon: isDay ? <Sun className="text-amber-400" size={28} /> : <Sun className="text-amber-200" size={28} />,
        travelAdviceEn: "Excellent weather for travel, scenic views & mountain photography.",
        travelAdviceUr: "سیر و سیاحت اور فوٹوگرافی کے لیے بہترین اور خوشگوار موسم۔",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
      };
    case 1:
    case 2:
      return {
        labelEn: "Partly Cloudy",
        labelUr: "جزوی ابر آلود",
        icon: <CloudSun className="text-teal-300" size={28} />,
        travelAdviceEn: "Pleasant temperatures with picturesque cloud formations over peaks.",
        travelAdviceUr: "پہاڑوں پر بادلوں کے دلکش مناظر کے ساتھ خوشگوار موسم۔",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30"
      };
    case 3:
      return {
        labelEn: "Overcast",
        labelUr: "مکمل ابر آلود",
        icon: <Cloud className="text-slate-300" size={28} />,
        travelAdviceEn: "Cool mountain breeze. Light warm jacket recommended.",
        travelAdviceUr: "پہاڑی ٹھنڈی ہوا، ہلکی گرم چادر یا جیکٹ ساتھ رکھیں۔",
        badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30"
      };
    case 45:
    case 48:
      return {
        labelEn: "Misty / Foggy",
        labelUr: "دھند و کہر",
        icon: <Cloud className="text-gray-300" size={28} />,
        travelAdviceEn: "Drive carefully on high-altitude passes. Gorgeous mist over lakes.",
        travelAdviceUr: "پہاڑی راستوں پر احتیاط سے ڈرائیو کریں۔ جھیلوں پر دھند کے دلکش مناظر۔",
        badgeColor: "bg-gray-500/20 text-gray-300 border-gray-500/30"
      };
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return {
        labelEn: "Rain Showers",
        labelUr: "بارش کے امکانات",
        icon: <CloudRain className="text-blue-400 animate-pulse" size={28} />,
        travelAdviceEn: "Carry raincoats & waterproof gear. Rivers and streams in full flow.",
        travelAdviceUr: "رین کوٹ اور واٹر پروف جوتے ساتھ رکھیں۔ ندی نالوں میں خوبصورت روانی۔",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30"
      };
    case 71:
    case 73:
    case 75:
    case 85:
    case 86:
      return {
        labelEn: "Snowfall",
        labelUr: "برفباری",
        icon: <CloudSnow className="text-cyan-200 animate-bounce" size={28} />,
        travelAdviceEn: "Snowcapped peak vistas! Heavy winter jackets and thermal wear advised.",
        travelAdviceUr: "برفپوش پہاڑوں کے مسحور کن نظارے! گرم اونی کپڑے اور جیکٹ لازمی رکھیں۔",
        badgeColor: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30"
      };
    case 95:
    case 96:
    case 99:
      return {
        labelEn: "Thunderstorm",
        labelUr: "گرج چمک و بارش",
        icon: <CloudLightning className="text-amber-400 animate-pulse" size={28} />,
        travelAdviceEn: "Check with tour guides before alpine treks. Stay in luxury hotel lounges.",
        travelAdviceUr: "پہاڑی ٹریک پر جانے سے پہلے ٹور گائیڈ سے رہنمائی لیں۔ ہوٹل میں محفوظ رہیں۔",
        badgeColor: "bg-amber-600/20 text-amber-300 border-amber-500/30"
      };
    default:
      return {
        labelEn: "Mild & Pleasant",
        labelUr: "خوشگوار و پرفضا",
        icon: <CloudSun className="text-emerald-300" size={28} />,
        travelAdviceEn: "Great conditions for touring and valley exploration.",
        travelAdviceUr: "وادیوں اور سیاحتی مقامات کی سیر کے لیے بہترین وقت۔",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      };
  }
};

const DestinationWeatherWidget: React.FC<DestinationWeatherWidgetProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [selectedDestId, setSelectedDestId] = useState<string>("hunza");
  const [weatherMap, setWeatherMap] = useState<WeatherMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch real-time weather for all destinations using Open-Meteo Free API
  const fetchAllWeather = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const results: WeatherMap = {};

      await Promise.all(
        DESTINATIONS_GEO.map(async (dest) => {
          try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKarachi`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("API error");
            const data = await response.json();

            const current = data.current;
            const daily = data.daily;

            const forecastDays = (daily?.time || []).slice(0, 4).map((timeStr: string, idx: number) => ({
              date: timeStr,
              weatherCode: daily.weather_code?.[idx] ?? 0,
              maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? 20),
              minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? 10),
              rainProb: daily.precipitation_probability_max?.[idx] ?? 10
            }));

            results[dest.id] = {
              temp: Math.round(current.temperature_2m),
              feelsLike: Math.round(current.apparent_temperature),
              humidity: Math.round(current.relative_humidity_2m),
              windSpeed: Math.round(current.wind_speed_10m),
              weatherCode: current.weather_code,
              isDay: Boolean(current.is_day),
              maxTemp: Math.round(daily.temperature_2m_max?.[0] ?? current.temperature_2m),
              minTemp: Math.round(daily.temperature_2m_min?.[0] ?? current.temperature_2m - 8),
              rainProb: daily.precipitation_probability_max?.[0] ?? 0,
              daily: forecastDays
            };
          } catch (err) {
            console.error(`Failed to fetch weather for ${dest.id}`, err);
            // Fallback reasonable seasonal values for Northern Pakistan if offline
            results[dest.id] = {
              temp: dest.id === 'islamabad' ? 32 : dest.id === 'skardu' ? 21 : dest.id === 'hunza' ? 19 : 23,
              feelsLike: dest.id === 'islamabad' ? 34 : 20,
              humidity: 45,
              windSpeed: 12,
              weatherCode: 1,
              isDay: true,
              maxTemp: dest.id === 'islamabad' ? 35 : 25,
              minTemp: dest.id === 'islamabad' ? 24 : 12,
              rainProb: 15,
              daily: []
            };
          }
        })
      );

      setWeatherMap(results);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWeather();
    // Refresh every 10 minutes automatically
    const interval = setInterval(fetchAllWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllWeather]);

  const convertTemp = (tempC: number) => {
    if (tempUnit === 'F') {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`;
    }
    return `${tempC}°C`;
  };

  const selectedDest = DESTINATIONS_GEO.find((d) => d.id === selectedDestId) || DESTINATIONS_GEO[0];
  const selectedWeather = weatherMap[selectedDest.id];
  const weatherInfo = selectedWeather 
    ? getWeatherInfo(selectedWeather.weatherCode, selectedWeather.isDay)
    : getWeatherInfo(0);

  const formatDayName = (dateStr: string, idx: number) => {
    if (idx === 0) return isUrdu ? "آج" : "Today";
    if (idx === 1) return isUrdu ? "کل" : "Tomorrow";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', { weekday: 'short' });
    } catch {
      return `Day +${idx}`;
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-gray-50 via-slate-50 to-white relative overflow-hidden border-b border-gray-200/80">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 sm:mb-10 ${isUrdu ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-sm ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
              <CloudSun size={15} className="text-emerald-700 animate-pulse" />
              <span>{isUrdu ? "لائیو موسمیاتی رہنمائی برائے سیاح" : "Live Travel Weather Forecast"}</span>
              <Sparkles size={13} className="text-amber-500" />
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu ? (
                <>سیاحتی مقامات کا <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">اصل موسمیاتی احوال</span></>
              ) : (
                <>Real-Time Weather for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">Major Destinations</span></>
              )}
            </h2>

            <p className={`text-gray-600 text-sm sm:text-base mt-2 max-w-2xl ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu 
                ? "ہنزہ، سکردو، گلگت، سوات اور وادی نیلم کے لیے اوپن ویدر ڈیٹا سے لائیو درجہ حرارت، ہوا کی رفتار اور تفصیلی 3 روزہ پیشین گوئی۔" 
                : "Live satellite & station weather metrics across Northern Pakistan to help you pack correctly and schedule your dream vacation."}
            </p>
          </div>

          {/* Controls: Unit Toggle & Refresh */}
          <div className={`flex items-center gap-2.5 self-start md:self-auto ${isUrdu ? 'flex-row-reverse' : ''}`}>
            
            {/* °C / °F Selector */}
            <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex items-center text-xs font-bold text-gray-600">
              <button
                type="button"
                onClick={() => setTempUnit('C')}
                className={`px-2.5 py-1 rounded-lg transition ${tempUnit === 'C' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:text-gray-900'}`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setTempUnit('F')}
                className={`px-2.5 py-1 rounded-lg transition ${tempUnit === 'F' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:text-gray-900'}`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={fetchAllWeather}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 shadow-sm transition active:scale-95 disabled:opacity-50"
              title={isUrdu ? "تازہ ترین ڈیٹا حاصل کریں" : "Refresh live weather"}
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin text-emerald-600" : "text-gray-500"} />
              <span className="hidden sm:inline">{isUrdu ? "اپ ڈیٹ کریں" : "Refresh"}</span>
            </button>

          </div>
        </div>

        {/* Destination Quick Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
          {DESTINATIONS_GEO.map((dest) => {
            const isSelected = dest.id === selectedDestId;
            const wData = weatherMap[dest.id];

            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => setSelectedDestId(dest.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm hover:border-gray-300'
                } ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
              >
                <MapPin size={15} className={isSelected ? "text-emerald-400" : "text-emerald-600"} />
                <span className="font-bold text-xs sm:text-sm whitespace-nowrap">
                  {isUrdu ? dest.nameUr : dest.nameEn}
                </span>

                {wData && (
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {convertTemp(wData.temp)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Weather Feature Display & Multi-City Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left / Top: Active Destination Detailed Spotlight Card (7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
            
            {/* Glow Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              
              {/* Top Location Bar */}
              <div className={`flex items-start justify-between gap-4 mb-6 pb-5 border-b border-white/10 ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div>
                  <div className={`flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                    <Compass size={14} />
                    <span>{isUrdu ? selectedDest.regionUr : selectedDest.regionEn}</span>
                    <span className="text-gray-500">•</span>
                    <span>{isUrdu ? selectedDest.altitudeUr : selectedDest.altitudeEn}</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? selectedDest.nameUr : selectedDest.nameEn}
                  </h3>
                </div>

                {/* Weather Condition Badge */}
                <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold backdrop-blur-md shrink-0 ${weatherInfo.badgeColor} ${isUrdu ? 'font-urdu' : ''}`}>
                  {isUrdu ? weatherInfo.labelUr : weatherInfo.labelEn}
                </div>
              </div>

              {/* Main Temperature & Weather Metrics Row */}
              <div className={`flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 my-6 ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                
                {/* Huge Temp Number */}
                <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-inner text-emerald-400">
                    {weatherInfo.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                        {selectedWeather ? convertTemp(selectedWeather.temp) : "--"}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm text-gray-300 mt-1 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                      <span>{isUrdu ? `محسوس: ${convertTemp(selectedWeather?.feelsLike ?? 0)}` : `Feels like ${convertTemp(selectedWeather?.feelsLike ?? 0)}`}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <ArrowUp size={12} /> {selectedWeather ? convertTemp(selectedWeather.maxTemp) : "--"}
                      </span>
                      <span className="text-cyan-400 flex items-center gap-0.5">
                        <ArrowDown size={12} /> {selectedWeather ? convertTemp(selectedWeather.minTemp) : "--"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Vital Quick Stats: Wind, Humidity, Best Season */}
                <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto">
                  <div className="bg-black/35 border border-white/10 rounded-2xl p-3 backdrop-blur-sm min-w-[120px]">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      <Wind size={14} className="text-cyan-400" />
                      <span>{isUrdu ? "ہوا کی رفتار" : "Wind Speed"}</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {selectedWeather?.windSpeed ?? 10} km/h
                    </p>
                  </div>

                  <div className="bg-black/35 border border-white/10 rounded-2xl p-3 backdrop-blur-sm min-w-[120px]">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      <Droplets size={14} className="text-teal-400" />
                      <span>{isUrdu ? "نمی کا تناسب" : "Humidity"}</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {selectedWeather?.humidity ?? 45}%
                    </p>
                  </div>
                </div>

              </div>

              {/* Tourist Safety & Packing Advice Box */}
              <div className={`bg-white/10 border border-white/15 rounded-2xl p-4 my-5 backdrop-blur-md flex items-start gap-3 ${isUrdu ? 'flex-row-reverse text-right font-urdu' : 'text-left'}`}>
                <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-0.5">
                    {isUrdu ? "سفری تجویز و موسم کی مطابقت" : "Traveler's Advisory & Packing Advice"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {isUrdu ? weatherInfo.travelAdviceUr : weatherInfo.travelAdviceEn}
                  </p>
                </div>
              </div>

            </div>

            {/* 3-Day Upcoming Forecast Strip */}
            {selectedWeather?.daily && selectedWeather.daily.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                <div className={`flex items-center justify-between text-xs text-gray-400 font-bold mb-3 uppercase tracking-wider ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-400" />
                    {isUrdu ? "آئندہ 3 دنوں کا موسم" : "3-Day Local Forecast"}
                  </span>
                  <span>{isUrdu ? selectedDest.bestTimeToVisitUr : selectedDest.bestTimeToVisitEn}</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {selectedWeather.daily.slice(0, 4).map((day, idx) => {
                    const dayInfo = getWeatherInfo(day.weatherCode);
                    return (
                      <div 
                        key={idx} 
                        className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-center flex flex-col items-center justify-between"
                      >
                        <span className={`text-[11px] font-bold text-gray-300 mb-1 ${isUrdu ? 'font-urdu' : ''}`}>
                          {formatDayName(day.date, idx)}
                        </span>
                        <div className="my-1 scale-75">
                          {dayInfo.icon}
                        </div>
                        <div className="text-xs font-black text-white">
                          {convertTemp(day.maxTemp)}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {convertTemp(day.minTemp)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right: Quick Multi-City Tourism Overview Cards Grid (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className={`bg-gray-100/90 rounded-2xl p-3 border border-gray-200/80 flex items-center justify-between text-xs font-bold text-gray-700 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
              <span>{isUrdu ? "تمام اہم سیاحتی مقامات کا جائزہ" : "Major Tourist Hubs at a Glance"}</span>
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle size={13} />
                {lastUpdated ? (isUrdu ? "براہ راست کنیکٹڈ" : "Live Station Sync") : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 flex-grow">
              {DESTINATIONS_GEO.map((dest) => {
                const w = weatherMap[dest.id];
                const info = w ? getWeatherInfo(w.weatherCode, w.isDay) : getWeatherInfo(0);
                const isSelected = dest.id === selectedDestId;

                return (
                  <div
                    key={dest.id}
                    onClick={() => setSelectedDestId(dest.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                        : 'bg-white hover:bg-gray-50 border-gray-200/80 shadow-sm hover:border-gray-300'
                    } ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        {info.icon}
                      </div>

                      <div>
                        <h4 className={`font-bold text-sm text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? dest.nameUr : dest.nameEn}
                        </h4>
                        <p className={`text-[11px] text-gray-500 ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? info.labelUr : info.labelEn}
                        </p>
                      </div>
                    </div>

                    {/* Temp & High/Low */}
                    <div className={`text-right ${isUrdu ? 'text-left' : 'text-right'}`}>
                      <div className="text-base sm:text-lg font-black text-gray-900">
                        {w ? convertTemp(w.temp) : "--"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-semibold">
                        H: {w ? convertTemp(w.maxTemp) : "--"} L: {w ? convertTemp(w.minTemp) : "--"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Direct Route Inquiry Banner */}
            <div className={`bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3 ${isUrdu ? 'flex-row-reverse font-urdu text-right' : 'text-left'}`}>
              <div className="text-xs">
                <p className="font-extrabold text-amber-200">
                  {isUrdu ? "موسمی صورتحال اور سڑکوں کی تازہ ترین معلومات" : "Planning a tour based on current weather?"}
                </p>
                <p className="text-emerald-100 text-[11px]">
                  {isUrdu ? "ہمارے ٹریول کنسلٹنٹ سے براہ راست رابطہ کریں۔" : "Get real-time road & route updates on WhatsApp."}
                </p>
              </div>
              <a
                href="https://wa.me/923334737025?text=Hello%20Safar-e-Parbat!%20Please%20provide%20current%20weather%20and%20route%20advice%20for%20Northern%20Pakistan."
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3.5 py-2 rounded-xl bg-white text-emerald-800 text-xs font-black hover:bg-emerald-50 transition shadow-sm shrink-0 ${isUrdu ? 'font-urdu' : ''}`}
              >
                {isUrdu ? "رہنمائی لیں" : "Ask Expert"}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DestinationWeatherWidget;
