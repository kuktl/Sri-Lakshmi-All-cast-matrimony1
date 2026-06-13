import { Profile, TrustStat, WhyTrustCard, FAQItem } from '../types';

export interface CommunityCard {
  name: string;
  description: string;
  goud: boolean;
}

export const COMMUNITIES: CommunityCard[] = [
  {
    name: 'Goud Matrimony',
    description: 'Find verified Goud bride and groom profiles from Telugu families across Telangana, Andhra Pradesh, and other locations.',
    goud: true
  },
  {
    name: 'Reddy Matrimony',
    description: 'Explore suitable Reddy brides and grooms with detailed professional, traditional family backgrounds, and astrological configurations.',
    goud: false
  },
  {
    name: 'Kamma Matrimony',
    description: 'Handpicked Kamma community alignments from highly educated, industrial, and business families situated across AP, TS, & NRIs.',
    goud: false
  },
  {
    name: 'Kapu Matrimony',
    description: 'Tailored matches for the Kapu/Telaga/Balija communities, coordinating with families for seamless cultural and professional suitability.',
    goud: false
  },
  {
    name: 'Brahmin Matrimony',
    description: 'Traditional and orthodox Brahmin alliances (including Niyogi & Vaidiki segments) following high-standard spiritual family guidelines.',
    goud: false
  },
  {
    name: 'Naidu Matrimony',
    description: 'Handcrafted partnerships for Telugu Naidu families, tracking local requirements and gotram restrictions cleanly for you.',
    goud: false
  },
  {
    name: 'Velama Matrimony',
    description: 'Premium matching directory catering specifically to the Velama legacy alliances, ensuring matching respect and values.',
    goud: false
  },
  {
    name: 'Arya Vysya Matrimony',
    description: 'Suitable professional & corporate matches from Arya Vysya business clans with shared economic standards, locations, and moral values.',
    goud: false
  }
];

export const INITIAL_PROFILES_DATA: Profile[] = [
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

export const TRUST_STATS_DATA: TrustStat[] = [
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

export const WHY_TRUST_CARDS_DATA: WhyTrustCard[] = [
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

export const FAQ_ITEMS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are the profiles verified?',
    answer: 'Yes, all registrations are verified via identity proofs (Aadhar/Voter ID) and phone consultation before active profile matching commences to maintain high trust and safety standards.'
  },
  {
    id: 'faq-2',
    question: 'Do you provide community-specific matches?',
    answer: 'Yes, we provide specialized matchmaking services for all castes across Andhra Pradesh and Telangana, ensuring deep respect for ancestral lineages, gotrams, customs, and native family backgrounds.'
  },
  {
    id: 'faq-3',
    question: 'Will my personal details be safe?',
    answer: 'Absolutely. We practice maximum discretion. Photos, full names, addresses, and phone numbers are only disclosed to other families when mutual interest is explicitly verified and approved by you.'
  },
  {
    id: 'faq-4',
    question: 'How can I register?',
    answer: 'Registration is simple and free to start. You can fill out our lead form on this website, call our expert matchmaking support team directly, or send us a WhatsApp message to get manual onboarding assistance instantly.'
  },
  {
    id: 'faq-5',
    question: 'Can I contact through WhatsApp?',
    answer: 'Yes, absolutely! You can contact us instantly on WhatsApp by clicking the green buttons across our website to share bride or groom details with our senior matchmaking officer.'
  }
];
