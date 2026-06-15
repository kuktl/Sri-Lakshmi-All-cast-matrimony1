import React from 'react';
import { Heart, Globe, Shield, Users, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MatrimonialChannels from '../components/MatrimonialChannels';
//import casteBg from "../assets/Candid Wedding Photography Chennai.jpg";

interface CommunitiesPageProps {
  navigateToPage: (page: string) => void;
  setActiveGender: (gender: 'All' | 'Bride' | 'Groom') => void;
}

export default function AllCaste({ navigateToPage, setActiveGender }: CommunitiesPageProps) {
  const { language, t } = useLanguage();
  
  return (
    <div className="bg-cream-50 font-sans">
      
      {/* 1. Communities Hero */}
      <section 
        className="relative bg-cover bg-center py-28 sm:py-32 text-center select-none overflow-hidden text-white"
        style={{
  backgroundImage: `linear-gradient(
    to bottom,
    rgba(15, 10, 10, 0.88),
    rgba(28, 12, 12, 0.84)
  ), url('/Candid Wedding Photography Chennai.jpg')`,
}}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold">
              {t('allcaste.badge', 'Respected Heritages', 'గౌరవప్రదమైన వారసత్వాలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('allcaste.title', 'Community-Based Telugu Matrimony (All Caste Channels)', 'సామాజిక ఆధారిత తెలుగు మ్యాట్రిమోని (అన్ని కులాల ఛానెల్‌లు)')}
          </h1>
          <p className="text-[#d1d5db] text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'allcaste.desc',
              'We help Telugu families find suitable matches based on community, location, education, profession, family values, and personal preferences.',
              'కులం, ప్రాంతం, విద్య, వృత్తి, కుటుంబ విలువలు మరియు వ్యక్తిగత ప్రాధాన్యతలపై ఆధారపడి సరైన వివాహ సంబంధాలను కనుగొనడంలో మేము తెలుగు కుటుంబాలకు సహాయం చేస్తాము.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Introduction Card segment */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-900 mx-auto border border-emerald-200 shadow-sm">
              <Users size={22} className="stroke-emerald-800" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {t('allcaste.h2', 'Preserving Traditional Roots. Cultivating Modern Bonds.', 'సాంప్రదాయ మూలాలను కాపాడుకుంటూ.. ఆధునిక బంధాలను పెంచుకుందాం.')}
            </h2>
            <p className="text-stone-705 text-sm sm:text-base leading-relaxed font-medium">
              {t(
                'allcaste.introDesc',
                'We understand that a successful union lies inside shared cultural perspectives, values, and traditions. Our multi-community directory matches families based on deep ancestral lineages while aligning contemporary educational and professional achievements.',
                'ఒక విజయవంతమైన వివాహ బంధం అనేది ఉమ్మడి సాంస్కృతిక దృక్కోణాలు, విలువలు మరియు సంప్రదాయాలలో ఉంటుందని మేము విశ్వసిస్తాము. మా సామాజిక డైరెక్టరీ సమకాలీన విద్యా మరియు వృత్తిపరమైన విజయాలను సమన్వయం చేస్తూనే లోతైన పూర్వీకుల వంశాల ఆధారంగా కుటుంబాలను సరిపోలుస్తుంది.'
              )}
            </p>
            <div className="flex justify-center gap-6 pt-3 text-xs text-stone-550">
              <span className="flex items-center gap-1.5"><Globe size={14} className="text-emerald-800" /> {t('allcaste.branches', 'Regional Branches', 'ప్రాంతీయ శాఖలు')}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-emerald-600" /> {t('allcaste.verified', 'Verified Backgrounds', 'ధృవీకరించబడిన నేపథ్యాలు')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Community Cards Grid (Rendered by MatrimonialChannels component) */}
      <MatrimonialChannels />

      {/* 4. How Community Matching Works */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900">
              {t('allcaste.howTitle', 'How Community Matching Works', 'కమ్యూనిటీ ఆధారిత సంబంధాల సరిపోలిక ఎలా పని చేస్తుంది')}
            </h3>
            <div className="w-10 h-0.5 bg-[#10b981] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-cream-50/40 rounded-2xl border border-stone-200 text-center space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-white font-serif font-bold text-xs flex items-center justify-center mx-auto shadow-xs">1</span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                {t('allcaste.step1Title', 'Community Vetting', 'సామాజిక సమీక్ష')}
              </h4>
              <p className="text-stone-605 text-xs inline-block leading-relaxed">
                {t(
                  'allcaste.step1Desc',
                  'Profiles upload basic identification. Our matchmaking experts verify gotrams and familial contexts with community contacts.',
                  'ప్రొఫైల్స్ ప్రాథమిక గుర్తింపును అప్‌లోడ్ చేస్తాయి. మా మ్యాచ్ మేకింగ్ నిపుణులు సామాజిక పరిచయాల ద్వారా గోత్రాలు మరియు కుటుంబ నేపథ్యాలను దర్యాప్తు చేస్తారు.'
                )}
              </p>
            </div>

            <div className="p-6 bg-cream-50/40 rounded-2xl border border-stone-200 text-center space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-white font-serif font-bold text-xs flex items-center justify-center mx-auto shadow-xs">2</span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                {t('allcaste.step2Title', 'Astrological Alignment', 'జ్యోతిష్య అనుకూలత సంబంధాలు')}
              </h4>
              <p className="text-stone-605 text-xs inline-block leading-relaxed">
                {t(
                  'allcaste.step2Desc',
                  'If requested, we check compatibility based on birth charts, nakshatrams (star alignment) to respect family belief metrics.',
                  'కుటుంబం కోరినట్లయితే, సంప్రదాయ విశ్వాసాలను గౌరవిస్తూ పుట్టిన జాతకం, నక్షత్రాలు ఆధారంగా సరిపోలికలను పరిశీలిస్తాము.'
                )}
              </p>
            </div>

            <div className="p-6 bg-cream-50/40 rounded-2xl border border-stone-200 text-center space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#10b981] text-white font-serif font-bold text-xs flex items-center justify-center mx-auto shadow-xs">3</span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                {t('allcaste.step3Title', 'Reciprocal Introduction', 'పరస్పర పరిచయాలు')}
              </h4>
              <p className="text-stone-605 text-xs inline-block leading-relaxed">
                {t(
                  'allcaste.step3Desc',
                  'We bridge both family lines securely. Detail sheets and contact numbers are only exchanged upon mutual assent indicators.',
                  'మేము రెండు కుటుంబాలను సురక్షితంగా అనుసంధానిస్తాము. పరస్పర అంగీకారం లభించిన తర్వాత మాత్రమే ప్రొఫైల్ వివరాలు మరియు కాంటాక్ట్ నంబర్లు పంచుకోబడతాయి.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Benefits of Community-Based Matrimony */}
      <section className="py-16 bg-cream-50/50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-double border-stone-200 shadow-2xl bg-stone-100">
              <img 
                src={casteBg}
                  alt="Community-Based Matrimony" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-5">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block">
                {t('allcaste.btnBadge', 'Bridging Traditions', 'సంప్రదాయాలను కలుపుతూ')}
              </span>
              <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-stone-900">
                {t('allcaste.benefitTitle', 'Benefits of Community-Based Matrimony', 'కుల ఆధారిత మ్యాట్రిమోని ప్రయోజనాలు')}
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                  <div>
                    <strong>{t('allcaste.benefit1Key', 'Shared Cultural Alignment:', 'ఉమ్మడి సాంస్కృతిక అనుకూలత:')}</strong>
                    {t(
                      'allcaste.benefit1Val',
                      ' Unified lifestyle values, customs, food menus, holiday plans, and traditional family celebrations.',
                      ' ఒకే విధమైన జీవనశైలి విలువలు, ఆచారాలు, ఆహారపు అలవాట్లు, పండుగలు మరియు సంప్రదాయాలు కలిగి ఉండటం.'
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                  <div>
                    <strong>{t('allcaste.benefit2Key', 'Streamlined Credential Verification:', 'సులభమైన ఆధారాల ధృవీకరణ:')}</strong>
                    {t(
                      'allcaste.benefit2Val',
                      ' Familiarity with local neighborhood reputations and common acquaintances makes referencing highly secure.',
                      ' స్థానిక ఇరుగుపొరుగు ప్రసిద్ధి మరియు సామాజిక పరిచయాల ద్వారా సురక్షితమైన మరియు వేగవంతమైన సమాచారం పొందడం సంభవిస్తుంది.'
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                  <div>
                    <strong>{t('allcaste.benefit3Key', 'Harmonious Mutual Family Bonding:', 'సుహృద్భావ కుటుంబ బంధం:')}</strong>
                    {t(
                      'allcaste.benefit3Val',
                      ' Easier alignment of expectations between physical household standards and community hierarchies.',
                      ' ఇరు వైపులా ఉన్న గృహ ప్రమాణాలు మరియు సామాజిక స్థాయిల మధ్య అంచనాలను సులభంగా సరిపోల్చడం.'
                    )}
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-16 bg-stone-950 text-white text-center relative overflow-hidden border-t-2 border-[#10b981]">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-xl mx-auto px-4 relative z-10 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-amber-100">
            {t('allcaste.ctaTitle', 'Looking for a match in your community?', 'మీ సొంత కులంలో సంబంధాల కోసం చూస్తున్నారా?')}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
            {t(
              'allcaste.ctaDesc',
              'Take a leap towards finding your compatible partner. Register your profile to let us match you.',
              'మీకు తగిన భాగస్వామిని కనుగొనడానికి అడుగు ముందుకు వేయండి. మా సహాయం పొందడానికి మీ ప్రొఫైల్‌ను వెంటనే నమోదు చేయండి.'
            )}
          </p>
          <button
            onClick={() => navigateToPage('register')}
            className="px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-md inline-block mt-2"
          >
            {t('allcaste.ctaBtn', 'Register Your Profile Today', 'ఈరోజే మీ ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
          </button>
        </div>
      </section>

    </div>
  );
}
