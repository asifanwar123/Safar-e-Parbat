import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  lang?: Language;
}

const defaultDescriptionEn = "Safar-e-Parbat is Pakistan's premier registered travel & tourism agency offering curated tour packages to Kashmir, Hunza, Skardu, Swat, Gilgit, and the China Border (Khunjerab Pass) with luxury transport from Multan, Lahore, Islamabad, and nationwide.";
const defaultDescriptionUr = "سفرِ پربت پاکستان کی مستند رجسٹرڈ ٹریول اینڈ ٹورازم کمپنی ہے۔ کشمیر، ہنزہ، سکردو، سوات، گلگت اور پاک چین بارڈر (خنجراب پاس) کے لیے پرتعیش فیملی اور ہنی مون ٹور پیکیجز۔";

const defaultKeywordsEn = "Pakistan tour packages, Kashmir tours, China Border tour, Khunjerab Pass trip, Hunza valley tour, Skardu tour package, Swat valley tourism, Northern Pakistan tours, Malam Jabba Kalam, Neelum Valley Azad Kashmir, Safar-e-Parbat travel, Multan to northern areas, Lahore to Hunza, Islamabad to Skardu, Pakistan tourism company, family vacation packages Pakistan, customized tour operator Pakistan";
const defaultKeywordsUr = "پاکستان ٹور پیکیجز, کشمیر ٹور, پاک چین بارڈر ٹرپ, خنجراب پاس, ہنزہ ویلی ٹور, سکردو ٹور پیکیج, سوات ویلی ٹورز, شمالی علاقہ جات کی سیر, سفر پربت ٹریول, فیملی ٹور پیکیجز, ہنی مون ٹور پیکیج, ملتان سے ٹورز";

const defaultImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXNfoOW8gkcMJT4oB8U9ek5VU99sbX8iN5Wexb90sxtida_FpqS5MKUeyMvyn29CQ0HPckkRVAcweYacBGuW6-AgKMiyEifswoBmrp17rS_6zZQcqCzPto3M1skyEW4EFpMTdUrKs-91Tv-ehgGdZw9vvoajqt0L58-PI3S60idcSSNmTBeuuPffrKph0/s1600/Saif-ul-malook%20Lake.jpg";

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = defaultImage,
  ogType = 'website',
  lang = 'en'
}) => {
  const isUrdu = lang === 'ur';

  // Base title
  const siteName = isUrdu ? 'سفر پربت™ - ٹریول اینڈ ٹورازم' : 'Safar-e-Parbat™ | Pakistan Tourism';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Explore Hunza, Skardu, Gilgit & Northern Pakistan`;
  
  const metaDescription = description || (isUrdu ? defaultDescriptionUr : defaultDescriptionEn);
  const metaKeywords = keywords || (isUrdu ? defaultKeywordsUr : defaultKeywordsEn);

  // Compute canonical URL (fallback to current window origin if available)
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://safareparbat.com';
  const fullCanonical = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${currentOrigin}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
    : (typeof window !== 'undefined' ? window.location.href : 'https://safareparbat.com');

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <html lang={lang} dir={isUrdu ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Safar-e-Parbat Travel & Tourism (SMC Private) Limited" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:site_name" content="Safar-e-Parbat Travel & Tourism" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title || "Safar-e-Parbat Pakistan Tour"} />
      <meta property="og:locale" content={isUrdu ? 'ur_PK' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
