
import { ContentText, TourPackage, Testimonial, TravelHistoryItem } from './types';

// API Configuration
export const JSONBIN_BIN_ID = "696603b143b1c97be92d2f6b";
export const JSONBIN_API_KEY = "$2a$10$/qi1Zoc8utnIY0RYjMNFru34QUTYbjaoJx5wozQy/Uinlo3zXVvnG";

// Images provided by user
export const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUK_9ZCdRlExTL1aNv63P2ncbFpEO60hL4XA&s";
export const HERO_BG = "https://images.squarespace-cdn.com/content/v1/5a815ad2e45a7c1f4ef40fb8/1532605992397-SQJ512NRWU905CM1VUUL/k2-banner.jpg";
export const CEO_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeSJQ0epExp8xGd1rEYug2-AeDoAgDsBNKCgNMDOSR9W8T0iCEWWiFtVPPR-mf15pk6IA2a0OoE13yCn9_LmY7vB2vEIaaUuDnO5UqCF4LCNoonHB3MAbnN_LK83kbAaKX4A3n7-KvoZO57Y9h9-KdWReHycQ_qk_NOpKSh1aR7YulhNqVePLwTdzFeJk/s320/Founder%20&%20CEO%20Shahid%20Amin%20Yasir.jpeg";

export const HERO_SLIDES = [
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXNfoOW8gkcMJT4oB8U9ek5VU99sbX8iN5Wexb90sxtida_FpqS5MKUeyMvyn29CQ0HPckkRVAcweYacBGuW6-AgKMiyEifswoBmrp17rS_6zZQcqCzPto3M1skyEW4EFpMTdUrKs-91Tv-ehgGdZw9vvoajqt0L58-PI3S60idcSSNmTBeuuPffrKph0/s320/Saif-ul-malook%20Lake.jpg",
    name: "Saif-ul-Malook Lake",
    accentColor: "text-cyan-300"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdPH7UOJkonW2Aqs9w-AQlmRZREmTLGchyphenhyphen5fFqoXwP8wEgjzhjUheQpg4Yq9fp6zQJxKdGMPTvB-PqBy5tE36pIAAvnUytGifDLrFxyhGiu6AhdJiM_bbJ1dE8DSxQ60t1D00Oic2lPhyphenhyphen_AxpHzdamniEU0H-Top1DdxXDuvypjPf6LphU7g61D9PKBms/s320/Derawar-Fort-Cholistan-Desert.jpg",
    name: "Darawar Fort",
    accentColor: "text-amber-500"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7HKpyAjiDZWe0noR-9fCSTDth_o4YW5-DM6KESUmSn5MGEVjk6zPJwEfBUi_gs8BlgdxVPVObIG8tsMdTymTW0RN0sD6kjdxNgAneoe_hKvrR5sF1yCE2gcVYVfkOv3XywiSoAkL0NAjJoBQLdnCa1UTPGhKaCPtEsx25LYzd5UNz0bKn5qgTuaq7HTw/s320/Sakurdu.jpg",
    name: "Shangrila Lake",
    accentColor: "text-emerald-400"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCASpap2OIwRvtBjvMNILXOnvqzrGAHyb4HnLWfK5u-2ntvnDtRxcFMzG83GY3CwZPlreczK556VPd0EWLCFMY0IKrt_YIUvauTsf-MXs1XblyqtidfZT4xwIKs_8Lo-tkDYLcVAx81d9iveER_n1kiRAMEi8VZ08An2bbiRhhTZgzRA653lwO-U6ywuE/s320/image_5612.jpg",
    name: "Gilgit Valley",
    accentColor: "text-orange-300"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-eY2-_WBIYikkbdCGa275im9tUlVzNsLxCzerauLCLMpgglXIlNgTejECGhAamYnVfYB-99iosQOcQSRWS3l7eqfoeeoQFhYGQ1wZ2v_Evw59uTca64FtNw99cIvADIV0Vs3j07-Z-mJRRZ7iYSDuO1QlVM25uqZaBXpVPsSBU1qjdfOQGXkxoxNS9uE/s320/Kashmir.jpg",
    name: "Kashmir Valley",
    accentColor: "text-green-300"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrauQtzBA2i1GDUdUdMYDQOkSVME6SXa57pKaitXHbL5Y-7C4M5p-Elws94gYYRjYrxNa3D4dKpHRKOCDNdLueZFZRW28m6lxAXLatpOe8SnIEx4NUtzU9u0_FUVHgB78dneRg1kt7I-VGsb87JnltiL3TqAXAZl3hNPUtIR2aFLiFYrb-z1pXGJeT04g/s320/Passu-Cones.webp",
    name: "Passu Cones",
    accentColor: "text-yellow-400"
  }
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1588824345504-8742f1a60e04?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1627895357710-4cb56c74d112?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1596328546171-77e37b5f8b2d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1608235287425-42f53d105234?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1631888257004-94e82e2124f6?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1604151774312-32a133b37902?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1000"
];

