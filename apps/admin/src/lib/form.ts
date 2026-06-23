import type { Field, ResourceDef } from '../resources';

export type FormState = Record<string, string | boolean>;

/** Builds editable form state from an existing row (or blank for create). */
export function initFormState(def: ResourceDef, row: Record<string, unknown> | null): FormState {
  const state: FormState = {};
  for (const f of def.fields) {
    const raw = row?.[f.key];
    if (f.type === 'boolean') {
      state[f.key] = Boolean(raw);
    } else if (f.type === 'stringlist') {
      state[f.key] = Array.isArray(raw) ? raw.join('\n') : '';
    } else {
      state[f.key] = raw === null || raw === undefined ? '' : String(raw);
    }
  }
  return state;
}

/** Converts form state into a typed payload, omitting empty optional fields. */
export function buildPayload(def: ResourceDef, state: FormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const f of def.fields) {
    const value = state[f.key];
    if (f.type === 'boolean') {
      payload[f.key] = Boolean(value);
      continue;
    }
    const str = typeof value === 'string' ? value.trim() : '';
    if (str === '') {
      if (f.required) payload[f.key] = ''; // let the API reject with a clear message
      continue;
    }
    if (f.type === 'number') {
      payload[f.key] = Number(str);
    } else if (f.type === 'stringlist') {
      payload[f.key] = str.split('\n').map((s) => s.trim()).filter(Boolean);
    } else {
      payload[f.key] = str;
    }
  }
  return payload;
}

export function fieldsInList(def: ResourceDef): Field[] {
  return def.fields.filter((f) => f.inList);
}
