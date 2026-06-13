export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  location: string;
  matchYear: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    quote: '“We were looking for a respectable family alliance across Andhra and Telangana, and Telugu Rekha Marriage Bureau helped us with verified and relevant profiles. Their senior matchmakers guided us patiently throughout the process.”',
    name: "Bride’s Family",
    location: 'Hyderabad',
    matchYear: '2024'
  },
  {
    id: 't-2',
    quote: '“The profile suggestions were genuine and matched our community expectations. The team understood our family preferences and helped us connect with the right match.”',
    name: "Groom’s Family",
    location: 'Vijayawada',
    matchYear: '2025'
  },
  {
    id: 't-3',
    quote: '“Finding a respectable match matching our gotram guidelines became easier with their direct support. The process was simple, respectful, and trustworthy.”',
    name: 'Parent of Bride',
    location: 'Telangana',
    matchYear: '2023'
  }
];
