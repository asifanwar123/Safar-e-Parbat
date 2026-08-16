import React from 'react';
import { Language } from '../types';
import { Shield, Eye, Lock, FileText, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

interface PrivacyPolicyProps {
  lang: Language;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // Local translations for the privacy policy to ensure pristine and detailed text
  const content = {
    en: {
      title: "Privacy Policy",
      subtitle: "Last updated: May 24, 2026",
      introTitle: "Our Commitment to Your Privacy",
      introText: "At Safar-e-Parbat, we are deeply committed to protecting your privacy and securing your personal information. This Privacy Policy describes how we collect, use, store, and share your personal data when you visit our website, use our contact forms, or book tour packages with us.",
      
      sections: [
        {
          icon: <Eye className="w-6 h-6 text-emerald-600" />,
          title: "1. Information We Collect",
          paragraphs: [
            "We collect personal information that you voluntarily provide to us when you express interest in obtaining information about us, customize your packages, or contact us.",
            "This information may include your name, phone number, email address, physical address, date of travel, and the number of travelers in your party."
          ]
        },
        {
          icon: <FileText className="w-6 h-6 text-emerald-600" />,
          title: "2. How We Use Your Information",
          paragraphs: [
            "We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, and compliance with our legal obligations.",
            "We use your data specifically to organize transport, book hotels, coordinate local tour guides, facilitate secure communications, and notify you about changes to your travel itineraries."
          ]
        },
        {
          icon: <Lock className="w-6 h-6 text-emerald-600" />,
          title: "3. Information Security and Retention",
          paragraphs: [
            "We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. Your data is kept confidentially behind secured networks.",
            "We only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law."
          ]
        },
        {
          icon: <Shield className="w-6 h-6 text-emerald-600" />,
          title: "4. Your Privacy Rights",
          paragraphs: [
            "You have rights that allow you to request access to and obtain a copy of your personal information, request rectification or erasure, or restrict the processing of your personal data.",
            "To make such a request, please contact us using the physical address, phone number, or email provided in our Contact Us page. We will consider and act upon any request in accordance with applicable data protection laws."
          ]
        }
      ],
      closing: "If you have questions or comments about this policy, you can contact us via email at shahidaminyasir2@gmail.com or phone at +92 333 4737025."
    },
    ur: {
      title: "پرائیویسی پالیسی",
      subtitle: "آخری تجدید: 24 مئی 2026",
      introTitle: "آپ کی پرائیویسی کے لیے ہمارا عزم",
      introText: "سفرِ پربت پر، ہم آپ کی پرائیویسی کی حفاظت اور آپ کی ذاتی معلومات کو محفوظ رکھنے کے لیے دل سے پرعزم ہیں۔ یہ پرائیویسی پالیسی اس بات کی وضاحت کرتی ہے کہ جب آپ ہماری ویب سائٹ پر آتے ہیں، معلوماتی فارم استعمال کرتے ہیں، یا ہمارے ساتھ سفری پیکیجز بک کرتے ہیں تو ہم آپ کا ڈیٹا کیسے اکٹھا، استعمال اور محفوظ کرتے ہیں۔",
      
      sections: [
        {
          icon: <Eye className="w-6 h-6 text-emerald-600" />,
          title: "1. معلومات جو ہم جمع کرتے ہیں",
          paragraphs: [
            "ہم وہ ذاتی معلومات جمع کرتے ہیں جو آپ رضاکارانہ طور پر ہمیں فراہم کرتے ہیں جب آپ ہمارے بارے میں معلومات حاصل کرنے، اپنے پیکیجز کو اپنی مرضی کے مطابق بنانے، یا ہم سے رابطہ کرنے میں دلچسپی کا اظہار کرتے ہیں۔",
            "ان معلومات میں آپ کا نام، فون نمبر، ای میل ایڈریس، مستقل پتہ، سفر کی تاریخ، اور آپ کے گروپ میں شامل مسافروں کی تعداد شامل ہو سکتی ہے۔"
          ]
        },
        {
          icon: <FileText className="w-6 h-6 text-emerald-600" />,
          title: "2. ہم آپ کی معلومات کا استعمال کیسے کرتے ہیں",
          paragraphs: [
            "ہم آپ کی معلومات کو کاروباری مقاصد، آپ کے ساتھ ہمارے معاہدے کی تکمیل، اور اپنے قانونی تقاضوں کی تعمیل کے لیے استعمال کرتے ہیں۔",
            "ہم آپ کے ڈیٹا کو خاص طور پر ٹرانسپورٹ کی فراہمی، ہوٹل بکنگ، مقامی ٹور گائیڈز کے ساتھ ہم آہنگی، محفوظ رابطے بڑھانے، اور سفری منصوبے میں تبدیلیوں کے بارے میں مطلع کرنے کے لیے استعمال کرتے ہیں۔"
          ]
        },
        {
          icon: <Lock className="w-6 h-6 text-emerald-600" />,
          title: "3. معلومات کی حفاظت اور برقرار رکھنا",
          paragraphs: [
            "ہم آپ کی ذاتی معلومات کی حفاظت کو یقینی بنانے کے لیے مناسب تیکنیکی اور تنظیمی حفاظتی اقدامات بروئے کار لاتے ہیں۔ آپ کا ڈیٹا محفوظ نیٹ ورکس کے پیچھے خفیہ رکھا جاتا ہے۔",
            "ہم آپ کی ذاتی معلومات کو صرف اس وقت تک محفوظ رکھتے ہیں جب تک کہ اس پالیسی میں بیان کردہ مقاصد کے لیے ضروری ہو، جب تک کہ قانون کے تحت طویل مدت درکار نہ ہو۔"
          ]
        },
        {
          icon: <Shield className="w-6 h-6 text-emerald-600" />,
          title: "4. آپ کے پرائیویسی حقوق",
          paragraphs: [
            "آپ کو یہ حق حاصل ہے کہ آپ اپنے ذاتی ڈیٹا تک رسائی کی درخواست کریں، اس کی نقل حاصل کریں، اس کی درستگی یا اسے حذف کرنے کا مطالبہ کریں، یا اس کے استعمال کو محدود کریں۔",
            "صلاحیت کے استعمال کی درخواست کرنے کے لیے، ہمارے رابطہ صفحے پر فراہم کردہ پتہ، فون نمبر یا ای میل کے ذریعے ہم سے رابطہ کریں۔ ہم قابلِ اطلاق قوانین کے مطابق آپ کی درخواست کا جائزہ لیں گے۔"
          ]
        }
      ],
      closing: "اگر آپ کے پاس اس پالیسی کے بارے میں کوئی سوالات یا تبصرے ہیں، تو آپ ہم سے shahidaminyasir2@gmail.com پر ای میل یا +92 333 4737025 پر فون کے ذریعے رابطہ کر سکتے ہیں۔"
    }
  };

  const t = content[lang];

  return (
    <div className="pt-16 md:pt-20 bg-gray-50 min-h-screen pb-16 md:pb-20">
      <SEO 
        title={isUrdu ? "پرائیویسی پالیسی - سفرِ پربت" : "Privacy Policy - Safar-e-Parbat"}
        description={isUrdu ? "سفرِ پربت ٹریول اینڈ ٹورازم کی پرائیویسی پالیسی اور ڈیٹا کے تحفظ سے متعلق قواعد۔" : "Learn how Safar-e-Parbat collects, protects, and handles personal data for tour bookings and user privacy."}
        canonicalUrl="/privacy"
        lang={lang}
      />
      
      {/* Banner */}
      <div className="bg-brand-900 text-white py-12 md:py-20 mb-8 md:mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Shield className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
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
          
          {/* Commitment Intro */}
          <div className={`mb-10 pb-8 border-b border-gray-100 ${isUrdu ? 'text-right' : ''}`}>
            <h2 className={`text-xl md:text-2xl font-bold text-brand-900 mb-4 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
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

export default PrivacyPolicy;
