import { ContentText, TourPackage, Testimonial } from './types';

// Images provided by user
export const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUK_9ZCdRlExTL1aNv63P2ncbFpEO60hL4XA&s";
export const HERO_BG = "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/472095010_122156148068316046_9065231726440164483_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ha53_RpHOzMQ7kNvwFhMXJa&_nc_oc=AdnxpohmE0egaz2C_ZrK3NFbsxyJcNvmeXItOSGflUJL1HhKSJWxpf5daIPl1SSKf94&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=IkvU2gm6OaPXv5d91SnJcg&oh=00_AfqEfSPCkXL7Zd-yqFNvQOPaS6uDfsyGRe6LWRhSCRkvBw&oe=696836B9";
export const CEO_IMAGE = "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/474011630_595323836477441_8647772785241706978_n.jpg?_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=8Fguev1sTJwQ7kNvwHZqCkS&_nc_oc=AdnlQ-41Q7PLdP7AMCFfD7kqnb8T5Wssp5E0bowUQ89OXpKjy4WrRrJK2gDW-CfGDXU&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=k--UBOw_-5q--6_3UtWDZg&oh=00_Afr-wt3UIe65W8Nw9mQOJ6904BXRmj1B3lDFdngqy9w-zw&oe=69683EE8";

export const GALLERY_IMAGES = [
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/475483685_122161925906316046_6305929784421672905_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=102&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VBs2vLNFEvgQ7kNvwFhI0oA&_nc_oc=AdmKreUIBACQTo5-BH3czLHMj0F_tn_tV2Ry1DPpPHIzGeM9GjyYYIYxp98javHHaO8&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=r-QoTLbFnzBA52QOq1hoIw&oh=00_AfrqDgbEjNv8v7wJmniMyNKcHGno42fYcTt6gSaGJ9HucQ&oe=69683EB1",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/481147635_122166380360316046_3633805845469589342_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SA2M0IORkZgQ7kNvwHmjNRc&_nc_oc=AdlXOk--tUJ3s9rAEByKaM31WgC2ANOI6tesuyEdiji-m0eMAppYdd2nuJeC4rGUV74&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=hSW3EsfxLTxOSW2RBFWZ7w&oh=00_Afp96m61LHKKiEMC0Dxplbx17JsCvRMaybC3__yHg1N9ow&oe=69682EE4",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/482249452_122166379064316046_1386459374557290013_n.jpg?_nc_cat=109&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=l5i7UFq9IewQ7kNvwHnzn7O&_nc_oc=AdnvHTBQ4Ou2QuwhRULUqdFAn54XJGZkKVIki0SIo_iTyt7178IdT1OlG-osumqBwBM&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=fvV1YRxKby0PztCY3C6Hbg&oh=00_AfoRyZqyNx9IbekVaBRhK_98psyrTT49Wm3LM2bkW_IyBQ&oe=69684E06",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/481672349_122166378350316046_8922661500772643701_n.jpg?_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=umEMHLKcnCwQ7kNvwE5Y7qC&_nc_oc=AdlyFti-a5xkR-Zm5Yv3a3M_uAGtWdw3T1H2T63Yz5y1rP0zLEYA6f7OOEgsso18wh4&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=1UR2AvCcr4qoLBIJ8dBpOw&oh=00_AfqkVymN8FK0_p8m2k0ybPoZ2Bhd5PYSz5FuiXRXfU2VMg&oe=69683BF7",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/481257603_122166364682316046_9125290425199112704_n.jpg?_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=l6ipR5cVVc0Q7kNvwGRfQgM&_nc_oc=AdkEyKbXu3ZrJUmd4VOeyWDNiUP8HfAT6iwYFHYDfUWps4ogZoth15VRcfiydRbl9-4&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=bGH0GmnQUI0aRoR21h30qQ&oh=00_Afq-9FsPSG63LqZCN9tmj2RLpNWkC77BNUFubPZwMgqYWQ&oe=696833B1",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/481817388_122166364466316046_1480486249753464913_n.jpg?_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=w6MAPlF8ScwQ7kNvwHWtx8u&_nc_oc=AdlqlmTDDBx98yDlkXFba_rE38eJ2SBfH-SgPDOMu-FK0RYHI10OERseDDTmjuSrZy4&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=lAaJQy2nnlTrWekvQmC0DA&oh=00_AfonHzoiy7d9oewBubUiov32yPI-dOayQCD2J4WElDfV9g&oe=69682B46",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/475785177_122161744556316046_3581277801677100950_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=QnkXfJwwh-UQ7kNvwHlU5R8&_nc_oc=AdnVxk9UwKNXdXsXgJXJEfscMSTMLSuIZ4zWDCZTs6Rwf6TXf3fW-bBK7kpZj0NeJ1s&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=Dx8X3ZZigS7Cry-p9XKjuA&oh=00_AfpRvNPaNfSqMDbA74GoiqsWh5ARvbJP-aML0rchmG6EMg&oe=69682EA7",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/470165472_122153591900316046_3510436602937001174_n.jpg?_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9_rGkKaE5ssQ7kNvwEubbCK&_nc_oc=AdlRH4MV-ABBZycqbquOOEf2ZuWIQG51wI7v5I7yJ73XHT5_W-a67VJv1_5LbH9WeKE&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=kY_rMy4SQqqaG41oA720Gw&oh=00_Afo9akTWrou4YsEoqf2ydEl5CRJ6nxFLioTtTbVbFQRhYg&oe=69682D61",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/470216774_122153584544316046_584652288506114967_n.jpg?_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RZOgyxr83YsQ7kNvwF-oNop&_nc_oc=AdlkIlTRYkwtgus6A3Kf5C-Y5_fFObRpIYn5Fs9VDdNV4r6BFQ9X1YJDu_pCjmJRwp0&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=L8_ngniqYxc3eex1H25ivQ&oh=00_AfrQsf-piGyuc5Nywmve5NjVa_qPh5frc1Ss4fASZbGpQg&oe=69683FD5",
  "https://scontent.flhe6-1.fna.fbcdn.net/v/t39.30808-6/470151505_122153447678316046_5301262169935779526_n.jpg?_nc_cat=110&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4RA5n9aEsIoQ7kNvwFYTiNY&_nc_oc=AdnWAidjMOmsFO_KaTvt94n0GQeuPO3gR4tVCrGIaog8JWIvEqiw_u9jLEkBk9avklU&_nc_zt=23&_nc_ht=scontent.flhe6-1.fna&_nc_gid=4WbEoxIJFjFqYhCBx_xblw&oh=00_Afq2G6guBMA3Krc-0yY_THQjEEPetfM6Zofo6ZDw2WEEUA&oe=696845BD"
];

