import React from 'react';
import { UserPlus, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('how.step1Title', 'Register Profile', 'ప్రొఫైల్‌ను నమోదు చేసుకోండి'),
      description: t('how.step1Desc', 'Submit bride or groom details.', 'వధువు లేదా వరుడి యొక్క ప్రాథమిక వివరాలను సమర్పించండి.'),
      icon: <UserPlus className="text-maroon-800" size={24} />
    },
    {
      num: '02',
      title: t('how.step2Title', 'Profile Verification', 'ప్రొఫైల్ పరిశీలన'),
      description: t('how.step2Desc', 'Our team reviews the submitted information.', 'మా బృందం సమర్పించిన సమాచారాన్ని క్షుణ్ణంగా పరిశీలిస్తుంది.'),
      icon: <ShieldAlert className="text-gold-600" size={24} />
    },
    {
      num: '03',
      title: t('how.step3Title', 'Get Suitable Matches', 'తగిన సంబంధాలను పొందండి'),
      description: t('how.step3Desc', 'Receive matching profiles based on preferences.', 'మీ ప్రాధాన్యతలకు అనుకూలమైన సంబంధాల ప్రొఫైల్‌లను పొందండి.'),
      icon: <Sparkles className="text-maroon-800" size={24} />
    },
    {
      num: '04',
      title: t('how.step4Title', 'Connect Families', 'కుటుంబాలను కలపడం'),
      description: t('how.step4Desc', 'Families can connect and move forward confidently.', 'ఇరు కుటుంబాలు విశ్వాసంతో ఒకరినొకరు సంప్రదించి ముందుకు సాగవచ్చు.'),
      icon: <Heart className="text-gold-600 animate-pulse fill-gold-605/10" size={24} />
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 bg-white relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-maroon-950 tracking-tight">
            {t('how.headerTitle', 'Simple & Trusted Matchmaking Process', 'సరళమైన మరియు అత్యంత విశ్వసనీయమైన వివాహ ప్రక్రియ')}
          </h2>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed font-medium">
            {t(
              'how.headerDesc',
              'In Telugu traditional matches, respecting community elders and secure vetting is paramount. Our structured workflow ensures high satisfaction.',
              'తెలుగు సంప్రదాయ వివాహాలలో పెద్దలను గౌరవించడం మరియు సురక్షితమైన పరిశీలన అత్యంత ప్రథమం. మా క్రమశిక్షణతో కూడిన పద్ధతి మీకు సంపూర్ణ సంతృప్తిని అందిస్తుంది.'
            )}
          </p>
        </div>

        {/* Steps Grid with Connective Lines for Large Screens */}
        <div className="relative" id="how-it-works-flow">
          {/* Decorative Horizontal line behind cards on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-maroon-900/10 via-gold-450/40 to-maroon-900/10 -translate-y-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                id={`how-it-works-step-${idx}`}
                className="relative bg-cream-50 rounded-2xl p-6 border border-stone-150/70 text-center shadow-xs hover:shadow-md transition-all group hover:bg-white"
              >
                {/* Micro Step Circle Index Badge */}
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-maroon-900 text-gold-300 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest border border-gold-450 z-10 shadow-sm font-sans uppercase">
                  {t('how.stepPrefix', 'Step', 'స్టెప్')} {step.num}
                </span>

                {/* Circular Icon with traditional gold border */}
                <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-gold-300 shadow-sm mb-5 group-hover:scale-110 group-hover:border-maroon-700 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="font-serif font-bold text-base text-maroon-950 group-hover:text-maroon-850">
                  {step.title}
                </h3>

                {/* Step Text */}
                <p className="text-stone-600 text-xs mt-2.5 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Mobile Connect Indicator Arrow */}
                {idx < 3 && (
                  <div className="block lg:hidden text-gold-500 font-bold text-lg mt-4 animate-bounce">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
