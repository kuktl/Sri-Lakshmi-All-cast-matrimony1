/** Sequential public reference id, e.g. SL-0001. */
export function seriesId(refNo: number): string {
  return `SL-${String(refNo).padStart(4, '0')}`;
}

/**
 * Friendly reference shown to users. Prefers the sequential series id
 * (SL-0001); falls back to a UUID-derived code for any legacy profile that
 * has no ref_no yet.
 */
export function profileRef(p: { refNo?: number | null; id: string }): string {
  return p.refNo != null ? seriesId(p.refNo) : `TRG-${p.id.replace(/-/g, '').slice(0, 6).toUpperCase()}`;
}
