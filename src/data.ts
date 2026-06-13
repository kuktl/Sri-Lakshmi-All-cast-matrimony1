import { Profile, TrustStat, WhyTrustCard, Testimonial, FAQItem } from './types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'TRK-1024',
    gender: 'Bride',
    age: 25,
    education: 'B.Tech',
    profession: 'Software Engineer',
    location: 'Hyderabad',
    community: 'Goud',
    height: "5'4\"",
    gotram: 'Vibhooti',
    nativePlace: 'Hyderabad, TS',
    star: 'Mrigasira',
    imageUrl: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'TRK-1086',
    gender: 'Groom',
    age: 29,
    education: 'MBA',
    profession: 'Business Owner',
    location: 'Warangal',
    community: 'Reddy',
    height: "5'9\"",
    gotram: 'Recharla',
    nativePlace: 'Warangal, TS',
    star: 'Rohini',
    imageUrl: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'TRK-1132',
    gender: 'Bride',
    age: 24,
    education: 'M.Sc',
    profession: 'Teacher',
    location: 'Vijayawada',
    community: 'Kamma',
    height: "5'3\"",
    gotram: 'Vasista',
    nativePlace: 'Vijayawada, AP',
    star: 'Uttara',
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'TRK-1190',
    gender: 'Groom',
    age: 30,
    education: 'M.Tech',
    profession: 'Government Employee',
    location: 'Karimnagar',
    community: 'Kapu',
    height: "5'10\"",
    gotram: 'Janardhana',
    nativePlace: 'Karimnagar, TS',
    star: 'Anuradha',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'TRK-1212',
    gender: 'Bride',
    age: 26,
    education: 'MBA',
    profession: 'HR Professional',
    location: 'Hyderabad',
    community: 'Arya Vysya',
    height: "5'5\"",
    gotram: 'Markandeya',
    nativePlace: 'Secunderabad, TS',
    star: 'Chitra',
    imageUrl: 'https://images.unsplash.com/photo-1581404917879-53e192591dba?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'TRK-1288',
    gender: 'Groom',
    age: 31,
    education: 'B.Tech',
    profession: 'Software Developer',
    location: 'Bengaluru',
    community: 'Yadav',
    height: "5'11\"",
    gotram: 'Vasishta',
    nativePlace: 'Hyderabad, TS',
    star: 'Revati',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80'
  }
];

export const TRUST_STATS: TrustStat[] = [
  {
    value: '7+ Years Experience',
    label: 'Years of Trustworthy Service',
    description: 'Serving Telugu families since 2019'
  },
  {
    value: '80+ Matches',
    label: 'Successful Matrimonial Unions',
    description: 'Happy families successfully united'
  },
  {
    value: '1,000+ Profiles',
    label: 'Verified Candidates Registered',
    description: 'Vetted family backgrounds'
  },
  {
    value: '2+ Cities Served',
    label: 'Regions & Overseas Segments',
    description: 'TS, AP & global Telugu NRI network'
  }
];

