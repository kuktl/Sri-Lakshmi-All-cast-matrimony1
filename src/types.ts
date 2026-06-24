export interface Profile {
  id: string;
  refNo?: number;
  gender: 'Bride' | 'Groom';
  age: number;
  education: string;
  profession: string;
  location: string;
  community: string;
  height?: string;
  gotram?: string;
  nativePlace?: string;
  star?: string;
  income?: string;
  familyOccupation?: string;
  fullName?: string;
  imageUrl?: string;
}

export interface TrustStat {
  value: string;
  label: string;
  description?: string;
}

export interface WhyTrustCard {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  matchYear?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  teluguQuestion?: string;
  teluguAnswer?: string;
}

export interface RegistrationInput {
  fullName: string;
  role: 'Bride' | 'Groom' | '';
  age: string;
  community: string;
  location: string;
  education: string;
  profession: string;
  phone: string;
  whatsapp: string;
  preferredMarriageExpectations: string;
}
