import React, { useState } from 'react';
import { Play, ArrowRight, X, Tv, Heart, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface KiranTVSectionProps {
  layoutVariant?: 'default' | 'reversed';
}

export default function KiranTVSection({ layoutVariant = 'default' }: KiranTVSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useLanguage();

  const handleWatchClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
          layoutVariant === 'reversed' ? 'lg:flex-row-reverse' : ''
        }`}>
          
          {/* Text content container */}
          <div className={`lg:col-span-5 space-y-6 ${
            layoutVariant === 'reversed' ? 'lg:order-last' : 'lg:order-first'
          }`}>
            
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-gold-400/20 px-3 py-1 rounded-full text-maroon-900">
              <Tv size={13} className="text-maroon-800" />
              <span className="text-[10px] sm:text-xs tracking-widest font-bold uppercase">
                {t('kiran.badge', 'Broadcast Coverage', 'వార్తా ప్రసార కవరేజ్')}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4.5xl font-black text-slate-900 leading-tight tracking-tight">
              {t('kiran.title', 'Finding the Right Match with Sri Lakshmi All Caste Matrimony', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోనితో సరైన వివాహ నిశ్చయం')}
            </h2>

            <p className="text-stone-605 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line">
              {t(
                'kiran.desc',
                'Watch our special TV program about Sri Lakshmi All Caste Matrimony, where we share genuine bride and groom profiles from Telugu families across all communities.\n\nOur personal matchmaking team helps families find suitable pelli sambandhalu based on caste/community preference, family background, education, profession, location, and traditional values.',
                'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని ప్రత్యేక టెలివిజన్ కార్యక్రమాన్ని వీక్షించండి, ఇందులో అన్ని కమ్యూనిటీల నిజమైన వధూవరుల ప్రొఫైల్స్ మరియు పెళ్లి సంబంధాలను వివరించడం జరిగింది.\n\nమా వ్యక్తిగత మ్యాచ్ మేకింగ్ బృందం మీకు తగిన సరైన కుటుంబాన్ని ఎంచుకోవడంలో సహాయం చేస్తుంది.'
              )}
            </p>

            {/* Offer title */}
            <div className="font-bold text-slate-900 text-xs sm:text-sm tracking-wide uppercase pt-2">
              {t('kiran.offerHeading', 'What We Offer:', 'మేము అందించేవి:')}
            </div>

            {/* Quick trust bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-stone-700 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{t('kiran.bullet1', 'Personal Matchmaking Support', 'వ్యక్తిగత మ్యాచ్ మేకింగ్ సేవలు')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{t('kiran.bullet2', 'Verified Family Contacts', 'ధృవీకరించబడిన కుటుంబ పరిచయాలు')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{t('kiran.bullet3', 'Privacy-Focused Communication', 'రక్షిత వ్యక్తిగత వివరాలు')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{t('kiran.bullet4', 'Community & Family Preference Matching', 'కమ్యూనిటీ & కుటుంబ ప్రాధాన్యత పొంతన')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleWatchClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-slate-800 hover:text-maroon-900 border border-stone-300 hover:border-maroon-800 font-bold text-xs rounded-xl shadow-xs transition-all duration-200 cursor-pointer group"
              >
                <span>{t('kiran.watchBtn', 'Watch on YouTube', 'యూట్యూబ్‌లో వీక్షించండి')}</span>
                <ArrowRight size={14} className="text-stone-500 group-hover:text-maroon-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Interactive TV Broadcast Video layout container */}
          <div className="lg:col-span-7 flex justify-center">
            
            <div 
              onClick={handleWatchClick}
              className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-stone-250 cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
            >
              
              {/* Main Couch Speaker photo representing traditional South Indian wedding ceremony */}
              <img 
                src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1000&auto=format&fit=crop&q=80" 
                alt="Sri Lakshmi Matrimony Representative on TV" 
                className="w-full h-full object-cover filter brightness-[0.95]"
                referrerPolicy="no-referrer"
              />

              {/* Faint green grass backdrop tint */}
              <div className="absolute inset-0 bg-emerald-950/5 pointer-events-none mix-blend-multiply"></div>

              {/* Fake Gentleman Overlay recreating screenshot stance perfectly */}
              <div className="absolute inset-x-0 bottom-12 top-0 flex items-center justify-center">
                
                {/* Simulated interviewer setup */}
                <div className="absolute left-[35%] bottom-[10%] w-[45%] h-[75%] opacity-90">
                  <div className="w-full h-full bg-cover bg-center rounded-xl scale-x-[-1]" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=400&auto=format&fit=crop&q=80')"
                  }}></div>
                </div>

                {/* Sparkling gold play button banner */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-rose-600 group-hover:bg-rose-700 text-white flex items-center justify-center shadow-xl group-hover:scale-110 duration-200 border-2 border-white">
                  <Play size={24} className="fill-current ml-1" />
                </div>

              </div>

              {/* LAKSHMI TV watermark logo at top-right exactly matching layout */}
              <div className="absolute top-4 right-4 flex flex-col items-center select-none scale-90 sm:scale-100 origin-top-right">
                <div className="flex bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-red-650 px-2.5 py-1 text-white font-black text-xs sm:text-sm italic tracking-tighter">
                    SL<span className="text-yellow-405">★</span>TV
                  </div>
                  <div className="bg-amber-400 px-1 py-1 text-neutral-900 font-extrabold text-[9px] flex items-center justify-center">
                    LAKSHMI
                  </div>
                </div>
              </div>

              {/* Center low-opacity LAKSHMI TV logo watermark in middle of the screen */}
              <div className="absolute inset-0 flex items-center justify-center select-none pb-12 opacity-25">
                <span className="font-serif font-black tracking-widest text-lg sm:text-2xl text-stone-300/40 uppercase">
                  LAKSHMI TV
                </span>
              </div>

              {/* Broadcast Bottom Ticker: exactly matching the attached image colors & contents */}
              <div className="absolute bottom-0 inset-x-0 h-11 sm:h-12 bg-indigo-950 flex items-center justify-between px-3 sm:px-6 select-none border-t border-yellow-450/25">
                
                {/* Yellow text with Telugu language content */}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0"></div>
                  <span className="text-yellow-400 text-[10px] sm:text-xs font-bold font-sans tracking-wide truncate max-w-[210px] sm:max-w-none">
                    శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని , హైదరాబాద్
                  </span>
                </div>

                {/* Neon green text showing FOR CONTACT + correct phone numbers */}
                <span className="text-green-400 text-[9px] sm:text-[11px] font-black tracking-widest uppercase shrink-0">
                  FOR CONTACT : <span className="font-mono text-white text-xs sm:text-sm font-bold bg-[#1ca85d]/30 px-1.5 py-0.5 rounded border border-green-500/20">9121594223</span>
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Modal Video Player with embedding placeholder */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-4xl bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-gold-400/30">
            
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 text-white hover:bg-maroon-800 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/V6N9_5B8A1M?autoplay=1" 
                title="Sri Lakshmi All Caste Matrimony on TV Segment Broadcast" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-indigo-950 p-4 text-center border-t border-yellow-450/20 text-white font-sans text-xs flex items-center justify-between px-6">
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-red-500 fill-current animate-pulse" />
                <span className="font-bold">Sri Lakshmi All Caste Matrimony</span>
              </div>
              <span className="text-yellow-400 font-bold">Call support: +91 91215 94223</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
