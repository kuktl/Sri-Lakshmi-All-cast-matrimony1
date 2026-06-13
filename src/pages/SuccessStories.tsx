import React from 'react';
import { 
  Tv, 
  Smile 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MarriageCardsShowcase from '../components/MarriageCardsShowcase';

interface SuccessStoriesProps {
  navigateToPage: (page: string) => void;
}

export default function SuccessStories({ navigateToPage }: SuccessStoriesProps) {
  const { language, t } = useLanguage();

  const handleRegisterClick = () => {
    navigateToPage('register');
  };

  const steps = [
    { num: '01', title: t('reg.step1', 'Review Phase', 'పరిశీలన సమయం'), desc: t('success.step1d', 'Securely submit candidate bio, gotram, star, and career details.', 'అభ్యర్థి వివరాలు, గోత్రాలు మరియు విద్యార్హతలు సమర్పణ.') },
    { num: '02', title: t('reg.step2', 'Verification Call', 'ధృవీకరణ సంభాషణ'), desc: t('success.step2d', 'Our senior matchmakers record specific family requirements and limitations.', 'కుటుంబ సమ్మతి కోసం మరియు ప్రాధాన్యతలు గ్రహించుటకు ప్రత్యక్ష కాల్.') },
    { num: '03', title: t('reg.step3', 'Draft Shortlist Dispatch', 'బయోడేలా షార్ట్‌లిస్ట్'), desc: t('success.step3d', 'Receive manually vetted, compatible profile brochures directly.', 'సరిపడే సంబంధాల వివరాల పట్టికను వాట్సాప్ ద్వారా స్వీకరించండి.') },
    { num: '04', title: t('reg.step4', 'Family Introductions', 'కుటుంబ సంభాషణలు'), desc: t('success.step4d', 'Connect with mutual respect and permission to bridge family trust.', 'ఇరు కుటుంబాల సమక్షంలో మరియు అనుమతితో ముఖాముఖి సంభాషణలు.') },
    { num: '05', title: t('success.step5', 'Marriage Locked', 'పరిణయ బంధం ఖరారు'), desc: t('success.step5d', 'Complete traditional vows, share horizontal blessings, and start your story!', 'పవిత్ర బంధంతో ప్రయాణం మొదలుపెట్టి శుభకార్యం సాఫల్యం చేసుకోండి!') }
  ];

  return (
    <div className="bg-cream-50 font-sans pb-16 animate-none">
      
      {/* 1. Success Stories Custom Hero with traditional pattern background */}
      <section 
        className="relative bg-cover bg-center py-28 sm:py-32 text-center text-white overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(15, 10, 10, 0.88), rgba(28, 12, 12, 0.84)), url('https://i.pinimg.com/1200x/db/87/fe/db87fe1d60af1e555916513dcb87be54.jpg')"
        }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold text-amber-200">
              {t('success.badge', 'THEATRICAL GALLERY', 'మంగళ పరిణయాలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t('success.title', 'Cinematic Highlights & Success Stories', 'వివాహ మంగళ వేడుకలు & విజయ గాధలు')}
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'success.desc',
              'Watch the blissful unions and heartfelt smiles of happy families brought together by our meticulous vetting network.',
              'మా ప్రొఫైల్ పరిశీలన నెట్‌వర్క్ ద్వారా కలిసిన దంపతుల మధుర క్షణాలు మరియు కుటుంబాల ఆనంద అనుభూతులు తిలకించండి.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Large Cinematic Video Banner */}
      <section className="bg-stone-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6 relative z-10 w-full">
          <div className="w-12 h-12 rounded-full bg-white/10 text-[#10b981] flex items-center justify-center mx-auto shadow-md">
            <Tv size={22} className="stroke-[#10b981]" />
          </div>
          <h2 className="font-serif text-2.5xl sm:text-4xl font-extrabold text-amber-100">
            {t('success.whyCinTitle', 'Why We Emphasize Real Cinematic Portrayals', 'మేము ఎందుకు నిశ్చితమైన విజయ రికార్డులను చూపిస్తున్నాము?')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {t(
              'success.whyCinDesc',
              'Automatic matchmaking apps count with heartless percentages. We pair real families. Our matching directors personally coordinate traditional alliance rules, host verified meetings, and help capture these memories forever!',
              'కంప్యూటర్ యాప్‌లు హృదయం లేని శాతాలతో ప్రొఫైల్స్ లెక్కగడతాయి. మేము నిజమైన కుటుంబాలను కలుపుతాము. మా డైరెక్టర్లు స్వయంగా సంప్రదాయ నిబంధనలు లెక్కించి, నమ్మకమైన సంబంధాలను తనిఖీ చేసి మీకు అందిస్తారు.'
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto pt-4 text-xs font-bold text-emerald-400">
            <div>✓ {t('success.badge1', 'Handpicked Gotrams', 'గోత్రాల గుర్తింపు')}</div>
            <div>✓ {t('success.badge2', 'Verified Incomes', 'ఆదాయ ధృవీకరణ')}</div>
            <div>✓ {t('success.badge3', 'Astro compatibility', 'జాతక చక్రాల అమరిక')}</div>
            <div>✓ {t('success.badge4', 'Double-Vetted details', 'రెండు సార్లు తనిఖీ చేసినవి')}</div>
          </div>
        </div>
      </section>

      {/* 3. Lagna Patrika & Marriage Cards Gallery */}
      <section className="py-12 bg-white">
        <MarriageCardsShowcase />
      </section>

      {/* 4. Matrimonial Steps workflow blueprint */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
              {t('success.howWorks', 'HOW IT WORKS', 'పనిచేసే విధానం')}
            </span>
            <h3 className="font-serif text-2.5xl sm:text-3.5xl font-black text-stone-900">
              {t('success.stepsTitle', 'Simple Union Steps', 'పరిణయ బంధం కుదిరే పంచ సూత్రాలు')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {steps.map((st, i) => (
              <div key={i} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-3 shadow-xs">
                <span className="w-9 h-9 rounded-full bg-[#10b981] text-white font-serif font-black text-xs flex items-center justify-center mx-auto shadow-sm">
                  {st.num}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">{st.title}</h4>
                <p className="text-[#4b5563] text-[11px] leading-relaxed block">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Bottom Conversion Call to Action */}
      <section className="py-16 text-center bg-cream-50">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-1 text-emerald-800">
            <Smile size={26} className="text-[#10b981]" />
          </div>
          <h2 className="font-serif text-xl sm:text-2.5xl font-black text-stone-900">
            {t('success.nextStoryTitle', 'Become our next successful story', 'మా తదుపరి విజయగాథలో భాగస్వాములు కండి')}
          </h2>
          <p className="text-[#4b5563] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            {t(
              'success.nextStoryDesc',
              'Enroll your wedding preferences, get matched with verified candidates, and let our marriage officers lead you to a happy destination today.',
              'ఈరోజే మీ వివాహ ప్రాధాన్యతలను నమోదు చేయండి, ధృవీకరించబడిన వధూవరులతో సరిపోల్చండి, మరియు మా బృందం మిమ్మల్ని మంగళప్రదమైన బంధంలోకి నడిపించేలా చూసుకోండి!'
            )}
          </p>
          <button
            onClick={handleRegisterClick}
            className="px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer inline-block border-none"
          >
            {t('success.regBtn', 'Register Offline Profiles', 'ప్రొఫైల్ నమోదు చేసుకోండి')}
          </button>
        </div>
      </section>

    </div>
  );
}
