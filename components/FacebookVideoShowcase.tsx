import React from 'react';
import { Language } from '../types';
import { Facebook, Play, ExternalLink, Sparkles, Video } from 'lucide-react';

interface FacebookVideoShowcaseProps {
  lang: Language;
  className?: string;
}

export const FacebookVideoShowcase: React.FC<FacebookVideoShowcaseProps> = ({ lang, className = '' }) => {
  const isUrdu = lang === 'ur';

  const reelUrl = "https://www.facebook.com/reel/2197663477743752/";
  const iframeSrc = "https://www.facebook.com/plugins/video.php?height=315&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2197663477743752%2F&show_text=false&width=560&t=0";

  return (
    <section className={`py-14 md:py-20 bg-gradient-to-b from-gray-900 via-brand-950 to-gray-900 text-white relative overflow-hidden ${className}`}>
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs md:text-sm font-semibold mb-4 backdrop-blur-md">
            <Facebook size={16} className="text-blue-400" />
            <span>{isUrdu ? 'فیس بک ویڈیوز اور ریلز' : 'Facebook Video Views & Reels'}</span>
            <Sparkles size={14} className="text-amber-400" />
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu ? (
              <>سفرِ پربت کی <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-300">ویڈیو جھلکیاں</span></>
            ) : (
              <>Facebook <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-300">Video Views</span> & Highlights</>
            )}
          </h2>

          <p className={`text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu
              ? 'ہمارے پرتعیش ٹورز، قدرتی مناظر، اور مسافروں کے خوشگوار لمحات کی فیس بک ویڈیو ریلز اور جھلکیاں دیکھیں۔'
              : 'Experience the magic of Pakistan’s majestic mountains, valleys, and real tour moments through our official Facebook reels & video views.'}
          </p>
        </div>

        {/* Video Player Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/80 border border-gray-700/80 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-md">
            
            {/* Top Bar with Facebook branding & CTA */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 mb-5 border-b border-gray-700/60 ${isUrdu ? 'sm:flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-10 h-10 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Facebook size={22} className="fill-current" />
                </div>
                <div>
                  <h3 className={`font-bold text-white text-base md:text-lg ${isUrdu ? 'font-urdu' : ''}`}>
                    {isUrdu ? 'سفرِ پربت آفیشل ریل' : 'Safar-e-Parbat Official Reel'}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Video size={12} className="text-blue-400" />
                    <span>Facebook Video Player</span>
                  </p>
                </div>
              </div>

              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}
              >
                <Facebook size={16} />
                <span>{isUrdu ? 'فیس بک پر دیکھیں' : 'Watch on Facebook'}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Embedded Video Iframe Container */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-inner flex justify-center items-center">
              {/* Responsive Container with 16:9 / video ratio */}
              <div className="w-full flex justify-center items-center py-2 sm:py-4">
                <div className="relative w-full max-w-[560px] aspect-[560/315] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  <iframe
                    src={iframeSrc}
                    title="Safar-e-Parbat Facebook Video Reel"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className={`mt-5 pt-4 border-t border-gray-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3 ${isUrdu ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Play size={14} className="text-emerald-400 fill-emerald-400" />
                <span className={isUrdu ? 'font-urdu' : ''}>
                  {isUrdu ? 'تازہ ترین ٹور اپ ڈیٹس اور ویڈیو مناظر' : 'Latest tour highlights, scenic drone views & traveler reels'}
                </span>
              </div>
              <a
                href="https://www.facebook.com/safareparbat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4 transition"
              >
                @safareparbat
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FacebookVideoShowcase;
