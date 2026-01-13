

export type Language = 'en' | 'ur';

export interface TourPackage {
  id: string;
  titleEn: string;
  titleUr: string;
  locationEn: string;
  locationUr: string;
  price: string;
  durationEn: string;
  durationUr: string;
  image: string;
  rating: number;
  descriptionEn: string;
  descriptionUr: string;
  itineraryEn: string[];
  itineraryUr: string[];
  inclusionsEn: string[];
  inclusionsUr: string[];
  dates?: string; // For "Date, Time"
}

export interface Visitor {
  name: string;
  details: string; // e.g., "From Lahore"
}

export interface TravelHistoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  visitors: Visitor[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  textEn: string;
  textUr: string;
  rating: number;
}

export interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  avatarColor: string;
  rating: number;
}

export interface VisitorLog {
  id: string;
  location: string;
  date: string;
  time: string;
  device: string;
  browser: string;
  ip: string; // Used for identifying unique sessions, maybe hidden in UI
}

// Global Storage Structure
export interface CloudData {
  packages: TourPackage[];
  history: TravelHistoryItem[];
  comments: Comment[];
  visitorLogs: VisitorLog[];
}

export interface ContentText {
  nav: {
    home: string;
    about: string;
    packages: string;
    gallery: string;
    contact: string;
    bookNow: string;
    travelHistory: string; 
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    desc: string;
    subDesc: string;
  };
  aboutPage: {
    title: string;
    storyTitle: string;
    storyText: string;
    missionTitle: string;
    missionText: string;
    whyUsTitle: string;
    whyUsPoints: string[];
    ceo: {
      title: string;
      name: string;
      role: string;
      message: string;
    };
  };
  features: {
    adventure: string;
    cultural: string;
    family: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  commentsSection: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    commentPlaceholder: string;
    submitBtn: string;
    recentComments: string;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    sendMessage: string;
    name: string;
    message: string;
    submit: string;
  };
  packageDetails: {
    overview: string;
    itinerary: string;
    inclusions: string;
    bookPackage: string;
    notFound: string;
    modalTitle: string;
    modalDesc: string;
    labelName: string;
    labelPhone: string;
    labelDate: string;
    labelTravelers: string;
    labelMessage: string;
    submitBtn: string;
  }
}
