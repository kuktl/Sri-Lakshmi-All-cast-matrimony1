import { Users, type LucideIcon } from 'lucide-react';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'image'
  | 'stringlist'
  | 'seriesid'
  | 'date';

// Keep in sync with the public registration form (src/lib/options.ts) so a
// profile's designation is captured identically on both sides.
export const PROFESSION_OPTIONS = [
  'Software / IT',
  'Government Employee',
  'Private Employee',
  'Business / Self-Employed',
  'Doctor / Medical',
  'Engineer',
  'Teacher / Professor',
  'Bank / Finance',
  'Defence / Police',
  'Farmer / Agriculture',
  'Abroad / NRI',
  'Others',
];

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  /** Show this column in the list table. */
  inList?: boolean;
  /** Read-only fields (e.g. generated ids) are shown but not editable. */
  readOnly?: boolean;
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
      { key: 'ref_no', label: 'ID', type: 'seriesid', inList: true, readOnly: true },
      { key: 'full_name', label: 'Full name', type: 'text', required: true, inList: true },
      { key: 'gender', label: 'Gender', type: 'select', options: ['Bride', 'Groom'], required: true, inList: true },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'approved', 'rejected'], inList: true },
      { key: 'age', label: 'Age (auto from DOB)', type: 'number', inList: true },
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
      { key: 'profession', label: 'Designation', type: 'select', options: PROFESSION_OPTIONS, inList: true },
      { key: 'height', label: 'Height', type: 'text' },
      { key: 'gotram', label: 'Gotram', type: 'text' },
      { key: 'native_place', label: 'Native place', type: 'text' },
      { key: 'star', label: 'Star', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
      { key: 'dob', label: 'Date of birth', type: 'date' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'income', label: 'Income', type: 'text' },
      { key: 'image_url', label: 'Photo URL', type: 'image' },
      { key: 'family_details', label: 'Family details', type: 'textarea' },
      { key: 'match_details', label: 'Match expectations', type: 'textarea' },
    ],
  },
];

export function resourceByKey(key: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.key === key);
}
