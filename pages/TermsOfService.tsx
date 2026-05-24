import React from 'react';
import { Language } from '../types';
import { Scale, Compass, CheckCircle, HelpCircle, ShieldAlert } from 'lucide-react';

interface TermsOfServiceProps {
  lang: Language;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // Local translations for Terms of Service to ensure beautiful, rich content
  const content = {
    en: {
      title: "Terms of Service",
      subtitle: "Last updated: May 24, 2026",
      introTitle: "Agreement to Our Terms",
      introText: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Safar-e-Parbat, concerning your access to and use of our website as well as any booking services provided.",
      
      sections: [
        {
          icon: <Compass className="w-6 h-6 text-brand-600" />,
          title: "1. Tour Booking & Payments",
          paragraphs: [
            "All bookings are subject to availability and acceptance by Safar-e-Parbat. A booking is confirmed only when the deposit or full payment has been received and verified by our team.",
            "Prices listed on the website are subject to change due to seasonal rates, peak booking charges, and government taxes. We reserve the right to correct any pricing errors before confirmation."
          ]
        },
        {
          icon: <ShieldAlert className="w-6 h-6 text-brand-600" />,
          title: "2. Cancellations & Refund Policy",
          paragraphs: [
            "Cancellation requests must be submitted in writing or via our validated business channels. Refund eligibility is calculated based on how far in advance the cancellation is requested.",
            "Cancellations made 15 days or more prior to departure are eligible for a 75% refund. Cancellations made between 7 and 14 days prior to departure are eligible for a 50% refund. Cancellations made less than 7 days prior are non-refundable."
          ]
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-brand-600" />,
          title: "3. Travelers' Responsibility",
          paragraphs: [
            "Travelers are responsible for carrying valid national identity cards (CNIC), passports, visas, or mandatory health certificates required for travel within Pakistan.",
            "We expect all travelers to adhere to local cultural practices, environmental standards, and safety guidelines. Safar-e-Parbat reserves the right to terminate tour services for any passenger due to unruly or illicit behavior without refunds."
          ]
        },
        {
          icon: <Scale className="w-6 h-6 text-brand-600" />,
          title: "4. Limitation of Liability",
          paragraphs: [
            "While we strive to ensure a pristine travel experience, Safar-e-Parbat is not liable for itinerary changes, delays, cancellations, or damages caused by natural disasters, roadblocks, landslide events, extreme weather, political protests, or force majeure.",
            "Travelers participate in adventure tours, trekking, and jeep safaris at their own discretion and risk. Medical insurance is highly recommended."
          ]
        }
      ],
      closing: "For any queries, clarifications, or issues regarding these terms, please reach out to us at shahidaminyasir2@gmail.com."
    },
    ur: {
      title: "شرائط و ضوابط",
      subtitle: "آخری تجدید: 24 مئی 2026",
      introTitle: "ہماری شرائط سے اتفاق",
      introText: "یہ شرائط و ضوابط آپ (خواہ ذاتی طور پر یا کسی ادارے کی طرف سے) اور سفرِ پربت کے درمیان ایک قانونی طور پر پابند معاہدہ ہیں، جو ہماری ویب سائٹ تک آپ کے استعمال اور ہمارے ذریعے فراہم کردہ بکنگ سروسز سے متعلق ہیں۔",
      
      sections: [
        {
          icon: <Compass className="w-6 h-6 text-brand-600" />,
          title: "1. ٹور بکنگ اور ادائیگیاں",
          paragraphs: [
            "تمام بکنگز دستیابی اور سفرِ پربت کی قبولیت سے مشروط ہیں۔ بکنگ کی تصدیق ہماری ٹیم کی جانب سے پیشگی رقم یا مکمل ادائیگی موصول اور تصدیق ہونے کے بعد ہی کی جاتی ہے۔",
            "ویب سائٹ پر درج قیمتیں موسمی نرخوں، بکنگ میں تیزی کے چارجز اور حکومتی ٹیکسوں کی وجہ سے تبدیل ہو سکتی ہیں۔ ہم تصدیق سے پہلے قیمتوں کی کسی بھی غلطی کو درست کرنے کا حق محفوظ رکھتے ہیں۔"
          ]
        },
        {
          icon: <ShieldAlert className="w-6 h-6 text-brand-600" />,
          title: "2. منسوخی اور واپسی کی پالیسی",
          paragraphs: [
            "منسوخی کی درخواستیں تحریری طور پر یا ہمارے تصدیق شدہ کاروباری چینلز کے ذریعے جمع کرائی جانی چاہئیں۔ رقم کی واپسی کی اہلیت کا حساب اس بات سے لگایا جاتا ہے کہ روانگی سے کتنے دن پہلے درخواست دی گئی ہے۔",
            "روانگی سے 15 دن یا اس سے پہلے منسوخی کی صورت میں 75٪ رقم واپس کی جائے گی۔ روانگی سے 7 سے 14 دن پہلے منسوخی کی صورت میں 50٪ رقم واپس کی جائے گی۔ روانگی سے 7 دن سے کم وقت میں منسوخی کی صورت میں رقم واپس نہیں ہوگی۔"
          ]
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-brand-600" />,
          title: "3. مسافروں کی ذمہ داری",
          paragraphs: [
            "مسافر سفر کے دوران اپنے ہمراہ درست قومی شناختی کارڈ (CNIC)، پاسپورٹ، ویزا یا پاکستان کے اندر سفر کے لیے مطلوبہ لازمی ہیلتھ سرٹیفکیٹ رکھنے کے ذمہ دار ہیں۔",
            "ہم تمام مسافروں سے مقامی ثقافتی روایات، ماحولیاتی معیارات اور حفاظتی ہدایات پر عمل کرنے کی توقع کرتے ہیں۔ سفرِ پربت کسی بھی مسافر کے غیر اخلاقی یا غیر قانونی سلوک کی وجہ سے بغیر کسی واپسی کے خدمات منسوخ کرنے کا حق محفوظ رکھتا ہے۔"
          ]
        },
        {
          icon: <Scale className="w-6 h-6 text-brand-600" />,
          title: "4. ذمہ داری کی حد",
          paragraphs: [
            "اگرچہ ہم بہترین سفری تجربہ یقینی بنانے کی کوشش کرتے ہیں، تاہم سفرِ پربت قدرتی آفات، راستوں کی بندش، لینڈ سلائیڈنگ، شدید موسم، سیاسی احتجاج یا ہنگامی حالات کی وجہ سے سفری منصوبے میں تبدیلیوں، تاخیر، منسوخی یا نقصانات کا ذمہ دار نہیں ہے۔",
            "مسافر ایڈونچر ٹورز، ٹریکنگ اور جیپ سفاریوں میں اپنے خطرے اور صوابدید پر حصہ لیتے ہیں۔ سفر سے قبل طبی بیمہ کرانے کی بھرپور سفارش کی جاتی ہے۔"
          ]
        }
      ],
      closing: "ان شرائط کے بارے میں کسی بھی قسم کے سوالات، وضاحت یا مسائل کے لیے، براہ کرم ہم سے shahidaminyasir2@gmail.com پر رابطہ کریں۔"
    }
  };

