import React, { useState } from 'react';
import { Play, X, Heart, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="video-section" className="relative h-[420px] sm:h-[480px] flex items-center justify-center overflow-hidden">
      
      {/* Cinematic Banner Background Image (Indian Wedding Celebration) */}
      <img 
        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&auto=format&fit=crop&q=80" 
        alt="Telugu Traditional Wedding Garland" 
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.38] contrast-[1.05]"
        referrerPolicy="no-referrer"
      />
      
      {/* Decorative Gold Traditional Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-maroon-950/40 pointer-events-none mix-blend-color-burn"></div>

      {/* Floating Sparkly Traditional Elements */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 font-sans text-white">
        
        {/* Top traditional badge icon */}
        <div className="mb-4 bg-gradient-to-tr from-maroon-900 to-gold-600 p-2.5 rounded-full border border-gold-400/40 shadow-lg animate-pulse">
          <Heart size={20} className="text-gold-250 fill-gold-250" />
        </div>

        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-300 font-extrabold mb-3 select-none font-sans">
          {t('video.badge', 'Bridging Families Internationally', 'కుటుంబాలను అంతర్జాతీయంగా అనుసంధానించడం')}
        </span>

        {/* Core Heading */}
        <h2 className="font-serif text-2.5xl sm:text-4xl font-extrabold max-w-3xl leading-snug tracking-tight text-cream-50 drop-shadow-md">
          {t('video.title', 'See How Sri Lakshmi All Caste Matrimony Helps Families Find the Right Match', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని కుటుంబాలకు తగిన సంబంధాన్ని కనుగొనడంలో ఎలా సహాయపడుతుందో చూడండి')}
        </h2>

        <p className="text-stone-300 text-xs sm:text-sm mt-3 font-medium tracking-wide max-w-xl font-sans">
          {t(
            'video.desc',
            'Watch this descriptive visual presentation on traditional gotrams, biodata matchmaking, and how we protect candidate privacy at every stage of the courtship.',
            'సాంప్రదాయ గోత్రాలు, బయోడేటా మ్యాచ్ మేకింగ్ మరియు ప్రతి దశలో ప్రొఫైల్ గోప్యతను ఎలా కాపాడుతామో ఈ చిన్న వీడియో ద్వారా తెలుసుకోండి.'
          )}
        </p>

        {/* Centered Play Button */}
        <button
          id="video-play-btn"
          onClick={() => setIsPlaying(true)}
          className="mt-8 relative group flex items-center justify-center w-20 h-20 rounded-full bg-gold-400 hover:bg-gold-500 shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer active:scale-95 border-none"
        >
          {/* Pulsating Ring */}
          <span className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-gold-300 animate-ping opacity-60"></span>
          <Play size={28} className="text-maroon-950 fill-maroon-950 ml-1 group-hover:scale-105 transition-transform" />
        </button>

      </div>

      {/* Video Overlay Modal (Using a high-quality wedding cinematic placeholder or YouTube frame) */}
      {isPlaying && (
        <div id="video-overlay-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-gold-400/30">
            
            {/* Close Button */}
            <button
              id="video-close-btn"
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 text-white hover:bg-maroon-800 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none"
            >
              <X size={20} />
            </button>

            {/* Video Content Iframe or Slideshow Player */}
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/V6N9_5B8A1M?autoplay=1" 
                title="Telugu Wedding Rituals & Courtesies" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Bottom Banner info */}
            <div className="bg-maroon-955 p-4 text-center border-t border-gold-400/20 text-white font-sans text-xs flex items-center justify-center gap-1.5">
              <Star size={12} className="text-gold-400 fill-gold-400" />
              <span>
                {t('video.modalNotice', 'Sri Lakshmi All Caste Matrimony is committed to traditional values & 100% profile matchmaking verification.', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని సాంప్రదాయ విలువలకు & 100% ప్రొఫైల్ పరిశీలనకు ఎల్లప్పుడూ కట్టుబడి ఉంటుంది.')}
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
