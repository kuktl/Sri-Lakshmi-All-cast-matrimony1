import React, { useState } from 'react';
import { 
  Trees, 
  ShieldCheck, 
  Wheat, 
  Sun, 
  Award, 
  Layers, 
  Sparkles,
  Phone,
  MessageCircle,
  Users,
  CheckCircle2,
  X,
  Gem
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Channel {
  id: string;
  name: string;
  community: string;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  bgGradient: string;
  activeProfiles: string;
  bridesCount: string;
  groomsCount: string;
  coordinator: {
    name: string;
    phone: string;
    photo: string;
    gotramsVetted: number;
  };
  heritage: string;
  matchSpeed: string;
  accentColor: string;
  ctaText?: string;
}

export default function MatrimonialChannels() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isJoinedSuccessfully, setIsJoinedSuccessfully] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [caste, setCaste] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const castesList = [
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
  ];

  const channels: Channel[] = [
    {
      id: 'goud',
      name: t('goud.name', 'Goud Matrimony', 'గౌడ్ మ్యాట్రిమోని'),
      community: 'Goud',
      icon: Trees,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      bgGradient: 'from-emerald-50 to-teal-50/30',
      activeProfiles: '14,850+',
      bridesCount: '7,120+',
      groomsCount: '7,730+',
      coordinator: {
        name: t('goud.coord', 'Srimati G. Lakshmi (Goud Coordinator)', 'శ్రీమతి జి. లక్ష్మి (గౌడ్ కోఆర్డినేటర్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1507152832244-10d49c7def8d?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 340
      },
      heritage: t(
        'goud.heritage', 
        'Find suitable Goud bride and groom profiles from verified Telugu families. We support families with community preference, gotram details, education, profession, and location-based match search.', 
        'ధృవీకరించబడిన తెలుగు కుటుంబాల నుండి తగిన గౌడ్ వధూవరుల ప్రొఫైల్‌లను కనుగొనండి. మేము కమ్యూనిటీ ప్రాధాన్యత, గోత్రం వివరాలు, విద్యా ఉద్యోగాల ప్రొఫెషనల్ వివరాలు మరియు లొకేషన్ ఆధారిత శోధనతో సహాయాన్ని అందిస్తాము.'
      ),
      matchSpeed: t('goud.speed', 'Same Gotram Verification (Excellent Match Speed)', 'ఒకే గోత్రం వెరిఫికేషన్ (వేగవంతమైన మ్యాచ్ స్పీడ్)'),
      accentColor: 'emerald',
      ctaText: t('goud.cta', 'View Goud Profiles', 'గౌడ్ ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'reddy',
      name: t('reddy.name', 'Reddy Matrimony', 'రెడ్డి మ్యాట్రిమోని'),
      community: 'Reddy',
      icon: ShieldCheck,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      bgGradient: 'from-rose-50 to-orange-50/30',
      activeProfiles: '11,200+',
      bridesCount: '5,340+',
      groomsCount: '5,860+',
      coordinator: {
        name: t('reddy.coord', 'Sri R. Janardhan Reddy (Reddy Desk Lead)', 'శ్రీ ఆర్. జనార్దన్ రెడ్డి (రెడ్డి డెస్క్ లీడ్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 195
      },
      heritage: t(
        'reddy.heritage', 
        'Connect with genuine Reddy bride and groom profiles from traditional and modern Telugu families. Our team helps with verified family contacts and suitable match suggestions.', 
        'సాంప్రదాయ మరియు ఆధునిక తెలుగు కుటుంబాల నుండి నిజమైన రెడ్డి వధూవరుల ప్రొఫైల్‌లతో కనెక్ట్ అవ్వండి. మా బృందం ధృవీకరించబడిన కుటుంబ పరిచయాలు మరియు తగిన మ్యాచ్ సూచనలతో సహాయం చేస్తుంది.'
      ),
      matchSpeed: t('reddy.speed', 'Direct Gotram Vetting (Fast Track)', 'ప్రత్యక్ష గోత్రం వెరిఫికేషన్ (వేగవంతమైన సేవ)'),
      accentColor: 'rose',
      ctaText: t('reddy.cta', 'View Reddy Profiles', 'రెడ్డి ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'kamma',
      name: t('kamma.name', 'Kamma Matrimony', 'కమ్మ మ్యాట్రిమోని'),
      community: 'Kamma',
      icon: Wheat,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      bgGradient: 'from-amber-50 to-yellow-50/30',
      activeProfiles: '10,400+',
      bridesCount: '4,950+',
      groomsCount: '5,450+',
      coordinator: {
        name: t('kamma.coord', 'Srimati K. Vasundhara (Kamma Desk Coordinator)', 'శ్రీమతి కె. వసుంధర (కమ్మ డెస్క్ కోఆర్డినేటర్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1581404917879-53e192591dba?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 210
      },
      heritage: t(
        'kamma.heritage', 
        'Explore Kamma bride and groom profiles based on education, profession, family background, location, and personal preferences.', 
        'విద్య, వృత్తి, కుటుంబ నేపథ్యం, ​​ప్రాంతం మరియు వ్యక్తిగత ప్రాధాన్యతల ఆధారంగా కమ్మ వధూవరుల ప్రొఫైల్‌లను అన్వేషించండి.'
      ),
      matchSpeed: t('kamma.speed', 'Global Ancestral Search Enabled', 'ప్రపంచవ్యాప్త పూర్వీకుల శోధన సదుపాయం'),
      accentColor: 'amber',
      ctaText: t('kamma.cta', 'View Kamma Profiles', 'కమ్మ ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'kapu',
      name: t('kapu.name', 'Kapu Matrimony', 'కాపు మ్యాట్రిమోని'),
      community: 'Kapu',
      icon: Sun,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      bgGradient: 'from-indigo-50 to-blue-50/30',
      activeProfiles: '9,950+',
      bridesCount: '4,710+',
      groomsCount: '5,240+',
      coordinator: {
        name: t('kapu.coord', 'Sri K. Venkata Rao (Kapu Regional Head)', 'శ్రీ కె. వెంకటరావు (కాపు ప్రాంతీయ అధిపతి)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 180
      },
      heritage: t(
        'kapu.heritage', 
        'Find Kapu bride and groom matches from trusted Telugu families with personal matchmaking support and privacy-focused communication.', 
        'వ్యక్తిగత మ్యాచ్ మేకింగ్ మద్దతు మరియు గోప్యతా పరమైన సంప్రదింపులతో విశ్వసనీయ తెలుగు కుటుంబాల నుండి కాపు వధూవరుల సంబంధాలను కనుగొనండి.'
      ),
      matchSpeed: t('kapu.speed', 'Instant Household Peer Audit', 'తక్షణ గృహ సరిపోలిక ఆడిట్'),
      accentColor: 'indigo',
      ctaText: t('kapu.cta', 'View Kapu Profiles', 'కాపు ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'brahmin',
      name: t('brahmin.name', 'Brahmin Matrimony', 'బ్రాహ్మణ మ్యాట్రిమోని'),
      community: 'Brahmin',
      icon: Sparkles,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      bgGradient: 'from-yellow-50 to-amber-50/30',
      activeProfiles: '6,500+',
      bridesCount: '3,110+',
      groomsCount: '3,390+',
      coordinator: {
        name: t('brahmin.coord', 'Sri M. Sastry (Brahmin Desk Coordinator)', 'శ్రీ ఎం. శాస్త్రి (బ్రాహ్మణ డెస్క్ కోఆర్డినేటర్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1542343633-ce3256f2183e?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 220
      },
      heritage: t(
        'brahmin.heritage', 
        'Search suitable Brahmin bride and groom profiles with support for family background, gotram details, education, profession, and traditional preferences.', 
        'కుటుంబ నేపథ్యం, ​​గోత్రం వివరాలు, చదువు, ఉద్యోగం మరియు సాంప్రదాయ ప్రాధాన్యతలతో తగిన బ్రాహ్మణ వధూవరుల ప్రొఫైల్‌లను శోధించండి.'
      ),
      matchSpeed: t('brahmin.speed', 'Guna Melanam Checking', 'పూర్తి గుణ మేలనం అనుకూలత పరిశీలన'),
      accentColor: 'amber',
      ctaText: t('brahmin.cta', 'View Brahmin Profiles', 'బ్రాహ్మణ ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'naidu',
      name: t('naidu.name', 'Naidu Matrimony', 'నాయుడు మ్యాట్రిమోని'),
      community: 'Naidu',
      icon: Award,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      bgGradient: 'from-sky-50 to-cyan-50/30',
      activeProfiles: '7,200+',
      bridesCount: '3,400+',
      groomsCount: '3,800+',
      coordinator: {
        name: t('naidu.coord', 'Sri N. Prabhakar (Naidu Desk Head)', 'శ్రీ ఎన్. ప్రభాకర్ (నాయుడు డెస్క్ అధిపతి)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 165
      },
      heritage: t(
        'naidu.heritage', 
        'Discover Naidu bride and groom profiles from Telugu families across different locations, professions, and family backgrounds.', 
        'వివిధ ప్రాంతాలు, వృత్తులు మరియు కుటుంబ నేపథ్యాల నుండి తెలుగు కుటుంబాల నాయుడు వధూవరుల ప్రొఫైల్‌లను కనుగొనండి.'
      ),
      matchSpeed: t('naidu.speed', 'Deccan Regional Gotram Matchmaking', 'దక్కన్ ప్రాంతీయ గోత్రం మ్యాచ్ మేకింగ్'),
      accentColor: 'sky',
      ctaText: t('naidu.cta', 'View Naidu Profiles', 'నాయుడు ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'velama',
      name: t('velama.name', 'Velama Matrimony', 'వెలమ మ్యాట్రిమోని'),
      community: 'Velama',
      icon: Layers,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      bgGradient: 'from-orange-50 to-amber-50/20',
      activeProfiles: '5,900+',
      bridesCount: '2,820+',
      groomsCount: '3,080+',
      coordinator: {
        name: t('velama.coord', 'Srimati V. Anuradha (Velama Desk Lead)', 'శ్రీమతి వి. అనురాధ (వెలమ డెస్క్ లీడ్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 130
      },
      heritage: t(
        'velama.heritage', 
        'Find suitable Velama bride and groom profiles with verified family contact support and community-based matchmaking guidance.', 
        'ధృవీకరించబడిన కుటుంబ పరిచయ మద్దతు మరియు కమ్యూనిటీ ఆధారిత మ్యాచ్ మేకింగ్ మార్గదర్శకత్వంతో తగిన వెలమ వధూవరుల ప్రొఫైల్‌లను కనుగొనండి.'
      ),
      matchSpeed: t('velama.speed', 'Strict Verification (Secure Match Speed)', 'ఖచ్చితమైన ధృవీకరణ విధానం (సురక్షిత మ్యాచ్ స్పీడ్)'),
      accentColor: 'orange',
      ctaText: t('velama.cta', 'View Velama Profiles', 'వెలమ ప్రొఫైల్స్ చూడండి')
    },
    {
      id: 'vysya',
      name: t('vysya.name', 'Arya Vysya Matrimony', 'ఆర్య వైశ్య మ్యాట్రిమోని'),
      community: 'Arya Vysya',
      icon: Gem,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      bgGradient: 'from-purple-50 to-indigo-50/20',
      activeProfiles: '7,800+',
      bridesCount: '3,820+',
      groomsCount: '3,980+',
      coordinator: {
        name: t('vysya.coord', 'Srimati P. Vasavi (Arya Vysya Desk Head)', 'శ్రీమతి పి. వాసవి (ఆర్య వైశ్య డెస్క్ హెడ్)'),
        phone: '+919121594223',
        photo: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=150&auto=format&fit=crop&q=80',
        gotramsVetted: 145
      },
      heritage: t(
        'vysya.heritage', 
        'Explore Arya Vysya bride and groom profiles based on family values, education, profession, location, and community preferences.', 
        'కుటుంబ విలువలు, విద్య, వృత్తి, ప్రాంతం మరియు కమ్యూనిటీ ప్రాధాన్యతలపై ఆధారపడి ఆర్య వైశ్య వధూవరుల ప్రొఫైల్‌లను అన్వేషించండి.'
      ),
      matchSpeed: t('vysya.speed', 'Strict Gotram-Matches Secured', 'కచ్చితమైన గోత్ర సరిపోలికలు (భద్రతా ప్రమాణాలు లెక్కింపబడినవి)'),
      accentColor: 'purple',
      ctaText: t('vysya.cta', 'View Arya Vysya Profiles', 'ఆర్య వైశ్య ప్రొఫైల్స్ చూడండి')
    }
  ];

  const openChannelModal = (ch: Channel) => {
    setLanguage('te');
    setSelectedChannel(ch);
    setIsJoinedSuccessfully(false);
    setCandidateName('');
    setCandidatePhone('');
    setFatherPhone('');
    setCaste(ch.community);
  };

  const handleJoinChannel = (e: React.FormEvent) => {
    e.preventDefault();
    setIsJoinedSuccessfully(true);
    
    const message = `Hello Sri Lakshmi Matrimony, I want to join the ${selectedChannel?.name || caste} Desk.\n\n` +
      `Candidate Name: ${candidateName}\n` +
      `Mobile Number: ${candidatePhone}\n` +
      `Father's Mobile Number: ${fatherPhone}\n` +
      `Caste: ${caste}`;
       
    const encodedMessage = encodeURIComponent(message);
    const phone = '917386915677';
    
    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      setSelectedChannel(null);
    }, 1500);
  };

  return (
    <section id="telugu-matrimonial-channels" className="py-20 bg-cream-50 font-sans border-b border-gold-250/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1.5px] w-8 bg-[#10b981]"></span>
            <span className="text-[#10b981] text-xs tracking-widest uppercase font-bold">
              {t('channels.badge', 'Community Matrimony Services', 'కమ్యూనిటీ మ్యాట్రిమోని సేవలు')}
            </span>
            <span className="h-[1.5px] w-8 bg-[#10b981]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {t('channels.title', 'Find Matches from Trusted Telugu Communities', 'విశ్వసనీయ తెలుగు కమ్యూనిటీల నుండి సంబంధాలను కనుగొనండి')}
          </h2>
          <div className="text-stone-605 text-sm sm:text-base leading-relaxed font-medium space-y-4">
            <p>
              {t(
                'channels.subtitle1',
                'Sri Lakshmi All Caste Matrimony helps Telugu families find suitable bride and groom profiles from different communities across Telangana and Andhra Pradesh. Each community desk is handled with personal support, profile review, family background understanding, and privacy-focused communication.',
                'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని ఇరు తెలుగు రాష్ట్రాల్లోని వివిధ కమ్యూనిటీల నుండి తగిన వధూవరుల ప్రొఫైల్‌లను కనుగొనడంలో సహాయపడుతుంది. ప్రతి కమ్యూనిటీ డెస్క్‌ను వ్యక్తిగత మద్దతు, ప్రొఫైల్ పరిశీలన, కుటుంబ నేపథ్య అవగాహన మరియు గోప్యత రక్షణతో పర్యవేక్షిస్తాము.'
              )}
            </p>
            <p className="text-stone-500 text-xs sm:text-sm">
              {t(
                'channels.subtitle2',
                'Our team helps families search matches based on caste/community preference, gotram details, education, profession, location, family values, and match expectations.',
                'కులం/కమ్యూనిటీ ప్రాధాన్యత, గోత్రం వివరాలు, చదువు, ఉద్యోగం, ప్రాంతం, కుటుంబ విలువలు మరియు అపేక్షల ఆధారంగా సంబంధాలను వెతకడానికి మా బృందం కుటుంబాలకు సహాయం చేస్తుంది.'
              )}
            </p>
          </div>
        </div>

        {/* Channels Grid layout with real-time stats and custom community heritage symbols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((ch) => {
            const IconComponent = ch.icon;
            
            return (
              <div 
                key={ch.id}
                onClick={() => openChannelModal(ch)}
                className="group bg-white rounded-2xl p-6 border border-stone-200/60 hover:border-[#10b981] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual Accent Badge */}
                <div className="absolute top-0 right-0 py-1.5 px-3 bg-stone-100 rounded-bl-xl text-[9px] font-bold text-stone-600 group-hover:bg-emerald-50 group-hover:text-[#10b981] transition-colors">
                  {ch.community === 'Goud' ? t('channels.prime', '⭐ Prime', '⭐ ప్రైమ్') : t('channels.groupDesk', 'Group Desk', 'డెస్క్ గ్రూప్')}
                </div>

                <div className="space-y-4">
                  {/* Styled Icon based on specific community legacy */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ch.iconBg} ${ch.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="font-serif text-base sm:text-[17px] font-extrabold text-stone-900 group-hover:text-[#10b981] transition-colors">
                      {ch.name}
                    </h3>
                    <p className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider mt-0.5">
                      {ch.matchSpeed}
                    </p>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed font-normal min-h-[48px] line-clamp-3">
                    {ch.heritage}
                  </p>
                </div>

                {/* Metric Quick Stats bar */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-stone-600 text-[11px] font-semibold">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-stone-400" />
                    <span>{ch.activeProfiles} {t('channels.profiles', 'Profiles', 'ప్రొఫైల్స్')}</span>
                  </div>
                  <div className="text-stone-400 font-normal">
                    <span>{ch.bridesCount} {t('channels.b', 'B', 'వధువులు')}</span> / <span>{ch.groomsCount} {t('channels.g', 'G', 'వరులు')}</span>
                  </div>
                </div>

                {/* Bottom Join CTA trigger bar */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold text-[#10b981] group-hover:underline">
                  <span>{ch.ctaText || t('channels.enter', 'Enter Verified Channel', 'ధృవీకరించబడిన ఛానెల్‌లో చేరండి')}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footnote / Custom Community CTA Box */}
        <div className="mt-16 bg-gradient-to-br from-white to-stone-50/50 rounded-2xl p-8 border border-gold-350/30 max-w-4xl mx-auto text-center space-y-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
          
          <div className="space-y-2">
            <h4 className="font-serif text-xl sm:text-2xl font-black text-stone-900">
              {t('channels.notfound.title', 'Don’t See Your Community?', 'మీ కమ్యూనిటీ కనిపించడం లేదా?')}
            </h4>
            <p className="text-stone-605 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
              {t(
                'channels.notfound.desc',
                'Sri Lakshmi All Caste Matrimony supports all Telugu communities and sub-communities. Share your bride or groom details with us, and our team will help you find suitable matches based on your family preferences.',
                'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని అన్ని రకాల తెలుగు కమ్యూనిటీలు మరియు ఉపకమ్యూనిటీలకు మద్దతు ఇస్తుంది. మీ వధూవరుల వివరాలను మాకు తెలియజేయండి, మా బృందం మీ కుటుంబ ప్రాధాన్యతలకు తగిన సంబంధాలను కనుగొనడంలో సహాయపడుతుంది.'
              )}
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/917386915677?text=Hello%20Sri%20Lakshmi%20Matrimony,%20I'm%20looking%20for%20a%20match%20from%20a%20specific%20community.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle size={16} className="fill-current" />
              <span>{t('channels.notfound.cta', 'Speak with Our Matchmaking Team', 'మా మ్యాచ్ మేకింగ్ టీమ్‌తో మాట్లాడండి')}</span>
            </a>
          </div>
        </div>

        {/* Interactive Channel Connect Modal Overlay */}
        {selectedChannel && (
          <div className="fixed inset-0 bg-[#0c120c]/85 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-stone-100">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedChannel(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-1.5 rounded-full z-10 transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header info */}
                <div className="flex items-center gap-4 border-b border-stone-100 pb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-[#10b981]`}>
                    {React.createElement(selectedChannel.icon, { size: 30 })}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-black text-stone-900 leading-tight">
                      {selectedChannel.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {t('channels.subText', 'Connecting verified marriages within', 'వీరి మధ్య ధృవీకరించబడిన వివాహాలను సులభతరం చేయడం -')}{' '}
                      {selectedChannel.community}{' '}
                      {t('channels.subTextEnd', 'lineage.', 'వంశక్రమం.')}
                    </p>
                  </div>
                </div>

                {/* Segment Coordinator Profile Details */}
                <div className="bg-stone-50 rounded-2xl p-4 flex gap-4 items-center border border-stone-200/40">
                  <img 
                    src={selectedChannel.coordinator.photo} 
                    alt={selectedChannel.coordinator.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md bg-stone-200" 
                  />
                  <div>
                    <span className="text-[9px] uppercase font-serif tracking-widest text-emerald-600 font-extrabold block">
                      {t('channels.assigned', 'Assigned Coordinator', 'నియమించబడిన కోఆర్డినేటర్')}
                    </span>
                    <strong className="text-stone-900 text-sm block font-bold leading-tight">{selectedChannel.coordinator.name}</strong>
                    <div className="flex gap-4 items-center mt-1.5 text-stone-500 text-[11px] font-semibold">
                      <span>✓ {selectedChannel.coordinator.gotramsVetted}+ {t('channels.gotramsVetted', 'Gotrams Vetted', 'గోత్రాల పరిశీలన')}</span>
                      <span>• {t('channels.vowsVetted', 'Vows Verified', 'ప్రమాణాలు ధృవీకరించబడ్డాయి')}</span>
                    </div>
                  </div>
                </div>

                {/* Form to submit join query */}
                {isJoinedSuccessfully ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 text-[#10b981] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="font-serif text-md font-bold text-stone-900">
                      {t('channels.forwarding', 'Forwarding to Desk...', 'సహాయక కేంద్రానికి ఫార్వార్డ్ చేయబడుతోంది...')}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {t(
                        'channels.forwardingSub',
                        'Launching WhatsApp with your coordinator details securely. Please click send in WhatsApp window to confirm interest.',
                        'కోఆర్డినేటర్ వివరాలతో సురక్షితంగా వాట్సాప్ ప్లగ్‌ఇన్ తెరవబడుతోంది. దయచేసి వాట్సాప్ సందేశాన్ని పంపి మీ ఆసక్తిని నిర్ధారించండి.'
                      )}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleJoinChannel} className="space-y-4">
                    <div className="text-stone-740 text-xs font-semibold">
                      {t(
                        'channels.formDesc',
                        'Complete registration to join this premium community matrimony channel:',
                        'ఈ ప్రీమియం కమ్యూనిటీ మ్యాట్రిమోని ఛానెల్‌లో చేరడానికి క్రింది వివరాలను పూరించండి:'
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                          {t('channels.candName', 'Full Name / Candidate Name *', 'అభ్యర్థి పూర్తి పేరు *')}
                        </label>
                        <input 
                          type="text" 
                          required
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          placeholder={t('channels.candPlaceholder', 'e.g. Srikant Reddy / Nagaraju Goud', 'ఉదా. శ్రీకాంత్ రెడ్డి / నాగరాజు గౌడ్')}
                          className="w-full text-xs p-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-900 font-medium"
                        />
                      </div>

                      {/* Mobile Number & Father's Mobile Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                            {t('channels.candPhone', 'Mobile Number *', 'మొబైల్ సంఖ్య *')}
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={candidatePhone}
                            onChange={(e) => setCandidatePhone(e.target.value)}
                            placeholder="e.g. +91 91215 94223"
                            className="w-full text-xs p-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-900 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                            {t('channels.fatherPhone', "Father's Mobile Number *", 'తండ్రి మొబైల్ సంఖ్య *')}
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={fatherPhone}
                            onChange={(e) => setFatherPhone(e.target.value)}
                            placeholder="e.g. +91 73869 15677"
                            className="w-full text-xs p-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-900 font-medium"
                          />
                        </div>
                      </div>

                      {/* Caste Dropdown */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                          {t('channels.caste', 'Caste Dropdown *', 'కులం *')}
                        </label>
                        <select 
                          required
                          value={caste}
                          onChange={(e) => setCaste(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-stone-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-900 font-semibold cursor-pointer"
                        >
                          <option value="" disabled>
                            {t('channels.casteSelect', 'Select Caste', 'కులం ఎంచుకోండి')}
                          </option>
                          {castesList.map((c) => (
                            <option key={c.value} value={c.value}>
                              {language === 'te' ? c.labelTe : c.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedChannel(null)}
                        className="py-3 px-4 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold cursor-pointer transition-colors"
                      >
                        {t('channels.cancel', 'Cancel', 'రద్దు చేయి')}
                      </button>

                      <button
                        type="submit"
                        className="py-3 px-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                      >
                        <MessageCircle size={14} className="fill-current" /> {t('channels.joinDesk', 'Join Desk', 'కనెక్ట్ అవ్వండి')}
                      </button>
                    </div>
                  </form>
                )}

                {/* Direct Connect Helpers */}
                <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 bg-emerald-50/20 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 mt-2">
                  <span>{t('channels.callHelp', 'Need help over phone call?', 'ఫోన్ ద్వారా సహాయం కావాలా?')}</span>
                  <a 
                    href={`tel:${selectedChannel.coordinator.phone}`}
                    className="flex items-center gap-1 font-bold text-emerald-700 hover:underline"
                  >
                    <Phone size={11} /> {t('channels.callText', 'Call', 'కాల్ చేయండి:')} {selectedChannel.coordinator.phone}
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
