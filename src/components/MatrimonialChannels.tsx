import React, { useEffect, useState } from 'react';
import {
  Trees,
  ShieldCheck,
  Wheat,
  Sun,
  Award,
  Layers,
  Sparkles,
  MessageCircle,
  Users,
  Gem
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fetchApprovedProfiles } from '../lib/api';

interface CommunityCount {
  total: number;
  brides: number;
  grooms: number;
}

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
  const { t } = useLanguage();

  // Real-time approved-profile counts per community, loaded from the API.
  const [counts, setCounts] = useState<Record<string, CommunityCount>>({});

  useEffect(() => {
    let active = true;
    fetchApprovedProfiles()
      .then((profiles) => {
        if (!active) return;
        const map: Record<string, CommunityCount> = {};
        for (const p of profiles) {
          const key = p.community || 'Other';
          if (!map[key]) map[key] = { total: 0, brides: 0, grooms: 0 };
          map[key].total += 1;
          if (p.gender === 'Bride') map[key].brides += 1;
          else if (p.gender === 'Groom') map[key].grooms += 1;
        }
        setCounts(map);
      })
      .catch(() => {
        /* keep zero counts on failure */
      });
    return () => {
      active = false;
    };
  }, []);

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
            const stat = counts[ch.community] || { total: 0, brides: 0, grooms: 0 };

            return (
              <div
                key={ch.id}
                className="group bg-white rounded-2xl p-6 border border-stone-200/60 hover:border-[#10b981] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
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

                {/* Metric Quick Stats bar — real-time approved-profile counts */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-stone-600 text-[11px] font-semibold">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-stone-400" />
                    <span>{stat.total} {t('channels.profiles', 'Profiles', 'ప్రొఫైల్స్')}</span>
                  </div>
                  <div className="text-stone-400 font-normal">
                    <span>{stat.brides} {t('channels.b', 'B', 'వధువులు')}</span> / <span>{stat.grooms} {t('channels.g', 'G', 'వరులు')}</span>
                  </div>
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


      </div>
    </section>
  );
}