export const WHY_TRUST_CARDS: WhyTrustCard[] = [
  {
    title: 'Verified Profiles',
    description: 'Every profile is reviewed by our family matchmaking experts before sharing to maintain trust, authenticity, and family confidence.'
  },
  {
    title: 'Community-Focused Matches',
    description: 'Matches are proposed based on family background, caste, gotram compatibility, location, education, and elder expectations.'
  },
  {
    title: 'Personal Matchmaking Support',
    description: 'Our senior matchmakers guide traditional Telugu parents personally and help clarify gotras, family status, and matchmaking priorities.'
  },
  {
    title: 'Privacy & Secure Communication',
    description: 'Candidate numbers, photos, and physical addresses are handled with parent permission and shared only after mutual approval.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '“We were looking for a respectable family alliance across Andhra and Telangana, and Sri Lakshmi All Caste Matrimony helped us with verified and relevant profiles. Their senior matchmakers guided us patiently throughout the process.”',
    name: "Bride’s Family",
    location: 'Hyderabad',
    matchYear: '2024'
  },
  {
    quote: '“The profile suggestions were genuine and matched our community expectations. The team understood our family preferences and helped us connect with the right match.”',
    name: "Groom’s Family",
    location: 'Vijayawada',
    matchYear: '2025'
  },
  {
    quote: '“Finding a respectable match matching our gotram guidelines became easier with their direct support. The process was simple, respectful, and trustworthy.”',
    name: 'Parent of Bride',
    location: 'Telangana',
    matchYear: '2023'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are the profiles verified?',
    answer: 'Yes, all registrations are verified via identity proofs (Aadhar/Voter ID) and phone consultation before active profile matching commences to maintain high trust and safety standards.',
    teluguQuestion: 'రిజిస్టర్డ్ ప్రొఫైల్స్ అన్నీ ధృవీకరించబడినవేనా?',
    teluguAnswer: 'అవును, అన్ని రిజిస్ట్రేషన్లు యాక్టివ్ ప్రొఫైల్ మ్యాచ్ ప్రారంభం కాకముందే గుర్తింపు ఆధారాలు (ఆధార్/ఓటర్ ఐడీ) మరియు ఫోన్ సంప్రదింపుల ద్వారా ధృవీకరించబడతాయి. దీని ద్వారా నమ్మకం మరియు భద్రత ప్రమాణాలను కాపాడతాము.'
  },
  {
    id: 'faq-2',
    question: 'Do you provide community-specific matches?',
    answer: 'Yes, we provide specialized matchmaking services for all castes across Andhra Pradesh and Telangana, ensuring deep respect for ancestral lineages, gotrams, customs, and native family backgrounds.',
    teluguQuestion: 'మీరు కులాల వారీగా సంబంధాలు చూపిస్తారా?',
    teluguAnswer: 'అవును, మేము ఆంధ్రప్రదేశ్ మరియు తెలంగాణ రాష్ట్రాల వ్యాప్తంగా ఉన్న అన్ని కులాల వారికి ప్రత్యేక మ్యాచ్ మేకింగ్ సేవలను అందిస్తాము. గోత్రాలు, ఆచారాలు మరియు కుటుంబ నేపథ్యాలపై ప్రత్యేక గౌరవంతో సంబంధాలను పరిశీలిస్తాము.'
  },
  {
    id: 'faq-3',
    question: 'Will my personal details be safe?',
    answer: 'Absolutely. We practice maximum discretion. Photos, full names, addresses, and phone numbers are only disclosed to other families when mutual interest is explicitly verified and approved by you.',
    teluguQuestion: 'నా వ్యక్తిగత వివరాలు సురక్షితంగా ఉంటాయా?',
    teluguAnswer: 'ఖచ్చితంగా. మేము అపారమైన గోప్యతను పాటిస్తాము. మీ అనుమతి లేకుండా ఫోటోలు, పూర్తి పేర్లు, చిరునామాలు మరియు ఫోన్ నంబర్లు ఏ ఇతర కుటుంబ సభ్యులకు బహిర్గతం చేయబడవు.'
  },
  {
    id: 'faq-4',
    question: 'How can I register?',
    answer: 'Registration is simple and free to start. You can fill out our lead form on this website, call our expert matchmaking support team directly, or send us a WhatsApp message to get manual onboarding assistance instantly.',
    teluguQuestion: 'నేను ఎలా రిజిస్టర్ చేసుకోవాలి?',
    teluguAnswer: 'నమోదు చేసుకోవడం చాలా సులభం మరియు ఉచితం. మీరు ఈ వెబ్‌సైట్‌లోని ఫారమ్‌ను పూరించవచ్చు, నేరుగా మా నిపుణుల బృందానికి కాల్ చేయవచ్చు లేదా తక్షణ సహాయం కోసం వాట్సాప్ సందేశం పంపవచ్చు.'
  },
  {
    id: 'faq-5',
    question: 'Can I contact through WhatsApp?',
    answer: 'Yes, absolutely! You can contact us instantly on WhatsApp by clicking the green buttons across our website to share bride or groom details with our senior matchmaking officer.',
    teluguQuestion: 'నేను వాట్సాప్ ద్వారా మిమ్మల్ని సంప్రదించవచ్చా?',
    teluguAnswer: 'అవును, తప్పకుండా! వధువు లేదా వరుడి వివరాలను మా సీనియర్ మ్యాచ్ మేకింగ్ అధికారికి షేర్ చేయడానికి వెబ్‌సైట్‌లోని ఆకుపచ్చ వాట్సాప్ బటన్‌లపై క్లిక్ చేసి వెంటనే సంప్రదించవచ్చు.'
  }
];
