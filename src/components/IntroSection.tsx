import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Heart, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function IntroSection() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="intro-section" className="py-20 bg-cream-100/50 relative overflow-hidden">
      
      {/* Traditional Floral Corner Ornaments */}
      <div className="absolute top-4 left-4 w-16 h-16 opacity-30 text-gold-600 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-gold-500">
          <circle cx="20" cy="20" r="10" />
          <path d="M20 20 Q50 20 80 50 Q50 50 20 20" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Centered Content Wrap without side images */}
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Centered Main Legacy Text */}
          <div className="flex-1 text-center max-w-3xl">
            
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Star size={12} className="text-gold-500 fill-gold-500" />
              <Star size={16} className="text-gold-500 fill-gold-500" />
              <Star size={12} className="text-gold-500 fill-gold-500" />
            </div>

            <h2 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-maroon-950 tracking-tight leading-tight">
              {t('intro.title', 'Trusted Telugu All-Caste Marriage Bureau', 'విశ్వసనీయ తెలుగు అన్ని కులాల వివాహ బ్యూరో')}
            </h2>

            <div className="w-20 h-0.5 bg-gold-500 mx-auto my-4 rounded-full"></div>

            <p className="text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              {t(
                'intro.desc',
                'Sri Lakshmi All Caste Matrimony helps Telugu families from all communities find suitable bride and groom matches across Telangana and Andhra Pradesh. We provide verified family contacts, personal guidance, and a trusted matchmaking process for every pelli sambandham.',
                'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని ఇరు తెలుగు రాష్ట్రాలలోని అన్ని కమ్యూనిటీల వధూవరులకు తగిన సంబంధాన్ని వెతకడంలో సహాయపడుతుంది. మేము ప్రతి పెళ్లి సంబంధానికి ధృవీకరించబడిన సంప్రదింపులు మరియు వ్యక్తిగత మార్గదర్శకత్వాన్ని అందిస్తాము.'
              )}
            </p>

            {/* Expansible legacy details block */}
            <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed text-center px-4 bg-white/60 p-4 rounded-xl border border-gold-200/30">
                {t(
                  'intro.moreDesc',
                  'Whether you are looking for a bride or groom from your caste, location, education, profession, or family background, our team supports you with genuine profiles and respectful communication.',
                  'మీరు కోరుకునే కులం, ప్రాంతం, చదువు, ఉద్యోగం లేదా కుటుంబ నేపథ్యం ఆధారంగా మీకు తగిన సరైన వధూవరులను వెతకడానికి మా బృందం ఎల్లప్పుడూ సిద్ధంగా ఉంటుంది.'
                )}
              </p>
            </div>

            {/* Read More Button */}
            <button
              id="intro-read-more-btn"
              onClick={() => setExpanded(!expanded)}
              className="mt-6 px-6 py-2.5 text-xs font-bold text-maroon-900 border border-gold-500 hover:bg-maroon-900 hover:text-white rounded-full transition-all flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
            >
              <span>{expanded ? t('intro.lessBtn', 'Show Less', 'తక్కువ చూపించు') : t('intro.moreBtn', 'Read More', 'మరింత చదవండి')}</span>
              <ArrowRight size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
