import { useEffect, useState } from 'react';
import type { ResourceDef } from '../resources';
import { buildPayload, initFormState, type FormState } from '../lib/form';
import { ImageUploadField } from './ImageUploadField';

const inputClass =
  'w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm text-maroon-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

interface ResourceFormProps {
  def: ResourceDef;
  initial: Record<string, unknown> | null;
  onChange: (payload: Record<string, unknown>) => void;
}

/**
 * Renders inputs for every field in a resource definition and reports a clean
 * payload to the parent on every change.
 */
export function ResourceForm({ def, initial, onChange }: ResourceFormProps) {
  const [state, setState] = useState<FormState>(() => initFormState(def, initial));

  // Emit the full record once on open so saving without edits still sends data.
  useEffect(() => {
    onChange(buildPayload(def, state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (key: string, value: string | boolean): void => {
    const next = { ...state, [key]: value };
    setState(next);
    onChange(buildPayload(def, next));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {def.fields.map((f) => {
        const value = state[f.key];
        const wide = f.type === 'textarea' || f.type === 'stringlist' || f.type === 'image';
        return (
          <div key={f.key} className={wide ? 'sm:col-span-2' : ''}>
            <label className="mb-1 block text-xs font-semibold text-maroon-800">
              {f.label}
              {f.required && <span className="text-red-600"> *</span>}
            </label>

            {f.type === 'boolean' ? (
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-maroon-900">
                <input type="checkbox" checked={Boolean(value)} onChange={(e) => update(f.key, e.target.checked)} className="h-4 w-4 accent-maroon-800" />
                {value ? 'Yes' : 'No'}
              </label>
            ) : f.type === 'image' ? (
              <ImageUploadField value={String(value)} onChange={(url) => update(f.key, url)} />
            ) : f.type === 'textarea' || f.type === 'stringlist' ? (
              <textarea rows={f.type === 'stringlist' ? 4 : 3} value={String(value)} onChange={(e) => update(f.key, e.target.value)} className={inputClass} />
            ) : f.type === 'select' ? (
              <select value={String(value)} onChange={(e) => update(f.key, e.target.value)} className={inputClass}>
                <option value="">—</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type === 'number' ? 'number' : 'text'}
                value={String(value)}
                onChange={(e) => update(f.key, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
