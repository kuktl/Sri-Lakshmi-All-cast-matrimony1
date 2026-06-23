import {
  Users,
  Building2,
  MessageSquareQuote,
  HelpCircle,
  Heart,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'image' | 'stringlist';

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  /** Show this column in the list table. */
  inList?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface ResourceDef {
  key: string; // route + /api/admin/<key>
  title: string;
  singular: string;
  icon: LucideIcon;
  fields: Field[];
  /** Optional quick-filter chips driven by a single field (e.g. status). */
  filterField?: { key: string; label: string; options: FilterOption[] };
}

const audit: Field[] = [
  { key: 'active', label: 'Active', type: 'boolean', inList: true },
  { key: 'sort_order', label: 'Sort order', type: 'number' },
];

export const RESOURCES: ResourceDef[] = [
  {
    key: 'profiles',
    title: 'Profiles',
    singular: 'Profile',
    icon: Users,
    filterField: {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending review' },
        { value: 'approved', label: 'On public site' },
        { value: 'rejected', label: 'Rejected' },
      ],
    },
    fields: [
      { key: 'full_name', label: 'Full name', type: 'text', required: true, inList: true },
      { key: 'gender', label: 'Gender', type: 'select', options: ['Bride', 'Groom'], required: true, inList: true },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'approved', 'rejected'], inList: true },
      { key: 'age', label: 'Age', type: 'number', inList: true },
      {
        key: 'community',
        label: 'Community',
        type: 'select',
        inList: true,
        options: [
          'Reddy',
          'Kamma',
          'Kapu',
          'Goud',
          'Brahmin',
          'Naidu',
          'Velama',
          'Arya Vysya',
          'Yadav',
          'Padmashali',
          'Balija',
          'Mudiraj',
          'Mala',
          'Madiga',
          'Other',
        ],
      },
      { key: 'location', label: 'Location', type: 'text', inList: true },
      { key: 'education', label: 'Education', type: 'text' },
      { key: 'profession', label: 'Profession', type: 'text' },
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'gotram', label: 'Gotram', type: 'text' },
      { key: 'native_place', label: 'Native place', type: 'text' },
      { key: 'star', label: 'Star', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
      { key: 'dob', label: 'Date of birth', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'income', label: 'Income', type: 'text' },
      { key: 'image_url', label: 'Photo URL', type: 'image' },
      { key: 'family_details', label: 'Family details', type: 'textarea' },
      { key: 'match_details', label: 'Match expectations', type: 'textarea' },
    ],
  },
  {
    key: 'communities',
    title: 'Communities',
    singular: 'Community',
    icon: Building2,
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, inList: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'goud', label: 'Goud', type: 'boolean', inList: true },
      ...audit,
    ],
  },
  {
    key: 'testimonials',
    title: 'Testimonials',
    singular: 'Testimonial',
    icon: MessageSquareQuote,
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea', required: true, inList: true },
      { key: 'name', label: 'Name', type: 'text', inList: true },
      { key: 'location', label: 'Location', type: 'text', inList: true },
      { key: 'match_year', label: 'Match year', type: 'text' },
      ...audit,
    ],
  },
  {
    key: 'faqs',
    title: 'FAQs',
    singular: 'FAQ',
    icon: HelpCircle,
    fields: [
      { key: 'question', label: 'Question (EN)', type: 'text', required: true, inList: true },
      { key: 'answer', label: 'Answer (EN)', type: 'textarea', required: true },
      { key: 'telugu_question', label: 'Question (TE)', type: 'text' },
      { key: 'telugu_answer', label: 'Answer (TE)', type: 'textarea' },
      ...audit,
    ],
  },
  {
    key: 'success-stories',
    title: 'Success Stories',
    singular: 'Success Story',
    icon: Heart,
    fields: [
      { key: 'title', label: 'Title', type: 'text', inList: true },
      { key: 'couple_names', label: 'Couple names', type: 'text', inList: true },
      { key: 'content', label: 'Story', type: 'textarea' },
      { key: 'story_year', label: 'Year', type: 'text', inList: true },
      { key: 'image_url', label: 'Photo URL', type: 'image' },
      ...audit,
    ],
  },
  {
    key: 'membership-plans',
    title: 'Membership Plans',
    singular: 'Plan',
    icon: CreditCard,
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, inList: true },
      { key: 'price', label: 'Price', type: 'text', inList: true },
      { key: 'features', label: 'Features (one per line)', type: 'stringlist' },
      { key: 'highlighted', label: 'Highlighted', type: 'boolean', inList: true },
      ...audit,
    ],
  },
];

export function resourceByKey(key: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.key === key);
}