export const CONTENT: { en: ContentText; ur: ContentText } = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      packages: "Packages",
      gallery: "Gallery",
      contact: "Contact",
      bookNow: "Book Now"
    },
    hero: {
      title: "Safar-e-Parbat",
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
      storyTitle: "A Journey of Passion",
      storyText: "Safar-e-Parbat was born out of a deep love for the majestic landscapes of Northern Pakistan. We believe that travel is not just about visiting a place; it's about experiencing its soul. Our team consists of local experts who know every trail, every hidden valley, and every story that makes these mountains legendary.",
      missionTitle: "Our Mission",
      missionText: "To show the world the true beauty of Pakistan through sustainable and culturally immersive tourism, ensuring that every journey leaves a positive impact on both the traveler and the local communities.",
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
        message: "Pakistan is a land of hidden gems, and Safar-e-Parbat is my personal invitation to you to explore it. My vision is not just to take you to these places, but to connect you with the soul of the mountains. We strive to provide hospitality that feels like home, ensuring every moment of your journey is filled with wonder and comfort."
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
      bookNow: "بکنگ کریں"
    },
    hero: {
      title: "سفر پربت",
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
      storyText: "سفر پربت شمالی پاکستان کے شاندار مناظر سے گہری محبت کی وجہ سے وجود میں آیا۔ ہمارا ماننا ہے کہ سفر صرف کسی جگہ کا دورہ کرنا نہیں ہے؛ یہ اس کی روح کو محسوس کرنے کے بارے میں ہے۔ ہماری ٹیم مقامی ماہرین پر مشتمل ہے جو ہر راستے، ہر چھپی ہوئی وادی اور ہر اس کہانی کو جانتے ہیں جو ان پہاڑوں کو افسانوی بناتی ہے۔",
      missionTitle: "ہمارا مشن",
      missionText: "پائیدار اور ثقافتی سیاحت کے ذریعے دنیا کو پاکستان کی اصل خوبصورتی دکھانا، اس بات کو یقینی بنانا کہ ہر سفر مسافر اور مقامی برادریوں دونوں پر مثبت اثر چھوڑے۔",
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
        message: "پاکستان چھپے ہوئے خزانوں کی سرزمین ہے، اور سفر پربت آپ کو اسے دریافت کرنے کی میری ذاتی دعوت ہے۔ میرا وژن صرف آپ کو ان جگہوں پر لے جانا نہیں ہے، بلکہ آپ کو پہاڑوں کی روح سے جوڑنا ہے۔ ہم ایسی مہمان نوازی فراہم کرنے کی کوشش کرتے ہیں جو گھر جیسا محسوس ہو، اور اس بات کو یقینی بناتے ہیں کہ آپ کے سفر کا ہر لمحہ حیرت اور سکون سے بھرا ہو۔"
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
    id: "1",
    titleEn: "Hunza Valley Expedition",
    titleUr: "وادی ہنزہ کی مہم",
    locationEn: "Hunza, Gilgit-Baltistan",
    locationUr: "ہنزہ، گلگت بلتستان",
    price: "PKR 45,000",
    durationEn: "5 Days / 4 Nights",
    durationUr: "5 دن / 4 راتیں",
    image: GALLERY_IMAGES[3],
    rating: 5,
    descriptionEn: "Experience the magic of Hunza Valley, often referred to as heaven on earth. From the ancient Baltit Fort to the turquoise waters of Attabad Lake, this expedition takes you through the rich history and breathtaking landscapes of Gilgit-Baltistan. Enjoy local hospitality, delicious organic food, and views of Rakaposhi that will stay with you forever.",
    descriptionUr: "وادی ہنزہ کا جادو محسوس کریں جسے اکثر زمین پر جنت کہا جاتا ہے۔ قدیم بلتت قلعہ سے لے کر عطا آباد جھیل کے فیروزی پانیوں تک، یہ مہم آپ کو گلگت بلتستان کی بھرپور تاریخ اور دلکش مناظر کی سیر کراتی ہے۔ مقامی مہمان نوازی، لذیذ نامیاتی کھانوں، اور راکاپوشی کے نظاروں سے لطف اندوز ہوں جو ہمیشہ آپ کے ساتھ رہیں گے۔",
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
    inclusionsUr: ["پرتعیش ٹرانسپورٹ", "ہوٹل کی رہائش", "ناشتہ اور رات کا کھانا", "ٹور گائیڈ", "جیپ سفاری"]
  },
  {
    id: "2",
    titleEn: "Skardu & Shangrila Resort",
    titleUr: "سکردو اور شنگریلا ریزورٹ",
    locationEn: "Skardu",
    locationUr: "سکردو",
    price: "PKR 55,000",
    durationEn: "7 Days / 6 Nights",
    durationUr: "7 دن / 6 راتیں",
    image: GALLERY_IMAGES[1],
    rating: 4.8,
    descriptionEn: "Discover the rugged beauty of Skardu, gateway to the mighty K2. Visit the famous Shangrila Resort (Lower Kachura Lake), explore the Cold Desert of Katpana, and marvel at the Mantokha Waterfall. This tour blends adventure with serenity in the heart of the Karakoram.",
    descriptionUr: "سکردو کی خوبصورتی دریافت کریں، جو کے ٹو کا دروازہ ہے۔ مشہور شنگریلا ریزورٹ (لوئر کچورا جھیل) کا دورہ کریں، کٹپانہ کے سرد صحرا کو دیکھیں، اور منتوکھا آبشار کے نظارے کریں۔ یہ دورہ قراقرم کے دل میں ایڈونچر اور سکون کا امتزاج ہے۔",
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
    inclusionsUr: ["ٹرانسپورٹ (پراڈو/لینڈ کروزر)", "ہوٹل کا قیام", "روزانہ 2 کھانے", "انٹری ٹکٹ", "بون فائر نائٹ"]
  },
  {
    id: "3",
    titleEn: "Swat Valley - Switzerland of East",
    titleUr: "وادی سوات - مشرق کا سوئٹزرلینڈ",
    locationEn: "Swat, Kalam",
    locationUr: "سوات، کالام",
    price: "PKR 35,000",
    durationEn: "4 Days / 3 Nights",
    durationUr: "4 دن / 3 راتیں",
    image: GALLERY_IMAGES[6],
    rating: 4.9,
    descriptionEn: "Explore the lush green valleys of Swat. Known as the Switzerland of the East, Swat offers majestic views of Malam Jabba, the roaring rivers of Kalam, and the dense forests of Ushu. Perfect for families and nature lovers looking for a refreshing escape.",
    descriptionUr: "وادی سوات کی سرسبز وادیوں کی سیر کریں۔ مشرق کا سوئٹزرلینڈ کہلانے والا سوات مالم جبہ کے شاندار نظارے، کالام کے شور مچاتے دریا اور اوشو کے گھنے جنگلات پیش کرتا ہے۔ خاندانوں اور فطرت سے محبت کرنے والوں کے لیے ایک بہترین تفریح۔",
    itineraryEn: [
      "Day 1: Drive to Swat, visit White Palace Marghazar.",
      "Day 2: Day trip to Malam Jabba Ski Resort.",
      "Day 3: Travel to Kalam and Ushu Forest.",
      "Day 4: Visit Mahodand Lake and return.",
    ],
    itineraryUr: [
      "دن 1: سوات کا سفر، وائٹ پیلس مرغزار کا دورہ۔",
      "دن 2: مالم جبہ سکی ریزورٹ کا ایک دن کا سفر۔",
      "دن 3: کالام اور اوشو جنگل کا سفر۔",
      "دن 4: مہوڈنڈ جھیل کا دورہ اور واپسی۔",
    ],
    inclusionsEn: ["AC Coaster/Car", "Accommodation", "Breakfast", "Photography", "First Aid Kit"],
    inclusionsUr: ["اے سی کوسٹر/کار", "رہائش", "ناشتہ", "فوٹوگرافی", "فرسٹ ایڈ کٹ"]
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