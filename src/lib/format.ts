/** Friendly public reference code derived from a profile's database UUID. */
export function displayRef(id: string): string {
  return `TRG-${id.replace(/-/g, '').slice(0, 6).toUpperCase()}`;
}
