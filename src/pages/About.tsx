import React from 'react';
import { Heart, Compass, ShieldCheck, Target, Eye, Award, Check, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import KiranTVSection from '../components/KiranTVSection';

interface AboutPageProps {
  onTalkToExpertClick: () => void;
  navigateToPage: (page: string) => void;
}

export default function About({ onTalkToExpertClick, navigateToPage }: AboutPageProps) {
  const { language, t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [fathersMobileNumber, setFathersMobileNumber] = React.useState('');
  const [whatWorks, setWhatWorks] = React.useState('');
  const [caste, setCaste] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName);
    setComments(language === 'te' ? `${planName} పట్ల ఆసక్తి కలిగి ఉన్నారు.` : `Interested in registering for ${planName}.`);
    setIsContactModalOpen(true);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !fathersMobileNumber) return;

    const existingEnquiries = JSON.parse(localStorage.getItem('tr_contacts') || '[]');
    existingEnquiries.push({
      fullName,
      mobileNumber,
      fathersMobileNumber,
      whatWorks,
      caste,
      comments: `${comments} (Plan: ${selectedPlan})`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('tr_contacts', JSON.stringify(existingEnquiries));

    setSubmitted(true);

    const rawText = `Namaste Sri Lakshmi All Caste Matrimony,\n\nI want to activate the ${selectedPlan} membership plan.\n\n*My Details:*\n- Name: ${fullName}\n- Mobile: ${mobileNumber}\n- Father's Mobile: ${fathersMobileNumber}\n- Caste: ${caste}\n- Profession: ${whatWorks}\n- Specifications: ${comments}`;
    const encoded = encodeURIComponent(rawText);
    const whatsappUrl = `https://wa.me/919121594223?text=${encoded}`;
    
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Popup blocked: ", err);
    }

    setTimeout(() => {
      setSubmitted(false);
      setIsContactModalOpen(false);
      setFullName('');
      setMobileNumber('');
      setFathersMobileNumber('');
      setWhatWorks('');
      setCaste('');
      setComments('');
    }, 4000);
  };

  return (
    <div className="bg-cream-50 font-sans">
      
      {/* 1. Inner Page Hero */}
      <section 
        className="relative bg-cover bg-center py-28 sm:py-32 text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(15, 10, 10, 0.88), rgba(28, 12, 12, 0.84)), url('https://i.pinimg.com/736x/0d/95/13/0d9513ec441abf4d7a34e5e6c4d23695.jpg')"
        }}
      >
        {/* traditional corner vector overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none select-none text-gold-450">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold-550">
            <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold text-amber-200">
              {t('about.badge', 'Respected Legacies', 'గౌరవప్రదమైన వారసత్వాలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('about.title', 'About Sri Lakshmi All Caste Matrimony', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని గురించి')}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            {t(
              'about.subtitle',
              'Helping respectable Telugu families bond sacred threads of matrimonial alliances with authenticity.',
              'గౌరవనీయమైన తెలుగు కుటుంబాలు పవిత్రమైన పరిణయ బంధాలను అత్యంత విశ్వసనీయతతో కలుపుకోవడంలో సహాయం చేస్తున్నాము.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Heart size={14} className="fill-[#10b981] text-[#10b981]" />
                <span>{t('about.heritageBadge', 'Our Heritage & Origin', 'మా వంశపారంపర్యత మరియు పుట్టుక')}</span>
              </div>
              <h2 className="font-serif text-3xl font-extrabold text-[#10b981] leading-tight">
                {t('about.storyTitle', 'Our Story', 'మా కథ')}
              </h2>
              <div className="text-stone-705 text-sm sm:text-base leading-relaxed font-medium space-y-4">
                <p>
                  {t(
                    'about.storyDesc1_new',
                    'Sri Lakshmi All Caste Matrimony was started to help Telugu families find suitable bride and groom matches in a trusted, respectful, and family-friendly way. We believe marriage is not only about two people, but also about two families coming together with shared values, culture, and understanding.',
                    'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని తెలుగు కుటుంబాలకు నమ్మకమైన, గౌరవప్రదమైన మరియు కుటుంబ శ్రేయస్సును కోరుకునే విధంగా తగిన వధూవరులను కనుగొనడంలో సహాయపడటానికి ప్రారంభించబడింది. పెళ్లి అనేది ఇద్దరు వ్యక్తులకు సంబంధించినది మాత్రమే కాకుండా, ఒకే రకమైన విలువలు, సంస్కృతి మరియు అవగాహనతో కూడిన రెండు కుటుంబాల కలయిక అని మేము విశ్వసిస్తాము.'
                  )}
                </p>
                <p>
                  {t(
                    'about.storyDesc2_new',
                    'We support families across Telangana and Andhra Pradesh with genuine profiles, verified home contacts, and personal matchmaking guidance. Our team carefully understands caste/community preference, gotram details, family background, education, profession, location, and match expectations before suggesting suitable profiles.',
                    'తెలంగాణ మరియు ఆంధ్రప్రదేశ్ అంతటా ఉన్న కుటుంబాలకు నిజమైన ప్రొఫైల్స్, ధృవీకరించబడిన గృహ పరిచయాలు మరియు వ్యక్తిగత మ్యాచ్ మేకింగ్ మార్గదర్శకత్వంతో మేము మద్దతు ఇస్తున్నాము. సంబంధాలను సూచించే ముందు మా బృందం కుల/కమ్యూనిటీ ప్రాధాన్యత, గోత్ర వివరాలు, కుటుంబ నేపథ్యం, విద్య, వృత్తి, ప్రాంతం మరియు మ్యాచ్ అంచనాలను జాగ్రత్తగా అర్థం చేసుకుంటుంది.'
                  )}
                </p>
                <p className="text-stone-605 text-xs sm:text-sm">
                  {t(
                    'about.storyDesc3_new',
                    'With a balance of traditional Telugu values and modern matchmaking support, Sri Lakshmi All Caste Matrimony helps families move forward with confidence, privacy, and trust.',
                    'సాంప్రదాయ తెలుగు విలువలు మరియు ఆధునిక మ్యాచ్ మేకింగ్ సదుపాయాల సమతుల్యతతో, శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని కుటుంబాలు నమ్మకం, గోప్యత మరియు విశ్వాసంతో ముందుకు సాగడానికి సహాయపడుతుంది.'
                  )}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 relative font-sans">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-double border-stone-200 aspect-[4/3] sm:aspect-square bg-stone-100">
                <img 
                  src="/Users/abhiram/Documents/work/sri-lakshmi-all-caste-matrimony-main-website/assets/images.jpg"
                  alt="images" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5. Statistics Section */}
      <section className="py-12 bg-cream-100/40 border-y border-stone-200/40 font-sans">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center justify-between space-y-2 min-h-[160px]">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 shrink-0">
                <Award size={20} />
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">7+ Years Experience</span>
                <span className="block text-stone-800 text-xs font-bold mt-1">Years of Trustworthy Service</span>
                <span className="block text-stone-500 text-[11px] mt-0.5">Serving Telugu families since 2019</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center justify-between space-y-2 min-h-[160px]">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 shrink-0">
                <Heart size={20} className="fill-rose-500 text-rose-500" />
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">80+ Matches</span>
                <span className="block text-stone-800 text-xs font-bold mt-1">Successful Matrimonial Unions</span>
                <span className="block text-stone-500 text-[11px] mt-0.5">Happy families successfully united</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center justify-between space-y-2 min-h-[160px]">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">1,000+ Profiles</span>
                <span className="block text-stone-800 text-xs font-bold mt-1">Verified Candidates Registered</span>
                <span className="block text-stone-500 text-[11px] mt-0.5">Vetted family backgrounds</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center justify-between space-y-2 min-h-[160px]">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-[#7c3b3b] leading-tight">2+ Cities Served</span>
                <span className="block text-stone-800 text-xs font-bold mt-1">Regions & Overseas Segments</span>
                <span className="block text-stone-500 text-[11px] mt-0.5">TS, AP & global Telugu NRI network</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Kiran TV Broadcast Feature Block with default layout to match the Home page */}
      <KiranTVSection layoutVariant="default" />

      {/* 3. Our Mission & Vision Grid */}
      <section className="py-16 bg-cream-50/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Our Mission */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-stone-200 flex flex-col items-start space-y-4 group hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 text-emerald-800">
                <Target size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {t('about.missionTitle', 'Our Mission', 'మా లక్ష్యం')}
              </h3>
              <p className="text-stone-705 text-sm sm:text-base leading-relaxed font-semibold">
                {t(
                  'about.missionDesc1',
                  'To help Telugu families find verified, suitable, and community-based matches with personal guidance and privacy-focused support.',
                  'వ్యక్తిగత మార్గదర్శకత్వం మరియు గోప్యతతో కూడిన సంపూర్ణ మద్దతుతో తెలుగు కుటుంబాలకు ధృవీకరించబడిన, తగిన మరియు వారి సొంత సామాజిక కుల సంబంధాలను కనుగొనడం.'
                )}
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                {t(
                  'about.missionDesc2',
                  'By maintaining rigorous background profiles and checking gotram details meticulously, we ensure both brides and grooms are vetted through a respectable community lens.',
                  'కచ్చితమైన కుటుంబ నేపథ్య వివరాలను మరియు గోత్రాలను నిశితంగా పరిశీలించడం ద్వారా, మేము వధూవరులను సమాజ పద్ధతులు మరియు గౌరవాలకు అనుగుణంగా ధృవీకరిస్తాము.'
                )}
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-stone-200 flex flex-col items-start space-y-4 group hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 text-[#10b981]">
                <Eye size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {t('about.visionTitle', 'Our Vision', 'మా విజన్')}
              </h3>
              <p className="text-stone-705 text-sm sm:text-base leading-relaxed font-semibold">
                {t(
                  'about.visionDesc1',
                  'To become one of the most trusted Telugu marriage bureau services for families across Telangana, Andhra Pradesh, and Telugu communities worldwide.',
                  'తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు ప్రపంచవ్యాప్టానికి ఉన్న తెలుగు కుటుంబాలకు అత్యంత విశ్వసనీయమైన వివాహ సేవా సంస్థగా ఎదగడం.'
                )}
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                {t(
                  'about.visionDesc2',
                  'We envision a digitally advanced offline match-making portal that streamlines search processes while keeping private bio-data fully protected against public exposure.',
                  'వ్యక్తిగత బయోడేటా మరియు ఫోటోలను కాపాడుతూ, శోధన ప్రక్రియలను సులభతరం చేసే డిజిటల్ మ్యాట్ పెర్ఫార్మెన్స్ ప్లాట్‌ఫారమ్‌ను మేము రూపొందిస్తున్నాము.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>



      {/* 4. Why Telugu Families Choose Us */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-stone-900 tracking-tight">
              {t('about.chooseUs', 'Why Telugu Families Choose Us', 'తెలుగు కుటుంబాలు మమ్మల్ని ఎందుకు ఎంచుకుంటారు?')}
            </h2>
            <div className="w-12 h-0.5 bg-[#10b981] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-cream-50/50 rounded-2xl border border-stone-200">
              <Award size={20} className="text-[#10b981] mb-3" />
              <h4 className="font-serif font-bold text-base text-stone-900">
                {t('about.choose1Title', 'Gotram & Astrological Vetting', 'గోత్రం మరియు జాతక అనుకూలత పరిశీలన')}
              </h4>
              <p className="text-[#4b5563] text-xs mt-2 leading-relaxed">
                {t(
                  'about.choose1Desc',
                  'We carry out physical gotram compatibility analysis so that candidate portfolios match family requirements cleanly.',
                  'మేము పూర్తి సంప్రదాయాల ప్రకారం గోత్రాలు మరియు జాతకాలను విశ్లేషించి వధూవరుల వివరాలను కుటుంబ అవసరాలకు గురిపెట్టి సరిపోలుస్తాము.'
                )}
              </p>
            </div>

            <div className="p-6 bg-cream-50/50 rounded-2xl border border-stone-200">
              <ShieldCheck size={20} className="text-emerald-605 mb-3" />
              <h4 className="font-serif font-bold text-base text-stone-900">
                {t('about.choose2Title', '100% Identity Verification', '100% గుర్తింపు ధృవీకరణ')}
              </h4>
              <p className="text-[#4b5563] text-xs mt-2 leading-relaxed">
                {t(
                  'about.choose2Desc',
                  'Every listed biodata submits identity verification proofs, protecting your search from deceptive agents.',
                  'కార్డులో చేరిన ప్రతి ఒక్క బయోడేటా గుర్తింపు పత్రాల తనిఖీకి లోబడి ఉంటుంది, తద్వారా మోసపూరిత సమాచారాల నుండి మిమ్మల్ని రక్షిస్తుంది.'
                )}
              </p>
            </div>

            <div className="p-6 bg-cream-50/50 rounded-2xl border border-stone-200">
              <Heart size={20} className="text-[#10b981] mb-3" />
              <h4 className="font-serif font-bold text-base text-stone-900">
                {t('about.choose3Title', 'Telugu Lineage Expertise', 'తెలుగు వంశావళి ప్రత్యేక అనుభవం')}
              </h4>
              <p className="text-[#4b5563] text-xs mt-2 leading-relaxed">
                {t(
                  'about.choose3Desc',
                  'We have built deep community networks across Reddy, Kamma, Kapu, Goud, Arya Vysya, Yadav, Padmashali, and Balija families in AP, Telangana, and NRI centers globally.',
                  'AP, తెలంగాణ మరియు ప్రపంచ వ్యాప్తంగా ఉన్న రెడ్డి, కమ్మ, కాపు, గౌడ్, ఆర్య వైశ్య, యాదవ్, పద్మశాలి, బలిజ మొదలైన కుటుంబాలతో మాకు లోతైన సంబంధాలు ఉన్నాయి.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Matchmaking Approach */}
      <section className="py-16 bg-cream-50/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
              {t('about.method', 'Our Methodology', 'మా సురక్షితమైన పని విధానం')}
            </span>
            <h2 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-stone-900 tracking-tight">
              {t('about.approachTitle', 'Our Matchmaking Approach', 'మా మ్యాచ్ మేకింగ్ విధానం')}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-3">
              {t(
                'about.approachDesc',
                'We align standard modern search filters with traditional offline mediation parameters.',
                'మేము సాంప్రదాయ ఆఫ్ లైన్ మధ్యవర్తిత్వ పద్ధతులను ఆధునిక శోధన ఫిల్టర్‌లతో సమన్వయం చేస్తాము.'
              )}
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            
            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-100">
              <span className="text-lg font-serif font-bold text-emerald-600">A</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {t('about.stepA', 'Intimate Family Consultation', 'వ్యక్తిగత కుటుంబ సంప్రదింపులు')}
                </h4>
                <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                  {t(
                    'about.stepADesc',
                    'We talk to parents and guardians individually to capture nuanced expectations, location preferences, and gotrams before suggesting profiles.',
                    'మేము తల్లిదండ్రులు మరియు పెద్దలతో వ్యక్తిగతంగా మాట్లాడి వారి అవసరాలు, నివాస ప్రాధాన్యతలు మరియు గోత్రాలను అర్థం చేసుకుని మాత్రమే ప్రొఫైల్‌లను సూచిస్తాము.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-100">
              <span className="text-lg font-serif font-bold text-emerald-600">B</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {t('about.stepB', 'Curated Matching Suggestions', 'ప్రత్యేకంగా ఎంపిక చేయబడిన సూచనలు')}
                </h4>
                <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                  {t(
                    'about.stepBDesc',
                    'Instead of generic automated matching algorithms, our matchmaking expert reviews candidate profiles to make manual recommendations.',
                    'సాధారణ కంప్యూటర్ అల్గారిథమ్‌ల వలె కాకుండా, మా సీనియర్ మ్యాచ్ మేకింగ్ నిపుణుడు స్వయంగా ప్రొఫైల్‌లను పరిశీలించి తగిన సూచనలు సిఫార్సు చేస్తారు.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-100">
              <span className="text-lg font-serif font-bold text-emerald-600">C</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {t('about.stepC', 'Respectful Offline Coordination', 'రూఢీ అయిన ఆఫ్ లైన్ సమన్వయం')}
                </h4>
                <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                  {t(
                    'about.stepCDesc',
                    'We schedule initial phone calls or personal meetings between families in a respectful, supportive layout.',
                    'మేము అత్యంత గౌరవప్రదమైన మరియు సురక్షితమైన వాతావరణంలో ఇరు కుటుంబాల మధ్య ఫోన్ సంభాషణలు లేదా ప్రత్యక్ష సమావేశాలను ఏర్పాటు చేస్తాము.'
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Trust & Privacy Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 w-full">
          <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 border border-stone-200/25 shadow-2xl relative overflow-hidden">
            
            {/* flower background */}
            <div className="absolute inset-x-0 inset-y-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 text-[#10b981]">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                {t('about.privacyTitle', 'Absolute Trust & Privacy Control', 'సంపూర్ణ విశ్వసనీయత మరియు వ్యక్తిగత గోప్యత నియంత్రణ')}
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                {t(
                  'about.privacyDesc',
                  'Unlike local matrimonials, we do not showcase sensitive information like phone numbers, residential addresses, or precise workplace names openly. All match queries and astrological bio charts are handled privately, protected under strict security guidelines.',
                  'ఇతర వెబ్‌సైట్‌ల వలె కాకుండా, మేము ఫోన్ నంబర్లు, ఇంటి చిరునామాలు లేదా ఉద్యోగ కార్యాలయాల పేర్లను బహిరంగంగా ప్రదర్శించము. అన్ని విచారణలు మరియు జాతక వివరాలు అత్యంత రహస్యంగా ఉంచబడతాయి.'
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2 text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">
                <span>{t('about.privPhotos', '✓ Private Photos', '✓ వ్యక్తిగత ఫోటోల రక్షణ')}</span>
                <span className="text-white/20">•</span>
                <span>{t('about.privFamily', '✓ Verified Family Identity', '✓ ధృవీకరించబడిన కుటుంబ గుర్తింపు')}</span>
                <span className="text-white/20">•</span>
                <span>{t('about.privScraping', '✓ No Automated Scraping', '✓ సురక్షిత కంప్యూటర్ భద్రత')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-12 bg-cream-100/50 text-center relative">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            {t('about.ctaTitle', "Let's Help Find Your Perfect Match", 'తగిన జంటను కనుగొనడంలో మేము మీకు సహాయం చేస్తాము')}
          </h3>
          <p className="text-stone-650 text-xs sm:text-sm max-w-lg mx-auto">
            {t(
              'about.ctaDesc',
              'Take your prospective first steps with Sri Lakshmi All Caste Matrimony. Reach out to our senior matchmakers or register free of charge today.',
              'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోనితో మీ మొదటి అడుగు ముందుకు వేయండి. మా సీనియర్ మ్యాచ్ మేకర్లను సంప్రదించండి లేదా ఈరోజే ఉచితంగా నమోదు చేసుకోండి.'
            )}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-3">
            <button
              onClick={() => navigateToPage('register')}
              className="px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-stone-100 font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {t('about.ctaRegister', 'Register Your Profile', 'మీ ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
            </button>
            <button
              onClick={onTalkToExpertClick}
              className="px-6 py-3 border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {t('about.ctaTalk', 'Talk to Matchmaking Expert', 'మ్యాకర్‌ నిపుణులతో మాట్లాడండి')}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal Overlay */}
      {isContactModalOpen && (
        <div id="membership-contact-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl animate-fade-in font-sans">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 px-6 py-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                  {t('contact.modalTitle', 'Register for ' + selectedPlan, selectedPlan + ' నమోదు చేసుకోండి')}
                </h3>
                <p className="text-[11px] text-stone-300">
                  {t('contact.modalSubtitle', 'Provide details to activate subscription', 'సభ్యత్వం సేవలను ప్రారంభించడానికి వివరాలు నమోదు చేయండి')}
                </p>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-white/80 hover:text-white hover:rotate-90 transition-transform duration-300 border-none bg-transparent cursor-pointer p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto font-sans">
              {submitted ? (
                <div className="bg-emerald-50 rounded-2xl border border-emerald-250 py-12 px-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto text-[#10b981] shadow-md border border-emerald-100 animate-bounce">
                    <Check size={28} />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-stone-900">
                    {t('contact.sentOk', 'Thank You! Enquiry Sent', 'ధన్యవాదాలు! మీ వివరాలు విజయవంతంగా పంపబడ్డాయి')}
                  </h4>
                  <p className="text-stone-650 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-semibold">
                    {t('contact.receivedText', 'We have received your enquiry for', 'మేము మీ విచారణను విజయవంతంగా స్వీకరించాము -')}{' '}
                    <strong className="text-stone-900">{fullName}</strong>.{' '}
                    {t('contact.reachBackText', 'Our matchmaking team will reach out directly to you at', 'మా బృందం మిమ్మల్ని త్వరలోనే ఈ మొబైల్ నంబర్ వద్ద సంప్రదిస్తారు:')}{' '}
                    <strong className="text-stone-900">{mobileNumber}</strong>.{' '}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.fullName', 'Full Name', 'పూర్తి పేరు')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.fullNamePlaceholder', "Enter candidate's or parent's full name", 'అభ్యర్థి లేదా తల్లిదండ్రుల పూర్తి పేరు दर्ज చేయండి')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.mobNo', 'Mobile Number', 'మొబైల్ నంబర్')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,12}"
                        placeholder={t('contact.tenDigitPlaceholder', '10-digit mobile number', '10 అంకెల మొబైల్ నంబర్')}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.fathersMobNo2', "Father's Mobile Number", 'తండ్రి యొక్క మొబైల్ నంబర్')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,12}"
                        placeholder={t('contact.fMobPlaceholder', "Father's or Guardian's mobile number", 'తండ్రి లేదా రక్షకుని మొబైల్ నంబర్')}
                        value={fathersMobileNumber}
                        onChange={(e) => setFathersMobileNumber(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#374151] uppercase mb-1">
                        {t('contact.jobTitle', 'What he/she works', 'అభ్యర్థి నియామకం / ఉద్యోగం')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.jobPlaceholder', 'e.g. Software Engineer in Hyderabad', 'ఉదా. హైదరాబాదులో సాఫ్ట్‌వేర్ ఇంజనీర్')}
                        value={whatWorks}
                        onChange={(e) => setWhatWorks(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.caste', 'Caste *', 'కులం *')}
                      </label>
                      <select
                        required
                        value={caste}
                        onChange={(e) => setCaste(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-[#1c1917] cursor-pointer font-bold"
                      >
                        <option value="" disabled>
                          {t('contact.selectCaste', 'Select Caste', 'కులం ఎంచుకోండి')}
                        </option>
                        {[
                          { value: 'Reddy', labelTe: 'రెడ్డి', labelEn: 'Reddy' },
                          { value: 'Kamma', labelTe: 'కమ్మ', labelEn: 'Kamma' },
                          { value: 'Kapu', labelTe: 'కాపు', labelEn: 'Kapu' },
                          { value: 'Goud', labelTe: 'గౌడ్', labelEn: 'Goud' },
                          { value: 'Brahmin', labelTe: 'బ్రాహ్మణ', labelEn: 'Brahmin' },
                          { value: 'Naidu', labelTe: 'నాయుడు', labelEn: 'Naidu' },
                          { value: 'Velama', labelTe: 'వెలమ', labelEn: 'Velama' },
                          { value: 'Arya Vysya', labelTe: 'ఆర్య వైశ్య', labelEn: 'Arya Vysya' },
                          { value: 'Padmashali', labelTe: 'పద్మశాలి', labelEn: 'Padmashali' },
                          { value: 'Yadav', labelTe: 'యాదవ్', labelEn: 'Yadav' },
                          { value: 'Mudiraj', labelTe: 'ముదిరాజ్', labelEn: 'Mudiraj' },
                          { value: 'Mala', labelTe: 'మాల', labelEn: 'Mala' },
                          { value: 'Madiga', labelTe: 'మాదిగ', labelEn: 'Madiga' },
                          { value: 'Other', labelTe: 'ఇతర కులాలు / అన్ని కులాలు', labelEn: 'All Castes / Other' },
                        ].map((c) => (
                          <option key={c.value} value={c.value}>
                            {language === 'te' ? c.labelTe : c.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.comments', 'Comments / Specifications', 'వ్యాఖ్యలు / ప్రత్యేక అభ్యర్థనలు')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('contact.commentsPlaceholder', 'Please write comments about subclass, expectations, gotram limits...', 'దయచేసి ఉపకులం, ఎత్తు, గోత్ర పరిధులు మరియు ఇతర అంచనాల గురించి రాయండి...')}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(false)}
                      className="flex-1 py-3 border border-stone-300 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-50 transition-all cursor-pointer text-center font-sans"
                    >
                      {t('contact.cancel', 'Cancel', 'రద్దు చేయి')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 font-sans"
                    >
                      <Send size={14} /> {t('contact.submitBtn', 'Submit Details', 'వివరాలను సమర్పించండి')}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
