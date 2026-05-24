import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, X, Send, Award, Compass, Sparkles, 
  Layers, Map, ChevronRight, CheckCircle, Info, Landmark, HelpCircle, 
  Trees as TreesIcon, Mountain, ShieldCheck, Sun, Compass as CompassIcon
} from 'lucide-react';
import { Language } from '../types';

interface RegionalToursProps {
  lang: Language;
}

interface RegionData {
  id: string;
  nameEn: string;
  nameUr: string;
  emoji: string;
  tagEn: string;
  tagUr: string;
  highlightEn: string;
  highlightUr: string;
  spotsEn: string[];
  spotsUr: string[];
  descEn: string;
  descUr: string;
  image: string;
  color: string;
  badgeColor: string;
  itineraryEn: string[];
  itineraryUr: string[];
  inclusionsEn: string[];
  inclusionsUr: string[];
}

export const REGIONS: RegionData[] = [
  {
    id: "gb",
    nameEn: "Gilgit-Baltistan",
    nameUr: "گلگت بلتستان",
    emoji: "🏔️",
    tagEn: "K2 & Peak Adventures",
    tagUr: "کے ٹو اور فلک بوس چوٹیاں",
    highlightEn: "Home to some of the world’s tallest mountain peaks including the mighty K2.",
    highlightUr: "کے ٹو سمیت دنیا کے چند بلند ترین پہاڑوں کا مسکن۔",
    spotsEn: ["Hunza Valley", "Skardu", "Fairy Meadows", "Khunjerab Pass", "Attabad Lake"],
    spotsUr: ["وادی ہنزہ", "سکردو", "فیری میڈوز", "دروازہ چین (خنجراب پاس)", "عطا آباد جھیل"],
    descEn: "Gilgit-Baltistan is an adventurous playground defined by roaring glacial rivers, towering granite spires, and legendary high-altitude meadows. It boasts five of the world's fourteen 'eight-thousanders' valleys. The spectacular Karakoram Highway winds through ancient cultures, emerald-green orchards, and crystal-clear high-alpine lakes, creating an experience of majestic grandeur.",
    descUr: "گلگت بلتستان ایک مہم جوئی کا مرکز ہے جس کی تعریف ابلتے گلیشیائی دریا، عظیم الشان گرینائٹ چوٹیاں اور افسانوی بلند ترین چراگاہیں کرتی ہیں۔ اس خطے میں دنیا کے چودہ بلند ترین پہاڑوں میں سے پانچ پہاڑ پائے جاتے ہیں۔ شاہراہ قراقرم قدیم ثقافتوں، سرسبز باغات اور شفاف جھیلوں سے ہوتی ہوئی گزرتی ہے جو عظمت اور سکون کا جادوئی احساس دلاتی ہے۔",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCASpap2OIwRvtBjvMNILXOnvqzrGAHyb4HnLWfK5u-2ntvnDtRxcFMzG83GY3CwZPlreczK556VPd0EWLCFMY0IKrt_YIUvauTsf-MXs1XblyqtidfZT4xwIKs_8Lo-tkDYLcVAx81d9iveER_n1kiRAMEi8VZ08An2bbiRhhTZgzRA653lwO-U6ywuE/s320/image_5612.jpg",
    color: "from-sky-500 to-indigo-600",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    itineraryEn: [
      "Day 1: Departure from Multan via Islamabad, travel towards Chilas / Besham.",
      "Day 2: Continue journey along Karakoram Highway, spectacular view of Rakaposhi, check-in at Hunza.",
      "Day 3: Explore Altit Fort, Baltit Fort, and sunset at Eagle's Nest.",
      "Day 4: Day trip to Khunjerab Pass (Pak-China Border) & Attabad Lake boating.",
      "Day 5: Travel to Skardu / Lower Kachura Lake and Shangrila Resort.",
      "Day 6: Visit Shigar Cold Desert & return road trip.",
      "Day 7: Drive safely back to Multan via Karakoram Highway and Motorway."
    ],
    itineraryUr: [
      "دن 1: ملتان سے روانگی براستہ اسلام آباد، چلاس / بشام کا پُرسکون سفر۔",
      "دن 2: شاہراہِ قراقرم پر سفر کا تسلسل، راکاپوشی ویو پوائنٹ، ہنزہ آمد اور نائٹ سٹے۔",
      "دن 3: التیت فورٹ، بلتت فورٹ اور ایگلز نیسٹ پر خوبصورت غروبِ آفتاب کا نظارہ۔",
      "دن 4: عطا آباد جھیل کشتی رانی، حسینی پل اور پاک چین بارڈر (خنجراب پاس) کا دورہ۔",
      "دن 5: سکردو سفر، لوئر کچورا جھیل اور شنگریلا ریزورٹ کی سیر۔",
      "دن 6: شگر فورٹ، کولڈ ڈیزرٹ کا دورہ اور واپسی کا سفر۔",
      "دن 7: شاہراہِ قراقرم اور موٹروے کے راستے ملتان واپسی اور سفر کا اختتام۔"
    ],
    inclusionsEn: [
      "AC Saloon Coaster / Executive Grand Cabin Jeep departure from Multan",
      "Premium hotel rooms (dual/triple sharing)",
      "Daily breakfast (Halal & Fresh regional menu)",
      "Pro Tour Manager & local mountain guide",
      "All fuel, tolls, and secure mountain driver charges",
      "Jeep Safari to Cold Desert & Shigar validation"
    ],
    inclusionsUr: [
      "ملتان سے ایگزیکٹیو اے سی کوسٹر یا گرینڈ کیبن پریمیم گاڑی کا کرایہ",
      "آرام دہ اور معیاری فیملی ہوٹل کی رہائش (ڈبل/ٹریپل شیئرنگ)",
      "روزانہ صحت بخش اور تازہ ناشتہ",
      "ایک پیشہ ور ٹور مینیجر اور پُر اعتماد لوکل گائیڈ",
      "تمام ایندھن، ٹولز اور پہاڑی راستوں کے ماہر ڈرائیور کے اخراجات",
      "شگر کولڈ ڈیزرٹ کے لیے جیپ سفاری"
    ]
  },
  {
    id: "kpk",
    nameEn: "Khyber Pakhtunkhwa (KPK)",
    nameUr: "خیبر پختونخوا (کے پی کے)",
    emoji: "🌲",
    tagEn: "Alpine Forests & Fast Rivers",
    tagUr: "الپائن جنگلات اور بہتے دریا",
    highlightEn: "Blessed with exceptionally lush green valleys, rushing rivers, pine forests, and cool alpine weather.",
    highlightUr: "انتہائی سرسبز وادیوں، ابلتے دریاؤں، صنوبر کے جنگلات اور ٹھنڈے موسم سے مالا مال۔",
    spotsEn: ["Swat Valley", "Kalam Valley", "Naran", "Kaghan Valley", "Chitral"],
    spotsUr: ["وادی سوات", "وادی کالام", "ناران", "وادی کاغان", "چترال"],
    descEn: "Khyber Pakhtunkhwa's northern highlands offer an oasis of deep dark pine forests, roaring streams, and refreshing weather. Known as the 'Switzerland of the East', Swat Valley features high-altitude plains, snow-covered Kalam slopes, the magical Ushu Forest, and lakes like Mahodand and the legendary Saif-ul-Malook. It is an outstanding natural retreat of pure scenic serenity.",
    descUr: "خیبر پختونخوا کے شمالی پہاڑی علاقے گھنے صنوبر کے جنگلات، گرجتے ہوئے ندی نالوں اور پُرکشش خوشگوار موسم سے مالا مال ہیں۔ 'مشرق کا سوئٹزرلینڈ' کہلانے والی وادی سوات اپنے شاندار میدانوں، کالام کی برف پوش ڈھلوانوں، جادوئی اوشو فارسٹ اور مہوڈنڈ اور سیف الملوک جیسی خوبصورت جھیلوں کے لیے مشہور ہے۔",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXNfoOW8gkcMJT4oB8U9ek5VU99sbX8iN5Wexb90sxtida_FpqS5MKUeyMvyn29CQ0HPckkRVAcweYacBGuW6-AgKMiyEifswoBmrp17rS_6zZQcqCzPto3M1skyEW4EFpMTdUrKs-91Tv-ehgGdZw9vvoajqt0L58-PI3S60idcSSNmTBeuuPffrKph0/s320/Saif-ul-malook%20Lake.jpg",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    itineraryEn: [
      "Day 1: Departure from Pak-City Multan, travel via Swat Expressway to Mingora.",
      "Day 2: Day trip to Malam Jabba Ski Resort (chairlift, zipline) & proceed to Kalam.",
      "Day 3: 4x4 Jeep trip to Mahodand Lake, Ushu Forest, and Blue Water Kalam.",
      "Day 4: Travel from Swat to Naran Valley via Babusar Top, visit Kunhar River.",
      "Day 5: 4x4 Jeep safari to Saif-ul-Malook Lake under towering peaks.",
      "Day 6: Drive back via Hazara Motorway directly arriving safely in Multan."
    ],
    itineraryUr: [
      "دن 1: ملتان سے براستہ سوات ایکسپریس وے سفر، مینگورہ پہنچ کر ٹھہراؤ۔",
      "دن 2: مالم جبہ سکی ریزورٹ (چیئرلفٹ اور زپ لائن) کا دورہ اور کالام کوچ۔",
      "دن 3: 4x4 جیپ پر مہوڈنڈ جھیل، جادوئی اوشو جنگل اور بلو واٹر کالام کا سفر۔",
      "دن 4: کالام سے وادی ناران روانگی، شاندار درہ بابوسر اور دریائے کنہار کا دورہ۔",
      "دن 5: ناران کے بلند پہاڑوں میں گھری جادوئی سیف الملوک جھیل کی جیپ سفاری۔",
      "دن 6: ہزارہ موٹروے کے خوبصورت راستوں سے براہ راست ملتان واپسی۔"
    ],
    inclusionsEn: [
      "Dedicated luxury transport from Multan and back",
      "Family-friendly selected hotel rooms",
      "Traditional breakfasts at scenic locations",
      "Special 4x4 Jeep transfers for Saif-ul-Malook & Mahodand Lake",
      "First aid support, tour coordinators, and baggage facilitation"
    ],
    inclusionsUr: [
      "ملتان سے واپسی تک پریمیم لگژری ٹرانسپورٹ کی فراہمی",
      "خاندان کے لیے آرام دہ تفریحی ہوٹل کمرے",
      "خوبصورت مقامات پر تیار روایتی ناشتے",
      "سیف الملوک اور مہوڈنڈ جھیل کے لیے مخصوص ملٹری گریڈ 4x4 جیپ کا کرایہ",
      "فرسٹ ایڈ کٹ، ٹور کوآرڈینیٹر کی خدمات اور واٹر بوٹل"
    ]
  },
  {
    id: "kashmir",
    nameEn: "Azad Kashmir",
    nameUr: "آزاد کشمیر",
    emoji: "🌄",
    tagEn: "Paradise on Earth",
    tagUr: "زمین پر جنت کا ٹکڑا",
    highlightEn: "Famous for rolling hills, rich historic culture, alpine waterfalls, lakes, and highly scenic roads.",
    highlightUr: "خوبصورت پہاڑیوں، ثقافتی ندیوں، گرجتی آبشاروں اور جھیلوں کے لیے مشہور۔",
    spotsEn: ["Neelum Valley", "Muzaffarabad", "Arang Kel", "Rawalakot"],
    spotsUr: ["وادی نیلم", "مظفر آباد", "ارنگ کیل", "راولاکوٹ"],
    descEn: "Known around the world as the 'Paradise on Earth', Azad Kashmir possesses lush, velvety grass trails, roaring rivers, and scenic bridges under dramatic cloud cover. Neelum Valley is an emerald jewel presenting gorgeous locations like Sharda Historical Temple, the high meadows of Arang Kel (reached via a spectacular hike/chairlift), and the magical, cold waters of Keran.",
    descUr: "دنیا بھر میں 'زمین پر جنت' کہلانے والا آزاد کشمیر انتہائی سرسبز مخملی گھاس کے راستوں، چنگھاڑتے دریاؤں اور حسین بادلوں کے غلاف میں لپٹا ہوا ہے۔ وادی نیلم یہاں کا قیمتی موتی ہے جس میں شاردہ کا قدیم تاریخی مندر، ارنگ کیل کے خوبصورت ترین سرسبز میدان اور کیرن کے شفاف ٹھنڈے پانی شامل ہیں۔",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-eY2-_WBIYikkbdCGa275im9tUlVzNsLxCzerauLCLMpgglXIlNgTejECGhAamYnVfYB-99iosQOcQSRWS3l7eqfoeeoQFhYGQ1wZ2v_Evw59uTca64FtNw99cIvADIV0Vs3j07-Z-mJRRZ7iYSDuO1QlVM25uqZaBXpVPsSBU1qjdfOQGXkxoxNS9uE/s320/Kashmir.jpg",
    color: "from-amber-500 to-rose-600",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    itineraryEn: [
      "Day 1: Depart from Multan, travel via Motorway to Kohala suspension bridge & Muzaffarabad.",
      "Day 2: Morning visit to Pir Chinasi viewpoint, travel onwards along Neelum River to Keran.",
      "Day 3: Proceed to Kel, take local chairlift and minor hike to Arang Kel — the pearl of Kashmir.",
      "Day 4: Travel to historic Sharda ruins, explore Neelum Valley forest lines.",
      "Day 5: Check out from Sharda and travel to Muzaffarabad / Rawalakot.",
      "Day 6: Return journey to Multan via Murree Expressway and Motorway."
    ],
    itineraryUr: [
      "دن 1: ملتان سے روانگی، براستہ موٹروے کوہالہ پل، مظفر آباد آمد اور ہوٹل سٹے۔",
      "دن 2: پیر چناسی ویو پوائنٹ کی صبح سیر، Neelum River کے ساتھ ساتھ کیرن کا حسین سفر۔",
      "دن 3: کیل روانگی، لوکل چیئر لفٹ اور ارنگ کیل (کشمیر کا موتی) کی مخملی ہائیکنگ۔",
      "دن 4: تاریخی شاردہ یونیورسٹی اور کھنڈرات کا وزٹ، وادی نیلم کی سیر۔",
      "دن 5: شاردہ سے روانگی اور خوبصورت وادی راولاکوٹ کی طرف سفر۔",
      "دن 6: مری ایکسپریس وے اور موٹروے کے ذریعے ملتان واپسی اور یادگار سفر کا اختتام۔"
    ],
    inclusionsEn: [
      "Premium Coaster / Hiace Grand Cabin with seasoned drivers from Multan",
      "Riverside deluxe hotel rooms with panoramic balconies",
      "Delicious hot local morning meals",
      "Chairlift tickets at Kel and Arang Kel guide pass",
      "Bonfire night under stargazing mountain skies in Arang Kel"
    ],
    inclusionsUr: [
      "ملتان سے واپسی تک تجربہ کار پہاڑی ڈرائیورز اور پریمیم ہائی ایس یا کوسٹر",
      "دریائے نیلم کے کنارے خوبصورت ہوٹلوں کے بالکونی والے کمرے",
      "ہر صبح گرما گرم روایتی ناشتہ",
      "ارنگ کیل چیئر لفٹ کے ٹکٹ اور گائیڈ کی سہولت",
      "ارنگ کیل کے کھلے آسمان تلے تاروں کی چھاؤں میں جادوئی بون فائر نائٹ"
    ]
  }
];