  const t = content[lang];

  return (
    <div className="pt-16 md:pt-20 bg-gray-50 min-h-screen pb-16 md:pb-20">
      
      {/* Banner */}
      <div className="bg-brand-900 text-white py-12 md:py-20 mb-8 md:mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Scale className="w-12 h-12 md:w-16 md:h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
          <h1 className={`text-3xl md:text-5xl font-bold mb-3 ${isUrdu ? 'font-urdu' : ''}`}>
            {t.title}
          </h1>
          <p className="text-brand-200 text-sm md:text-base font-mono">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100">
          
          {/* Intro Section */}
          <div className={`mb-10 pb-8 border-b border-gray-100 ${isUrdu ? 'text-right' : ''}`}>
            <h2 className={`text-xl md:text-2xl font-bold text-brand-900 mb-4 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
              <HelpCircle className="w-6 h-6 text-brand-500 flex-shrink-0" />
              <span>{t.introTitle}</span>
            </h2>
            <p className={`text-gray-600 leading-relaxed text-base md:text-lg ${isUrdu ? 'font-urdu' : ''}`}>
              {t.introText}
            </p>
          </div>

          {/* Core Sections */}
          <div className="space-y-10">
            {t.sections.map((sec, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors duration-300 ${isUrdu ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-3 mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-white p-2.5 rounded-xl shadow-md border border-gray-100">
                    {sec.icon}
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold text-gray-900 ${isUrdu ? 'font-urdu' : ''}`}>
                    {sec.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className={`text-gray-600 leading-relaxed text-sm md:text-base ${isUrdu ? 'font-urdu' : ''}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Closing Support */}
          <div className={`mt-12 pt-8 border-t border-gray-100 text-center ${isUrdu ? 'text-right md:text-center' : ''}`}>
            <p className={`text-sm md:text-base text-gray-500 leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
              {t.closing}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
