import React from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials-section" className="py-16 bg-cream-100 sawtooth-bg relative overflow-hidden font-sans">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gold-200/15 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-6 animate-fade-in">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-3.5xl font-extrabold text-maroon-950 tracking-tight">
            {t('testimonials.title', 'Happy Families. Successful Matches.', 'సంతోషకరమైన కుటుంబాలు. సఫలమైన వివాహ బంధాలు.')}
          </h2>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed font-medium">
            {t(
              'testimonials.subtitle',
              'Read heartwarming stories from Telugu families across Telangana and Andhra Pradesh who found their perfect lifelong matches with us.',
              'తమకు తగిన జీవిత భాగస్వామిని విజయవంతంగా కనుగొన్న తెలంగాణ మరియు ఆంధ్రప్రదేశ్ ప్రాంతాల తెలుగు కుటుంబాల అనుభవాలు ఇక్కడ వీక్షించండి.'
            )}
          </p>
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => {
            const quoteText = t(
              `testimonials.quote${idx}`,
              item.quote,
              idx === 0 
                ? '“మేము ఆంధ్ర మరియు తెలంగాణ అంతటా గౌరవనీయమైన కుటుంబ సంబంధాల కోసం వెతుకుతున్నాము, తెలుగు రేఖ మ్యారేజ్ బ్యూరో మాకు ధృవీకరించబడిన మరియు తగిన ప్రొఫైల్‌లతో సహాయపడింది. వారి సీనియర్ మ్యాచ్ మేకర్స్ ఈ ప్రక్రియ అంతటా మాకు ఎంతో ఓపిగ్గా మార్గనిర్దేశం చేశారు.”'
                : idx === 1
                ? '“ప్రొఫైల్ సూచనలు నిజమైనవి మరియు మా సామాజిక అంచనాలకు తగినవిగా ఉన్నాయి. మా కుటుంబ ప్రాధాన్యతలను బృందం సరిగ్గా అర్థం చేసుకుని, సరైన సంబంధాన్ని కనుగొనడంలో మాకు సహాయపడింది.”'
                : '“finding a respectable match matching our gotram guidelines became easier with their direct support. The process was simple, respectful, and trustworthy.”'
            );
            const nameText = t(
              `testimonials.name${idx}`,
              item.name,
              idx === 0 ? 'Bride’s Family' : idx === 1 ? 'Groom’s Family' : 'Parent of Bride'
            );
            const locationText = t(
              `testimonials.loc${idx}`,
              item.location,
              idx === 0 ? 'Hyderabad' : idx === 1 ? 'Vijayawada' : 'Telangana'
            );
            const matchedText = t('testimonials.matched', 'Matched', 'వివాహం జరిగింది');

            return (
              <div 
                key={idx}
                id={`testimonial-card-${idx}`}
                className="bg-white rounded-2xl p-6.5 shadow-sm border border-stone-200/60 flex flex-col justify-between relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Little Quoting Accent Icon */}
                <div className="absolute -top-4 -right-2 text-gold-200 pointer-events-none opacity-40">
                  <Quote size={80} className="stroke-1" />
                </div>

                {/* Star Rating decoration */}
                <div className="flex items-center gap-1 text-gold-500 mb-4 animate-pulse">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-500" />
                  ))}
                </div>

                {/* Quotation text */}
                <p className="text-stone-700 font-medium text-xs sm:text-sm leading-relaxed relative z-10 italic flex-grow">
                  {quoteText}
                </p>

                {/* Author and metadata */}
                <div className="border-t border-stone-100 pt-4 mt-6 flex justify-between items-center font-sans">
                  <div className="flex items-center gap-3">
                    {/* Circular placeholder family image */}
                    <img 
                      src={
                        idx === 0 
                          ? 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=120&auto=format&fit=crop&q=80' 
                          : idx === 1 
                          ? 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=120&auto=format&fit=crop&q=80' 
                          : 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=120&auto=format&fit=crop&q=80'
                      }
                      alt="Happy Married Family Couple" 
                      className="w-11 h-11 rounded-full object-cover border border-gold-300"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-maroon-950">
                        {nameText}
                      </h4>
                      <p className="text-stone-404 text-[10px] uppercase font-bold tracking-widest mt-0.5 font-sans">
                        {locationText}
                      </p>
                    </div>
                  </div>

                  {item.matchYear && (
                    <span className="text-[10px] font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 shrink-0 font-sans">
                      {matchedText} {item.matchYear}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