export const CONTENT: { en: ContentText; ur: ContentText } = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      packages: "Packages",
      gallery: "Gallery",
      contact: "Contact",
      bookNow: "Book Now",
      travelHistory: "Travel History"
    },
    hero: {
      title: "Safar-e-Parbat™",
      subtitle: "Join us on a quest to reveal the wonders of the natural world.",
      cta: "Explore Destinations"
    },
    about: {
      title: "Discover the North",
      desc: "Imagine the valleys of Hunza, Skardu, and Swat where the colors of nature touch your heart.",
      subDesc: "Every step brings the whispers of rivers, the fragrance in the breeze, and mountain heights that make time stand still."
    },
    aboutPage: {
      title: "Our Story",
      storyTitle: "Our Journey of Passion",
      storyText: "Our journey began with a deep passion for travel, nature, and the desire to reveal the hidden beauty of Pakistan to the world. What started as a dream soon became a mission to create unforgettable travel experiences filled with comfort, adventure, culture, and hospitality. At Safar-e-Parbat Travel & Tourism, we believe every journey should bring peace, joy, and meaningful memories. From the breathtaking mountains and valleys of Northern Pakistan to quality accommodation, delicious food, and professional travel services, we are committed to making every trip special and inspiring. Driven by passion and guided by trust, we continue to connect people with the beauty, culture, and natural wonders that Allah Almighty has blessed this land with.",
      missionTitle: "Our Mission",
      missionText: "At Safar-e-Parbat Travel & Tourism, our mission is to introduce the breathtaking beauty of Pakistan to travelers from all walks of life by providing safe, comfortable, and memorable travel experiences. We are dedicated to showcasing the stunning valleys, majestic mountains, rivers, lakes, and cultural treasures of Northern Pakistan while ensuring quality hospitality, comfortable accommodation, delicious food, and professional travel services throughout every journey. Our goal is to inspire people to explore the natural wonders that Allah Almighty has blessed this land with, while promoting peace, cultural appreciation, responsible tourism, and unforgettable adventures. Through passion, trust, and excellent service, we strive to make every trip a journey filled with comfort, discovery, and lifelong memories.",
      whyUsTitle: "Why Choose Us",
      whyUsPoints: [
        "Expert Local Guides",
        "Luxury & Comfortable Transport",
        "Customized Tour Plans",
        "24/7 Customer Support",
        "Authentic Cultural Experiences"
      ],
      ceo: {
        title: "Message from the CEO",
        name: "Shahid Amin Yasir",
        role: "Founder & CEO",
        message: "Welcome to Safar-e-Parbat Travel & Tourism — a journey inspired by the beauty of Allah’s creation and the rich cultural heritage of Pakistan. Pakistan is blessed with breathtaking mountains, peaceful valleys, crystal-clear lakes, and warm-hearted traditions that reflect both nature’s beauty and our cultural identity. Our mission is not only to provide travel services, but to help people explore, appreciate, and reconnect with the magnificent landscapes that Allah Almighty has gifted to this land. From the green valleys of Swat and Kalam to the majestic peaks of Hunza, Skardu, and Kashmir, we aim to create memorable, comfortable, and meaningful travel experiences for every traveler. At Safar-e-Parbat, we believe that travel is more than sightseeing — it is a way to discover peace, gratitude, culture, and the wonders of creation. We warmly welcome you to travel with us and experience the true beauty of Pakistan."
      }
    },
    features: {
      adventure: "Adventure Tours",
      cultural: "Cultural Tours",
      family: "Family Vacations"
    },
    testimonials: {
      title: "What Our Travelers Say",
      subtitle: "Real stories from those who have explored with us"
    },
    commentsSection: {
      title: "Traveller's Community",
      subtitle: "Share your thoughts and experiences with us live!",
      namePlaceholder: "Your Name",
      commentPlaceholder: "Share your experience...",
      submitBtn: "Post Comment",
      recentComments: "Recent Comments"
    },
    contact: {
      title: "Get in Touch",
      address: "Kabirwala, 58250",
      phone: "+92 333 4737025",
      email: "shahidaminyasir2@gmail.com",
      sendMessage: "Send us a Message",
      name: "Your Name",
      message: "Tell us about your dream trip...",
      submit: "Send Inquiry"
    },
    packageDetails: {
      overview: "Overview",
      itinerary: "Itinerary",
      inclusions: "What's Included",
      bookPackage: "Book This Package",
      notFound: "Package not found",
      modalTitle: "Booking Inquiry",
      modalDesc: "Please fill in the details below, and we will connect with you on WhatsApp to finalize your booking.",
      labelName: "Full Name",
      labelPhone: "Phone Number",
      labelDate: "Preferred Date",
      labelTravelers: "Number of Travelers",
      labelMessage: "Special Requests / Notes",
      submitBtn: "Send on WhatsApp"
    }
  },
  ur: {
    nav: {
      home: "ہوم",
      about: "ہمارے بارے میں",
      packages: "پیکیجز",
      gallery: "گیلری",
      contact: "رابطہ کریں",
      bookNow: "بکنگ کریں",
      travelHistory: "سفری تاریخ"
    },
    hero: {
      title: "سفر پربت™",
      subtitle: "قدرتی دنیا کے عجائبات کو ظاہر کرنے کے لیے ایک سفر پر ہمارے ساتھ شامل ہوں۔",
      cta: "مقامات دیکھیں"
    },
    about: {
      title: "شمال کی دریافت",
      desc: "Imagine کریں Hunza, Skardu اور Swat کی وادیاں جہاں قدرت کے رنگ آپ کے دل کو چھو جاتے ہیں۔",
      subDesc: "ہر قدم پر ندیوں کی سرگوشیاں، ہلکی ہوا میں بسے خوشبوؤں کا میلہ اور پہاڑوں کی بلندیاں آپ کو ایسے جہاں لے جاتی ہیں جہاں وقت ٹھہرتا محسوس ہوتا ہے۔"
    },
    aboutPage: {
      title: "ہماری کہانی",
      storyTitle: "جذبے کا سفر",
      storyText: "ہمارا سفر مہم جوئی، فطرت اور پاکستان کی پوشیدہ خوبصورتی کو دنیا کے سامنے لانے کے گہرے جذبے کے ساتھ شروع ہوا۔ جو ایک خواب کے طور پر شروع ہوا وہ جلد ہی ایک مشن بن گیا تاکہ آرام، مہم جوئی، ثقافت اور بہترین مہمان نوازی سے بھرپور ناقابل فراموش سفری تجربات تخلیق کیے جا سکیں۔ سفرِ پربت ٹریول اینڈ ٹورازم میں ہمارا ماننا ہے کہ ہر سفر اپنے ساتھ سکون، خوشی اور بامعنی یادیں لے کر آئے۔ شمالی پاکستان کے دلکش پہاڑوں اور وادیوں سے لے کر معیاری رہائش، لذیذ کھانوں اور پیشہ ورانہ سفری خدمات تک، ہم ہر سفر کو خاص اور متاثر کن بنانے کے لیے پرعزم ہیں۔ جذبے سے متحرک اور بھروسے کی رہنمائی میں، ہم لوگوں کو ان خوبصورت مناظر، ثقافت اور قدرتی عجائبات سے جوڑنا جاری رکھے ہوئے ہیں جن سے اللہ تعالیٰ نے اس پاک سرزمین کو نوازا ہے۔",
      missionTitle: "ہمارا مشن",
      missionText: "سفرِ پربت ٹریول اینڈ ٹورازم میں ہمارا مشن محفوظ، آرام دہ اور یادگار سفری تجربات فراہم کر کے زندگی کے تمام شعبوں سے تعلق رکھنے والے مسافروں کو پاکستان کی دلکش خوبصورتی سے روشناس کروانا ہے۔ ہم شمالی پاکستان کی شاندار وادیوں، عظیم الشان پہاڑوں، دریاؤں، جھیلوں اور ثقافتی خزانوں کو اجاگر کرنے کے لیے وقف ہیں جبکہ ہر سفر کے دوران معیاری مہمان نوازی، آرام دہ رہائش، لذیذ خوراک اور پیشہ ورانہ سفری خدمات کو یقینی بناتے ہیں۔ ہمارا مقصد لوگوں کو ان قدرتی عجائبات کی دریافت کے لیے متاثر کرنا ہے جن سے اللہ تعالیٰ نے اس سرزمین کو نوازا ہے، جبکہ امن، ثقافتی ستائش، ذمہ دارانہ سیاحت اور ناقابل فراموش مہم جوئی کو فروغ دینا ہے۔",
      whyUsTitle: "ہمیں کیوں منتخب کریں",
      whyUsPoints: [
        "ماہر مقامی گائیڈز",
        "پرتعیش اور آرام دہ ٹرانسپورٹ",
        "اپنی مرضی کے مطابق ٹور پلانز",
        "24/7 کسٹمر سپورٹ",
        "حقیقی ثقافتی تجربات"
      ],
      ceo: {
        title: "سی ای او کا پیغام",
        name: "شاہد امین یاسر",
        role: "بانی اور سی ای او",
        message: "سفرِ پربت ٹریول اینڈ ٹورازم میں خوش آمدید — یہ ایک ایسا سفر ہے جو اللہ تعالیٰ کی خوبصورت تخلیق اور پاکستان کے بھرپور ثقافتی ورثے سے متاثر ہے۔ پاکستان عظیم الشان پہاڑوں، پرسکون وادیوں، صاف شفاف جھیلوں اور زندہ دل روایات سے مالا مال ہے جو فطرت کی خوبصورتی اور ہماری ثقافتی شناخت کی عکاسی کرتی ہیں۔ ہمارا مشن نہ صرف سفری خدمات فراہم کرنا ہے بلکہ لوگوں کو ان عظیم الشان مناظر کو دریافت کرنے، سراہنے اور ان سے دوبارہ جڑنے میں مدد کرنا ہے جو اللہ تعالیٰ نے اس سرزمین کو عطا کیے ہیں۔ وادی سوات اور کالام سے لے کر ہنزہ، سکردو اور کشمیر کی عظیم الشان چوٹیوں تک، ہمارا مقصد ہر مسافر کے لیے یادگار، آرام دہ اور معنی خیز سفری تجربات فراہم کرنا ہے۔ سفرِ پربت میں ہم سمجھتے ہیں کہ سفر محض سیر و سیاحت سے بڑھ کر ہے — یہ سکون، شکر گزاری، ثقافت اور تخلیق کے عجائبات کو دریافت کرنے کا ایک ذریعہ ہے۔ ہم آپ کو دل کی گہرائیوں سے خوش آمدید کہتے ہیں کہ ہمارے ساتھ سفر کریں اور پاکستان کی اصل خوبصورتی کا تجربہ کریں۔"
      }
    },
    features: {
      adventure: "ایڈونچر ٹورز",
      cultural: "ثقافتی ٹورز",
      family: "فیملی تعطیلات"
    },
    testimonials: {
      title: "ہمارے مسافر کیا کہتے ہیں",
      subtitle: "ان لوگوں کی حقیقی کہانیاں جنہوں نے ہمارے ساتھ سفر کیا"
    },
    commentsSection: {
      title: "مسافروں کی کمیونٹی",
      subtitle: "اپنے خیالات اور تجربات ہمارے ساتھ شیئر کریں!",
      namePlaceholder: "آپ کا نام",
      commentPlaceholder: "اپنا تجربہ بیان کریں...",
      submitBtn: "تبصرہ بھیجیں",
      recentComments: "تازہ ترین تبصرے"
    },
    contact: {
      title: "ہم سے رابطہ کریں",
      address: "کبیروالہ، 58250",
      phone: "+92 333 4737025",
      email: "shahidaminyasir2@gmail.com",
      sendMessage: "ہمیں پیغام بھیجیں",
      name: "آپ کا نام",
      message: "اپنے خوابوں کے سفر کے بارے میں بتائیں...",
      submit: "پیغام بھیجیں"
    },
    packageDetails: {
      overview: "جائزہ",
      itinerary: "سفری منصوبہ",
      inclusions: "شامل سہولیات",
      bookPackage: "یہ پیکیج بک کریں",
      notFound: "پیکیج نہیں ملا",
      modalTitle: "بکنگ کی تفصیلات",
      modalDesc: "براہ کرم نیچے دی گئی تفصیلات پر کریں، اور ہم آپ کی بکنگ کو حتمی شکل دینے کے لیے واٹس ایپ پر آپ سے رابطہ کریں گے۔",
      labelName: "پورا نام",
      labelPhone: "فون نمبر",
      labelDate: "ترجیحی تاریخ",
      labelTravelers: "مسافروں کی تعداد",
      labelMessage: "خصوصی درخواست / نوٹ",
      submitBtn: "واٹس ایپ پر بھیجیں"
    }
  }
};

