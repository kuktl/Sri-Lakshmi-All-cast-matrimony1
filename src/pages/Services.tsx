import React from 'react';
import { Users, Sparkles, Video, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onTalkToExpertClick: () => void;
  navigateToPage: (page: string) => void;
}

export default function Services({ onTalkToExpertClick, navigateToPage }: ServicesProps) {
  const { language, t } = useLanguage();

  // Dynamically translated services array for 100% bilingual visual presentation
  const getServices = (translate: typeof t) => [
    {
      id: 'parent-matching',
      title: translate('services.parent.title', 'Parent-to-Parent Mediation', 'తల్లిదండ్రుల ప్రత్యక్ష మధ్యవర్తిత్వం'),
      description: translate(
        'services.parent.desc',
        'Direct offline coordination between respectable Telugu families with background checks and physical references.',
        'గౌరవనీయమైన తెలుగు కుటుంబాల మధ్య బ్యాక్‌గ్రౌండ్ చెక్ మరియు ప్రత్యక్ష చిరునామాలతో మధ్యవర్తిత్వం.'
      ),
      details: [
        translate('services.parent.detail1', 'Personal matchmaking coordinator assigned to your family', 'మీ కుటుంబానికి ప్రత్యేక మ్యాచ్ మేకింగ్ కోఆర్డినేటర్ కేటాయించబడును'),
        translate('services.parent.detail2', 'Gotram, nakshatram, and family status verification', 'గోత్రం, నక్షత్రం మరియు కుటుంబ స్థితిగతుల నిశిత ధృవీకరణ'),
        translate('services.parent.detail3', 'Secure exchange of contact numbers only after double family approvals', 'ఇరు వైపుల తల్లిదండ్రుల సమ్మతి పొందిన తర్వాతే ఫోన్ నంబర్ల మార్పిడి'),
        translate('services.parent.detail4', 'Facilitated introductory phone calls with guidelines', 'ఆఫ్ లైన్ లో మొదటి సారి ఫోన్ సంభాషణ ఏర్పాట్లు')
      ],
      iconName: 'Users'
    },
    {
      id: 'horoscope-matching',
      title: translate('services.astro.title', 'Astrological & Horoscope Matching', 'జాతక చక్రం మరియు నక్షత్ర అనుకూలత అమరిక'),
      description: translate(
        'services.astro.desc',
        'Expert verification of matching stars, gotram restrictions, and astrological chart compatibility by traditional scholars.',
        'అనుభవజ్ఞులైన పంచాంగ పండితుల ద్వారా నక్షత్ర బలాలు మరియు గోత్రాల అనుకూలత పరిశీలన.'
      ),
      details: [
        translate('services.astro.detail1', 'Exclusion of same-gotram matches (Sodara/Sodari gotram exceptions)', 'ఏక-గోత్రాన్ని నివారించడం (సహోదర గోత్రాల తనిఖీ ద్వారా)'),
        translate('services.astro.detail2', 'Review of kuja dosham and special matching star alignments', 'కుజ దోషం మరియు ప్రత్యేక నక్షత్ర దోషాల నివారణ భద్రత'),
        translate('services.astro.detail3', 'Traditional Telugu Guna Melanam calculations', 'సంప్రదాయ పద్ధతుల ప్రకారం తెలుగు గుణ మేలనం అనుకూలతలు'),
        translate('services.astro.detail4', 'Horoscope matching assistance led by senior advisors', 'సీనియర్ పండితుల అత్యంత ఖచ్చితమైన విశ్లేషణ పట్టికలు')
      ],
      iconName: 'Sparkles'
    },
    {
      id: 'kiran-tv-broadcast',
      title: translate('services.tv.title', 'Kiran TV Video Broadcast', 'కిరణ్ టీవీ ప్రొఫైల్ వీడియో ప్రసారం'),
      description: translate(
        'services.tv.desc',
        'Auspicious television presentation of candidate biodatas to thousands of viewers across AP, Telangana, and NRI segments.',
        'ఆంధ్రప్రదేశ్, తెలంగాణ మరియు ప్రపంచ వ్యాప్తంగా ఉన్న వేలాది వీక్షకులకు ప్రొఫైల్ వీడియో ప్రసారం.'
      ),
      details: [
        translate('services.tv.detail1', 'High-definition professional profile video presentation', 'ప్రొఫైల్ వీడియోను కిరణ్ టీవీలో రూపకల్పన చేసి ప్రదర్శించడం'),
        translate('services.tv.detail2', 'Broadcast of education, job, caste, and parent expectations', 'చదువు, ఉద్యోగం, కులము మరియు తల్లిదండ్రుల నికర అంచనాల ప్రసారం'),
        translate('services.tv.detail3', 'Instant callback handling from verified viewers', 'వీక్షకుల నుండి వచ్చే ప్రతిస్పందనల సురక్షితమైన ఆఫ్‌లైన్ కాల్స్'),
        translate('services.tv.detail4', 'Extended digital matching parade on our online channels', 'సోషల్ మీడియా మరియు వెబ్‌సైట్ ద్వారా వీక్షకుల విస్తృతి పెంపు')
      ],
      iconName: 'Video'
    },
    {
      id: 'premium-portfolio',
      title: translate('services.premium.title', 'Private Portfolio Management', 'రహస్య ప్రీమియం ప్రొఫైల్ నిర్వాహణ'),
      description: translate(
        'services.premium.desc',
        'Discreet matchmaking services designed for high-profile business families, elite doctors, software professionals, and NRIs.',
        'వ్యాపారవేత్తలు, డాక్టర్లు, సాఫ్ట్‌వేర్ ఉద్యోగులు మరియు విదేశాల్లో నివసించే NRIల కొరకు ప్రత్యేక సేవలు.'
      ),
      details: [
        translate('services.premium.detail1', '100% hidden portfolio searches', '100% బయోడేటా వివరాలు మరియు సమాచారాలు గోప్యంగా ఉంచబడును'),
        translate('services.premium.detail2', 'Strict photo-protection control features', 'కుటుంబ అనుమతి ఉంటేనే ఫొటోల ప్రదర్శన నియంత్రణ ఫీచర్'),
        translate('services.premium.detail3', 'Private match list shared on dynamic matching spreadsheets', 'ఎంపిక చేసిన సంబంధాలను ప్రత్యేక పట్టిక ద్వారా పంపడం'),
        translate('services.premium.detail4', 'Priority background reference verification', 'ప్రాధాన్యత ఆధారిత ప్రత్యక్ష ధృవీకరణ మరియు సీనియర్ సలహాలు')
      ],
      iconName: 'Shield'
    }
  ];

  // Icon helper mapping
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users size={32} className="text-stone-900" />;
      case 'Sparkles':
        return <Sparkles size={32} className="text-[#10b981]" />;
      case 'Video':
        return <Video size={32} className="text-emerald-700" />;
      case 'Shield':
        return <Shield size={32} className="text-[#10b981]" />;
      default:
        return <Users size={32} className="text-[#10b981]" />;
    }
  };

  const servicesList = getServices(t);

  return (
    <div className="bg-cream-50 font-sans">
      
      {/* Services Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold text-amber-200">
              {t('services.badge', 'What We Offer', 'మేము అందించే సేవలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('services.title', 'Our Elite Matchmaking Services', 'మా విశిష్ట మ్యాచ్ మేకింగ్ సేవలు')}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'services.subtitle',
              'Traditional values matched with contemporary profiles. Explore our personal matchmaking, astrological vetting, and broadcast features.',
              'సాంప్రదాయ విలువలతో కూడిన ధృవీకరించబడిన ప్రొఫైల్స్. మా వ్యక్తిగత సలహాలు, జాతక అనుకూలత గణనలు మరియు వీడియో బ్రాడ్‌కాస్ట్‌ల ద్వారా తగిన సంబంధాలు ఎంపిక చేసుకోండి.'
            )}
          </p>
        </div>
      </section>

      {/* Services Details Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-200 shadow-sm">
                  {getIcon(service.iconName)}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    {service.title}
                  </h3>
                  <p className="text-stone-705 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-stone-105 pt-5 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    {t('services.included', 'What is included:', 'సేవల్లో లభించే ప్రాధాన్యతలు:')}
                  </span>
                  <ul className="space-y-2 text-xs text-stone-605">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onTalkToExpertClick}
                  className="w-full py-3 bg-[#10b981]/5 hover:bg-[#10b981] text-[#10b981] hover:text-white font-bold text-xs rounded-xl border border-[#10b981]/20 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {t('services.talkExpert', 'Request Service Consultation', 'సేవల ఉచిత సంప్రదింపులను పొందండి')} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Safety & Quality Commitment banner */}
      <section className="py-12 bg-white relative border-t border-stone-100 mt-6 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 border border-stone-200/25 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#10b981] flex-shrink-0 border border-white/20">
              <Shield size={32} />
            </div>
            <div className="space-y-3 text-center md:text-left flex-grow">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                {t('services.safetyTitle', 'Our Non-Negotiable Matchmaking Safety Protocols', 'భద్రత మరియు ఆఫ్‌లైన్ మధ్యవర్తిత్వ నియమాలు')}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {t(
                  'services.safetyDesc',
                  'We maintain active identity reviews, check ancestral gotram trees to prevent intra-lineage clashes, and strictly manage candidate photographs. No unauthorized access is allowed to our databases, offering 100% peace of mind for parents seeking safe matches.',
                  'మేము ప్రతి ప్రొఫైల్ యొక్క గుర్తింపు పత్రాలను సరిచూస్తాము, ఏక గోత్ర వైరుధ్యాలు రాకుండా నక్షత్ర వృక్షాలను లెక్కిస్తాము, మరియు ఫొటోలను పబ్లిక్ చెదరగొట్టకుండా కాపాడుతాము. తల్లిదండ్రులకు 100% మనశ్శాంతిని అందించడమే మా లక్ష్యం.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services CTA */}
      <section className="py-12 bg-cream-100/50 text-center relative border-t border-stone-105">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            {t('services.helpTitle', 'Have Questions About Our Services?', 'మీకు మా సేవలపై ఏదైనా సందేహాలు కలవా?')}
          </h3>
          <p className="text-stone-605 text-xs sm:text-sm max-w-md mx-auto">
            {t(
              'services.helpDesc',
              'Our Senior Matrimony support partners are active and standing by to guide your search personally.',
              'మా సీనియర్ వివాహ సలహాదారులు ఎల్లప్పుడూ మీకు సహాయం చేయడానికి మరియు సరైన జోడిని వెతకడానికి సిద్ధంగా ఉన్నారు.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => navigateToPage('register')}
              className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              {t('services.ctaRegister', 'Register Candidate Profile', 'అభ్యర్థి ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
            </button>
            <button
              onClick={onTalkToExpertClick}
              className="px-5 py-2.5 border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              {t('services.ctaTalk', 'Talk to Matchmaking Expert', 'నిపుణులతో మాట్లాడండి')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