const RegionalTours: React.FC<RegionalToursProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // State to manage Detail Page Modal
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  
  // State to manage Booking Form on the region detail
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    travelers: '2',
    notes: ''
  });

  const handleOpenDetail = (region: RegionData) => {
    setActiveRegion(region);
    setIsBookingMode(false);
    // Reset form data
    setFormData({
      name: '',
      phone: '',
      date: '',
      travelers: '2',
      notes: ''
    });
  };

  const handleCloseDetail = () => {
    setActiveRegion(null);
    setIsBookingMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRegion) return;

    const tourName = isUrdu ? activeRegion.nameUr : activeRegion.nameEn;
    const whatsAppText = 
      `*🌟 NEW REGIONAL EXPEDITION BOOKING (MULTAN DEPARTURE) 🌟*\n` +
      `----------------------------------------\n` +
      `*Region:* ${tourName} ${activeRegion.emoji}\n` +
      `*Starting Point:* Multan, Punjab 🇵🇰\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Contact Phone:* ${formData.phone}\n` +
      `*Departure Date:* ${formData.date}\n` +
      `*No of Travelers:* ${formData.travelers} Persons\n` +
      `*Custom Requests:* ${formData.notes || 'None Specified'}\n` +
      `----------------------------------------\n` +
      `_Inquiry sent via Safar-e-Parbat Portal_`;

    const encoded = encodeURIComponent(whatsAppText);
    const whatsappUrl = `https://wa.me/923334737025?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset states
    setIsBookingMode(false);
    setActiveRegion(null);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      
      {/* Absolute ambient decorations */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          
          {/* Multan Departure Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-bold text-xs md:text-sm mb-4 animate-pulse uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
            {isUrdu ? "🚌 ملتان سے خصوصی اور پریمیم روانگی" : "🚌 Premium Specialty Departures Directly From Multan"}
          </div>

          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu ? "خصوصی علاقائی ٹورزم گراؤنڈز" : "Explore Pakistan by Blessed Regions"}
          </h2>
          
          <p className={`text-base md:text-xl text-gray-600 ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu 
              ? "اب ہمارے ساتھ ملکت کے دل (ملتان) سے پاکستان کے سب سے قدرتی، برف پوش اور سرسبز علاقوں کی سیر کا آغاز کریں۔ بہترین رہائشی اور لگژری سفر۔" 
              : "Experience the majestic North with our tailored itineraries starting from Multan. Enjoy highly curated accommodation and smooth executive private/group transports."
            }
          </p>
        </div>

        {/* Fancy Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {REGIONS.map((region) => (
            <div 
              key={region.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              
              {/* Card Image Area with Zoom */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={region.image} 
                  alt={isUrdu ? region.nameUr : region.nameEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Region Emoji + Name overlay */}
                <div className={`absolute bottom-5 left-5 right-5 text-white ${isUrdu ? 'text-right' : ''}`}>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-2`}>
                    <span>{region.emoji}</span>
                    <span>{isUrdu ? region.tagUr : region.tagEn}</span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? region.nameUr : region.nameEn}
                  </h3>
                </div>

                {/* Multan Start Tag */}
                <span className={`absolute top-4 ${isUrdu ? 'left-4' : 'right-4'} bg-white text-brand-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md`}>
                  {isUrdu ? "روانگی ملتان" : "Start: Multan"}
                </span>
              </div>

              {/* Card Body content */}
              <div className={`p-6 flex-grow flex flex-col justify-between ${isUrdu ? 'text-right' : ''}`}>
                <div>
                  {/* Highlight */}
                  <p className={`text-sm md:text-base font-semibold text-brand-700 leading-relaxed mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? region.highlightUr : region.highlightEn}
                  </p>

                  <p className={`text-gray-500 text-xs md:text-sm line-clamp-3 leading-relaxed mb-6 ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? region.descUr : region.descEn}
                  </p>

                  {/* Famous Spots Pills */}
                  <div className="mb-6">
                    <p className={`text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5 ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? "مشہور سیاحتی مقامات:" : "Famous Tourist Spots:"}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                      {(isUrdu ? region.spotsUr : region.spotsEn).map((spot, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-xl font-medium transition cursor-default"
                        >
                          📍 {spot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleOpenDetail(region)}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-2xl text-sm font-bold transition hover:scale-[1.02] flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-md hover:shadow-lg"
                  >
                    <Info size={16} />
                    <span>{isUrdu ? "تفصیلات دیکھیں" : "See Details"}</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Detailed Overlay Modal / Detail Page */}
        {activeRegion && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center px-4 py-6 md:py-12 bg-gray-950/80 backdrop-blur-md">
            
            {/* Modal Card Structure */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
              
              {/* Close Button top-right */}
              <button 
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2.5 rounded-full transition-transform active:scale-90"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Scrollable Modal Container */}
              <div className="overflow-y-auto flex-1">
                
                {/* Region Image Banner */}
                <div className="relative h-60 md:h-80 w-full">
                  <img 
                    src={activeRegion.image} 
                    alt={isUrdu ? activeRegion.nameUr : activeRegion.nameEn} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  
                  {/* Banner Title */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                    <div className="inline-flex items-center gap-1 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wide">
                      <CompassIcon size={12} />
                      {isUrdu ? "خصوصی ایکسپڈیشن" : "Special Multan Departure Expedition"}
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-black ${isUrdu ? 'font-urdu' : ''}`}>
                      {isUrdu ? activeRegion.nameUr : activeRegion.nameEn} {activeRegion.emoji}
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base font-medium mt-1">
                      {isUrdu ? "روانگی کا مقام: ملتان، پنجاب 🇵🇰" : "All Tours Start from Multan"}
                    </p>
                  </div>
                </div>

                {/* Sub-Header Tabs (Details vs Book Form) */}
                <div className="border-b border-gray-100 flex p-2 bg-gray-50">
                  <button 
                    onClick={() => setIsBookingMode(false)}
                    className={`flex-1 py-3 text-center rounded-xl font-bold text-sm md:text-base transition ${!isBookingMode ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    🔍 {isUrdu ? "مکمل معلومات" : "Full Information"}
                  </button>
                  <button 
                    onClick={() => setIsBookingMode(true)}
                    className={`flex-1 py-3 text-center rounded-xl font-bold text-sm md:text-base transition ${isBookingMode ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    📅 {isUrdu ? "ملتان سے بکنگ ونڈو" : "Multan Booking Window"}
                  </button>
                </div>

                {/* Page Content Render */}
                <div className="p-6 md:p-8">
                  
                  {!isBookingMode ? (
                    /* Detailed Page Overview */
                    <div className={`space-y-8 ${isUrdu ? 'text-right' : 'text-left'}`}>
                      
                      {/* Description Card */}
                      <div className="space-y-3">
                        <h4 className={`text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Sparkles className="text-brand-500" size={20} />
                          <span>{isUrdu ? "ایک نظر میں:" : "Overview & Background:"}</span>
                        </h4>
                        <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
                          {isUrdu ? activeRegion.descUr : activeRegion.descEn}
                        </p>
                      </div>

                      {/* Info callout on Starts from Multan */}
                      <div className="p-4 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl flex items-start gap-3">
                        <Award className="text-brand-600 flex-shrink-0 mt-0.5" size={22} />
                        <div>
                          <p className={`font-bold text-brand-900 ${isUrdu ? 'font-urdu' : ''}`}>
                            {isUrdu ? "ملتان سے خصوصی روانگی کی اہمیت" : "Special Multan Departure Advantage"}
                          </p>
                          <p className={`text-sm text-brand-800 mt-1 ${isUrdu ? 'font-urdu' : ''}`}>
                            {isUrdu 
                              ? "یہ منفرد ٹور صرف ملتان کے شہریوں کے لیے ڈیزائن کیا گیا ہے۔ سفر کا آغاز براہِ راست ملتان سے ہوتا ہے، جس سے مسافروں کو کسی دوسری شہر خوار ہو کر ٹور جوائن کرنے کی ضرورت نہیں پڑتی۔" 
                              : "This tour departs directly from Multan. No need to manage your own travel to Lahore or Islamabad first—enjoy complete door-to-door comfort."
                            }
                          </p>
                        </div>
                      </div>

                      {/* Famous Spots */}
                      <div className="space-y-4">
                        <h4 className={`text-xl font-bold text-gray-950 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Map className="text-brand-500" size={18} />
                          <span>{isUrdu ? "معزز سیاحتی مقامات جو ہم وزٹ کریں گے:" : "Key Destinations Covered:"}</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(isUrdu ? activeRegion.spotsUr : activeRegion.spotsEn).map((spot, i) => (
                            <div 
                              key={i} 
                              className={`flex items-center gap-2.5 p-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition cursor-default ${isUrdu ? 'flex-row-reverse justify-start' : ''}`}
                            >
                              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">
                                {i + 1}
                              </span>
                              <span className="font-bold text-gray-800 text-base">{spot}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customized Standard Itinerary */}
                      <div className="space-y-4">
                        <h4 className={`text-xl font-bold text-gray-900 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="text-brand-500" size={18} />
                          <span>{isUrdu ? "مثالی سفری منصوبہ (ملتان سے ملتان):" : "Recommended Itinerary (Multan to Multan):"}</span>
                        </h4>
                        <div className="relative border-l border-gray-200 ml-4 space-y-6 pt-2">
                          {(isUrdu ? activeRegion.itineraryUr : activeRegion.itineraryEn).map((day, dIdx) => (
                            <div key={dIdx} className="relative pl-6">
                              {/* Timeline Point */}
                              <span className="absolute -left-2.5 top-1.5 flex h-5 w-5 rounded-full border-4 border-white bg-brand-600 shadow-sm"></span>
                              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition">
                                <span className="text-xs font-black uppercase text-brand-600 tracking-wider">
                                  {isUrdu ? `دن ${dIdx + 1}` : `Day ${dIdx + 1}`}
                                </span>
                                <p className="text-gray-800 text-sm md:text-base font-semibold mt-1 leading-relaxed">
                                  {day}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Premium Inclusions */}
                      <div className="space-y-4">
                        <h4 className={`text-xl font-bold text-gray-900 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <ShieldCheck className="text-brand-500" size={18} />
                          <span>{isUrdu ? "پیکیج میں شامل پریمیم سہولیات:" : "What's Included (Standard):"}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(isUrdu ? activeRegion.inclusionsUr : activeRegion.inclusionsEn).map((inc, i) => (
                            <div 
                              key={i} 
                              className={`flex items-start gap-2.5 p-3 rounded-xl border border-dashed border-gray-200 hover:border-brand-300 transition ${isUrdu ? 'flex-row-reverse justify-start' : ''}`}
                            >
                              <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={16} />
                              <span className="text-gray-700 text-xs md:text-sm font-semibold">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* Booking Form Mode (Go to book window) */
                    <form onSubmit={handleBookingSubmit} className={`space-y-6 max-w-xl mx-auto ${isUrdu ? 'text-right' : ''}`}>
                      
                      {/* Heading description */}
                      <div className="text-center mb-4">
                        <Landmark className="mx-auto text-brand-600 mb-2 animate-bounce" size={32} />
                        <h4 className="text-lg font-bold text-gray-900">
                          {isUrdu ? "روانگی ملتان - براہ راست واٹس ایپ بکنگ" : "Multan Departure Booking Form"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {isUrdu 
                            ? "توجہ فرمائیں، آپ ملتان سے روانہ ہونے والے ٹور کی بکنگ کر رہے ہیں۔ اپنی معلومات درج کریں، ہم آپ سے واٹس ایپ پر فوری رابطہ کریں گے۔"
                            : "Provide your required date & headcount. Submission seamlessly launches WhatsApp to finalize your booking directly."
                          }
                        </p>
                      </div>

                      {/* Location Badge Indicator */}
                      <div className="bg-gray-100 p-3.5 rounded-2xl flex items-center justify-between border border-gray-200">
                        <span className="text-xs font-semibold text-gray-500">{isUrdu ? "منتخب علاقہ:" : "Selected Region:"}</span>
                        <span className="text-sm font-black text-brand-800 flex items-center gap-1">
                          {isUrdu ? activeRegion.nameUr : activeRegion.nameEn} {activeRegion.emoji}
                        </span>
                      </div>

                      {/* Name input */}
                      <div>
                        <label className="block text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-2">
                          {isUrdu ? "آپ کا پورا نام:" : "Your Full Name:"} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-3 rounded-xl outline-none transition font-semibold text-gray-800 text-sm"
                          placeholder={isUrdu ? "مثال: علی حسن" : "e.g. Shahid Amin"}
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-2">
                          {isUrdu ? "واٹس ایپ یا رابطہ نمبر:" : "WhatsApp Phone Number:"} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-3 rounded-xl outline-none transition font-semibold text-gray-800 text-sm"
                          placeholder={isUrdu ? "مثال: 03331234567" : "e.g. 03001234567"}
                        />
                      </div>

                      {/* Preferred Date & Travelers row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-2">
                            {isUrdu ? "ترجیحی روانگی تاریخ:" : "Preferred Date:"} <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="date" 
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-3 rounded-xl outline-none transition font-semibold text-gray-800 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-2">
                            {isUrdu ? "مسافروں کی تعداد:" : "Number of Travelers:"} <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="number" 
                            name="travelers"
                            min="1"
                            max="50"
                            required
                            value={formData.travelers}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-3 rounded-xl outline-none transition font-semibold text-gray-800 text-sm"
                          />
                        </div>
                      </div>

                      {/* Notes / Requests */}
                      <div>
                        <label className="block text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-2">
                          {isUrdu ? "خصوصی پیغامات / تبدیلیوں کی فرمائش:" : "Custom Requests / Notes:"}
                        </label>
                        <textarea 
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-brand-500 focus:bg-white px-4 py-3 rounded-xl outline-none transition font-semibold text-gray-800 text-sm resize-none"
                          placeholder={isUrdu ? "مثال: ہمیں فیملی کے لیے الگ ہوٹل کمرہ چاہیے..." : "e.g. We need executive master rooms, or private jeep changes."}
                        />
                      </div>

                      {/* Submit action */}
                      <button 
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl shadow-lg transition hover:scale-[1.02] flex items-center justify-center gap-2.5"
                      >
                        <Send size={18} fill="currentColor" />
                        <span>{isUrdu ? "واٹس ایپ پر بکنگ بھیجیں" : "Send Booking via WhatsApp"}</span>
                      </button>

                    </form>
                  )}

                </div>

              </div>

              {/* Modal Footer (Call Actions) */}
              <div className="border-t border-gray-100 bg-gray-50 p-4 flex justify-between gap-4">
                <button 
                  onClick={handleCloseDetail}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-6 py-2.5 rounded-xl text-xs md:text-sm transition active:scale-95"
                >
                  {isUrdu ? "بند کریں" : "Close"}
                </button>
                
                {!isBookingMode && (
                  <button 
                    onClick={() => setIsBookingMode(true)}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-2.5 rounded-xl text-xs md:text-sm transition shadow-md hover:scale-105 active:scale-95"
                  >
                    🚀 {isUrdu ? "براہِ راست ملتان سے بک کریں" : "Proceed to Book"}
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default RegionalTours;
