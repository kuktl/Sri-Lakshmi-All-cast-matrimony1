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
