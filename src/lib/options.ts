// Shared designation / employment options used by the registration form
// (as a dropdown) and the Profiles page (as a filter), so a candidate's
// selection can be filtered exactly. Keep these two in sync via this list.
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
] as const;

export type ProfessionOption = (typeof PROFESSION_OPTIONS)[number];

// Canonical community/caste list — shared by the registration form and the
// Profiles filter, and kept identical to the admin profile form, so a
// candidate's community is captured and filtered consistently everywhere.
export const CASTE_OPTIONS = [
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
] as const;
