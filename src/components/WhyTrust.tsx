import React from 'react';
import { ShieldCheck, Users, HeartHandshake, Lock, Check, Sparkles, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyTrust() {
  const { t } = useLanguage();

  const serviceCards = [
    {
      title: t('why.card0.title', 'Verified Profiles', 'ధృవీకరించబడిన ప్రొఫైల్స్'),
      description: t('why.card0.desc', 'Every bride and groom profile is reviewed carefully before sharing, so families can connect with more confidence and trust.', 'నమ్మకాన్ని, వాస్తవికతను స్థిరపరచడానికి ప్రతి వధూవరుల ప్రొఫైల్‌ను పంచుకునే ముందే మేము చాలా జాగ్రత్తగా పరిశీలిస్తాము.'),
      icon: <ShieldCheck size={24} className="text-maroon-800" />
    },
    {
      title: t('why.card1.title', 'Telugu Community Matches', 'తెలుగు కమ్యూనిటీ సంబంధాలు'),
      description: t('why.card1.desc', 'We help families find suitable matches from Kamma, Reddy, Kapu, Goud, Arya Vysya, Yadav, Padmashali, Balija, Brahmin, Naidu, and other Telugu communities.', 'కమ్మ, రెడ్డి, కాపు, గౌడ్, ఆర్య వైశ్య, యాదవ్, పద్మశాలి, బలిజ, బ్రాహ్మణ, నాయుడు మొదలైన అన్ని తెలుగు కులాల వారికి సంబంధాలు లభించును.'),
      icon: <Users size={24} className="text-gold-600" />
    },
    {
      title: t('why.card2.title', 'Personal Matchmaking Support', 'వ్యక్తిగత మ్యాచ్ మేకింగ్ సహాయం'),
      description: t('why.card2.desc', 'Our team personally guides families from profile registration to suitable match sharing and family-to-family connection.', 'రిజిస్ట్రేషన్ సమయం నుండి వివాహ సంబంధాలు నిశ్చయమయ్యే వరకు మా అనుభవజ్ఞులైన టీమ్ మీకు ప్రతి అడుగులో తోడుగా ఉంటుంది.'),
      icon: <HeartHandshake size={24} className="text-maroon-800" />
    },
    {
      title: t('why.card3.title', 'Privacy Protection', 'గోప్యతా రక్షణ'),
      description: t('why.card3.desc', 'Your personal details and contact information are shared carefully only with interested and suitable families after approval.', 'సమర్పించిన వ్యక్తిగత వివరాలు, ఫోన్ నంబర్లు ఇరువురి స్పష్టమైన అనుమతి మరియు అంగీకారం లభించిన తర్వాతే అత్యంత జాగ్రత్తగా పంచుకోబడును.'),
      icon: <Lock size={24} className="text-gold-600" />
    },
    {
      title: t('why.card4.title', 'Family-Friendly Process', 'కుటుంబ అనుకూల పద్ధతి'),
      description: t('why.card4.desc', 'Our matchmaking process is simple, respectful, and easy for parents and relatives to understand and follow.', 'తల్లిదండ్రులు, పెద్దలకు సులభంగా అర్థమయ్యే సులభమైన సాంప్రదాయ కమ్యూనికేషన్ సిస్టమ్.'),
      icon: <Check size={24} className="text-maroon-800" />
    },
    {
      title: t('why.card5.title', 'Bride & Groom Assistance', 'వధూవరుల ప్రత్యేక సహాయం'),
      description: t('why.card5.desc', 'We provide dedicated support for both bride and groom profiles based on family background, education, profession, location, and preferences.', 'వధూవరుల జాతక పొంతన, విద్యా ఉద్యోగాల ప్రొఫెషనల్ వివరాలు సరిపోల్చడంలో ప్రత్యేక సహాయాన్ని అందిస్తాము.'),
      icon: <Sparkles size={24} className="text-gold-600" />
    }
  ];

  return (
    <section id="why-trust-section" className="py-16 bg-white relative overflow-hidden">
      
      {/* Decorative Floral Background Elements using CSS vector graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none select-none text-gold-550">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-gold-550">
          <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5 pointer-events-none select-none text-maroon-500">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon-800">
          <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-950 tracking-tight leading-tight">
            {t('why.heading', 'Why Telugu Families Trust Sri Lakshmi All Caste Matrimony', 'తెలుగు కుటుంబాలు శ్రీ లక్ష్మి మ్యాట్రిమోనిని ఎందుకు నమ్ముతారు')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t(
              'why.subtitle',
              'For more than a decade, Sri Lakshmi All Caste Matrimony has helped Telugu families find suitable pelli sambandhalu with genuine profiles, verified home contacts, and personal matchmaking support. We understand family values, caste/community preferences, education, profession, location, and traditional expectations before suggesting matches.',
              'దశాబ్ద కాలంగా నమ్మకమైన సాంప్రదాయ వివాహ సంబంధాలకు శ్రీ లక్ష్మి మ్యాట్రిమోని అత్యంత ప్రాధాన్యత సంతరించుకుంది.'
            )}
          </p>
        </div>

        {/* 6-Card Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
          {serviceCards.map((card, idx) => (
            <div 
              key={idx}
              id={`why-trust-card-${idx}`}
              className="bg-cream-50/50 rounded-2xl p-6 border border-gold-300/20 hover:border-gold-400 hover:bg-cream-100/35 hover:shadow-lg transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle gold design border highlight in each card */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon-800/10 via-gold-400/20 to-maroon-800/10 group-hover:from-maroon-800 group-hover:via-gold-400 group-hover:to-maroon-800 transition-all duration-300"></div>

              {/* Icon Container */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gold-200/40 shadow-xs mb-4 group-hover:scale-110 group-hover:shadow transition-all duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-bold text-maroon-950 group-hover:text-maroon-850 transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-stone-600 text-sm mt-2.5 leading-relaxed flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