export const PACKAGES: TourPackage[] = [
  {
    id: "6",
    titleEn: "Gilgit to Khunjrab – The Journey to the Roof of the World",
    titleUr: "گلگت تا خنجراب - دنیا کی چھت کا سفر",
    locationEn: "Gilgit, Passu, Sost, Khunjerab Pass",
    locationUr: "گلگت، پاسو، سوست، خنجراب پاس",
    price: "PKR 35,000",
    durationEn: "4 Days / 3 Nights",
    durationUr: "4 دن / 3 راتیں",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyNrOnrlOzuAoh93MExA4axcXnF6LFb3yQJHk1A441OSJ7w0afX7YNJ9dNnczzkJdtj-Qx5Zae9e_J9_514WZRBoryo0OOeJm-fkGGUP_ITtzXlEhdk5es0sp4hayfW9ssoeXp2mlio2m9T02Wi4hcaNXprfRxMSP76-JnIKMUnxmOU1Vs7LbZzOhb6MU/s320/khunjerab%20pass.jpg",
    rating: 5,
    descriptionEn: "The journey from Gilgit towards Khunjerab Pass, the highest paved international border crossing in the world between Pakistan and China, is one of the most spectacular road trips in Northern Pakistan. This route along the legendary Karakoram Highway offers unmatched views of towering peaks, deep valleys, glaciers, and crystal-clear rivers. Along the way, key scenic stops include Nagar Valley, Hoper Glacier, Passu Cones, and the beautiful Hussaini Suspension Bridge. This route is not just a journey, but a once-in-a-lifetime adventure through some of the highest and most beautiful landscapes on Earth.",
    descriptionUr: "گلگت سے خنجراب پاس تک کا سفر، جو پاکستان اور چین کے درمیان دنیا کی بلند ترین پختہ بین الاقوامی سرحد ہے، شمالی پاکستان کی سب سے شاندار روڈ ٹرپس میں سے ایک ہے۔ شاہراہ قراقرم کے ساتھ یہ راستہ بلند چوٹیوں، وادیوں، گلیشیئرز اور شفاف دریاؤں کے بے مثال نظارے پیش کرتا ہے۔ راستے میں ناگر وادی، ہوپر گلیشیئر، پاسو کونس اور حسین معلق پل جیسے اہم مقامات شامل ہیں۔ یہ صرف ایک سفر نہیں، بلکہ زمین کے کچھ بلند ترین اور خوبصورت ترین مناظر کے درمیان زندگی بھر کا ایک ایڈونچر ہے۔",
    itineraryEn: [
      "Day 1: Arrival in Gilgit, local sightseeing.",
      "Day 2: Travel towards Passu, visit Hussaini Bridge and Passu Cones.",
      "Day 3: Journey to Khunjerab Pass via Sost, return to Gilgit.",
      "Day 4: Departure."
    ],
    itineraryUr: [
      "دن 1: گلگت آمد، مقامی سیر۔",
      "دن 2: پاسو کی طرف سفر، حسینی پل اور پاسو کونس کا دورہ۔",
      "دن 3: سوست کے راستے خنجراب پاس کا سفر، گلگت واپسی۔",
      "دن 4: روانگی۔"
    ],
    inclusionsEn: ["Transport", "Accommodation", "Breakfast & Dinner", "Tour Guide"],
    inclusionsUr: ["ٹرانسپورٹ", "رہائش", "ناشتہ اور رات کا کھانا", "ٹور گائیڈ"],
    dates: "Every Sunday"
  },
  {
    id: "1",
    titleEn: "Gilgit & Hunza - Crown of Karakoram",
    titleUr: "گلگت اور ہنزہ - قراقرم کا تاج",
    locationEn: "Gilgit & Hunza",
    locationUr: "گلگت اور ہنزہ",
    price: "PKR 45,000",
    durationEn: "5 Days / 4 Nights",
    durationUr: "5 دن / 4 راتیں",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJgN9NMk-G2VFGjDEcwzIEMwmiJRJAOmGKcZx4EgqIXs0XFxq68jIL358oRmVpVq_3v7wtAkDGM76PuV5uamuqrC3NZSiVohrcf5s3TX-yh5VKnZEMYaz_O-Lg4yBSCGs3kScyKKCwJcC8xzNaPbw2fdoHWvP8Xx2YOv1EatoSdRv6C6bqanuiMT7kMog/s320/Hunza-Valley.webp",
    rating: 5,
    descriptionEn: "Gilgit and Hunza are among the most mesmerizing regions of Northern Pakistan, known for their breathtaking mountain scenery, rich cultural heritage, and crystal-clear rivers. These valleys serve as a gateway to some of the world’s highest peaks and offer an unforgettable experience for nature lovers and adventure seekers. Hunza Valley is famous for its stunning locations such as Karimabad, Baltit Fort, Altit Fort, Eagle’s Nest (Duikar), Attabad Lake, and the dramatic Hussaini Suspension Bridge. Together, Gilgit and Hunza represent a perfect blend of natural grandeur, cultural richness, and spiritual tranquility.",
    descriptionUr: "گلگت اور ہنزہ شمالی پاکستان کے سب سے پرکشش علاقوں میں سے ہیں، جو اپنے دلکش پہاڑی مناظر، بھرپور ثقافتی ورثے اور شفاف دریاؤں کے لیے مشہور ہیں۔ یہ وادیاں دنیا کی بلند ترین چوٹیوں کے لیے ایک گیٹ وے کا کام کرتی ہیں۔ وادی ہنزہ کریم آباد، بلتت قلعہ، التیت قلعہ، ایگلز نیسٹ، عطا آباد جھیل اور حسینی معلق پل جیسے شاندار مقامات کے لیے مشہور ہے۔ مجموعی طور پر، گلگت اور ہنزہ قدرتی عظمت اور ثقافتی فراوانی کا ایک بہترین امتزاج پیش کرتے ہیں۔",
    itineraryEn: [
      "Day 1: Departure from Islamabad, travel to Chilas/Naran.",
      "Day 2: Travel to Hunza Valley via Babusar Top, visit Rakaposhi View Point.",
      "Day 3: Full day tour of Altit & Baltit Forts, Eagle's Nest sunset.",
      "Day 4: Visit Attabad Lake and Hussaini Suspension Bridge.",
      "Day 5: Return journey towards Islamabad."
    ],
    itineraryUr: [
      "دن 1: اسلام آباد سے روانگی، چلاس/ناران کا سفر۔",
      "دن 2: بابوسر ٹاپ کے راستے وادی ہنزہ کا سفر، راکاپوشی ویو پوائنٹ کا دورہ۔",
      "دن 3: بلتت اور التیت قلعہ جات کا پورا دن کا دورہ، ایگلز نیسٹ پر غروب آفتاب۔",
      "دن 4: عطا آباد جھیل اور حسینی معلق پل کا دورہ۔",
      "دن 5: اسلام آباد کی واپسی کا سفر۔"
    ],
    inclusionsEn: ["Luxury Transport", "Hotel Accommodation", "Breakfast & Dinner", "Tour Guide", "Jeep Safari"],
    inclusionsUr: ["پرتعیش ٹرانسپورٹ", "ہوٹل کی رہائش", "ناشتہ اور رات کا کھانا", "ٹور گائیڈ", "جیپ سفاری"],
    dates: "Every Friday"
  },
  {
    id: "2",
    titleEn: "Skardu - Gateway to Heaven",
    titleUr: "سکردو - جنت کا دروازہ",
    locationEn: "Skardu, Baltistan",
    locationUr: "سکردو، بلتستان",
    price: "PKR 35,000",
    durationEn: "6 Days / 5 Nights",
    durationUr: "6 دن / 5 راتیں",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7HKpyAjiDZWe0noR-9fCSTDth_o4YW5-DM6KESUmSn5MGEVjk6zPJwEfBUi_gs8BlgdxVPVObIG8tsMdTymTW0RN0sD6kjdxNgAneoe_hKvrR5sF1yCE2gcVYVfkOv3XywiSoAkL0NAjJoBQLdnCa1UTPGhKaCPtEsx25LYzd5UNz0bKn5qgTuaq7HTw/s320/Sakurdu.jpg",
    rating: 4.8,
    descriptionEn: "Skardu is one of the most breathtaking destinations in Northern Pakistan, often described as the gateway to some of the highest peaks in the world. The region is home to several iconic attractions, starting with Shangrila Resort and its famous Lower Kachura Lake, known for its unique beauty. The journey continues towards the majestic Deosai National Park, also known as the “Land of Giants,” which is one of the highest plateaus in the world. Skardu and its surrounding regions represent a heavenly landscape where nature reveals its purest form.",
    descriptionUr: "سکردو شمالی پاکستان کے سب سے زیادہ دلکش مقامات میں سے ایک ہے، جسے اکثر دنیا کی بلند ترین چوٹیوں کا گیٹ وے کہا جاتا ہے۔ یہ خطہ کئی مشہور پرکشش مقامات کا گھر ہے، جس کا آغاز شنگریلا ریزورٹ اور اس کی مشہور لوئر کچورا جھیل سے ہوتا ہے۔ یہ سفر دیوسائی نیشنل پارک کی طرف بڑھتا ہے، جسے 'دیوؤں کی سرزمین' بھی کہا جاتا ہے، جو دنیا کے بلند ترین سطح مرتفع میں سے ایک ہے۔ سکردو قدرت کی خالص ترین شکل پیش کرتا ہے۔",
    itineraryEn: [
      "Day 1: Arrival in Skardu, check-in at hotel.",
      "Day 2: Visit Shangrila Resort and Upper Kachura Lake.",
      "Day 3: Trip to Shigar Fort and Cold Desert.",
      "Day 4: Excursion to Deosai Plains (subject to weather).",
      "Day 5: Visit Manthoka Waterfall.",
      "Day 6: Shopping in Skardu Bazaar and local sightseeing.",
      "Day 7: Departure."
    ],
    itineraryUr: [
      "دن 1: سکردو آمد، ہوٹل میں چیک ان۔",
      "دن 2: شنگریلا ریزورٹ اور اپر کچورا جھیل کا دورہ۔",
      "دن 3: شگر قلعہ اور سرد صحرا کا سفر۔",
      "دن 4: دیوسائی میدانوں کی سیر (موسم کے مطابق)۔",
      "دن 5: منتوکھا آبشار کا دورہ۔",
      "دن 6: سکردو بازار میں خریداری اور مقامی سیر۔",
      "دن 7: روانگی۔"
    ],
    inclusionsEn: ["Transport (Prado/Land Cruiser)", "Hotel Stays", "2 Meals Daily", "Entry Tickets", "Bonfire Night"],
    inclusionsUr: ["ٹرانسپورٹ (پراڈو/لینڈ کروزر)", "ہوٹل کا قیام", "روزانہ 2 کھانے", "انٹری ٹکٹ", "بون فائر نائٹ"],
    dates: "Every Saturday"
  },
  {
    id: "4",
    titleEn: "Azad Kashmir - Paradise on Earth",
    titleUr: "آزاد کشمیر - زمین پر جنت",
    locationEn: "Neelum Valley, Kashmir",
    locationUr: "وادی نیلم، کشمیر",
    price: "PKR 38,000",
    durationEn: "5 Days / 4 Nights",
    durationUr: "5 دن / 4 راتیں",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-eY2-_WBIYikkbdCGa275im9tUlVzNsLxCzerauLCLMpgglXIlNgTejECGhAamYnVfYB-99iosQOcQSRWS3l7eqfoeeoQFhYGQ1wZ2v_Evw59uTca64FtNw99cIvADIV0Vs3j07-Z-mJRRZ7iYSDuO1QlVM25uqZaBXpVPsSBU1qjdfOQGXkxoxNS9uE/s320/Kashmir.jpg",
    rating: 4.9,
    descriptionEn: "Azad Kashmir is one of the most breathtaking and peaceful regions of Pakistan, famous for its lush green valleys, snow-covered mountains, crystal-clear rivers, and waterfalls. Often called the “Paradise on Earth,” Kashmir offers a perfect blend of natural beauty, culture, and serenity. Some of the most beautiful places include Muzaffarabad, Neelum Valley, Keran, Sharda, Arang Kel, Kel, Taobat, and Ratti Gali Lake. These destinations are known for their stunning landscapes and peaceful atmosphere.",
    descriptionUr: "آزاد کشمیر پاکستان کے سب سے خوبصورت اور پرامن خطوں میں سے ایک ہے، جو اپنی سرسبز وادیوں، برف پوش پہاڑوں، شفاف دریاؤں اور آبشاروں کے لیے مشہور ہے۔ اکثر 'زمین پر جنت' کہلانے والا کشمیر قدرتی خوبصورتی، ثقافت اور سکون کا ایک بہترین امتزاج پیش کرتا ہے۔ مشہور مقامات میں مظفر آباد، وادی نیلم، کیرن، شاردہ، ارنگ کیل اور رتی گلی جھیل شامل ہیں۔ یہ مقامات اپنے شاندار مناظر اور پرامن ماحول کے لیے جانے جاتے ہیں۔",
    itineraryEn: [
      "Day 1: Departure for Muzaffarabad, visit Pir Chinasi.",
      "Day 2: Travel to Keran and Sharda via Neelum Valley.",
      "Day 3: Visit Arang Kel, the pearl of Neelum Valley.",
      "Day 4: Trip to Kel and surrounding waterfalls.",
      "Day 5: Return to Islamabad."
    ],
    itineraryUr: [
      "دن 1: مظفر آباد کے لیے روانگی، پیر چناسی کا دورہ۔",
      "دن 2: وادی نیلم کے راستے کیرن اور شاردہ کا سفر۔",
      "دن 3: وادی نیلم کا موتی، ارنگ کیل کا دورہ۔",
      "دن 4: کیل اور قریبی آبشاروں کا سفر۔",
      "دن 5: اسلام آباد واپسی۔"
    ],
    inclusionsEn: ["Dedicated Transport", "Riverside Hotels", "Food & Guide", "Jeep for Kel"],
    inclusionsUr: ["مخصوص ٹرانسپورٹ", "دریائے کنارے ہوٹل", "کھانا اور گائیڈ", "کیل کے لیے جیپ"],
    dates: "Every Monday"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ahmed Khan",
    location: "Lahore",
    textEn: "Safar-e-Parbat organized an amazing trip to Hunza for my family. Everything was perfect, from hotels to transport.",
    textUr: "سفر پربت نے میرے خاندان کے لیے ہنزہ کا ایک شاندار سفر ترتیب دیا۔ ہوٹلوں سے لے کر ٹرانسپورٹ تک سب کچھ بہترین تھا۔",
    rating: 5
  },
  {
    id: "t2",
    name: "Sarah Williams",
    location: "UK",
    textEn: "The best way to see Pakistan! The guides were knowledgeable and friendly. Skardu was breathtaking.",
    textUr: "پاکستان دیکھنے کا بہترین طریقہ! گائیڈز علم والے اور دوستانہ تھے۔ سکردو بہت دلکش تھا۔",
    rating: 5
  },
  {
    id: "t3",
    name: "Usman Ali",
    location: "Karachi",
    textEn: "Highly recommended for adventure lovers. The jeep safari to Deosai was the highlight of our trip.",
    textUr: "ایڈونچر کے شوقین افراد کے لیے انتہائی سفارش کی جاتی ہے۔ دیوسائی کے لیے جیپ سفاری ہمارے سفر کی خاص بات تھی۔",
    rating: 4
  }
];

export const INITIAL_HISTORY: TravelHistoryItem[] = [
    {
        id: "h1",
        title: "Kashmir Group Tour 2024",
        date: "Jan 15, 2024",
        location: "Kashmir",
        description: "A wonderful winter expedition with 20 amazing travelers. We explored Arang Kel and Taobat.",
        images: [GALLERY_IMAGES[4], GALLERY_IMAGES[5]],
        visitors: [
            { name: "Ali Raza", details: "Lahore" },
            { name: "Sara Khan", details: "Karachi" },
            { name: "John Doe", details: "UK" }
        ]
    }
];
