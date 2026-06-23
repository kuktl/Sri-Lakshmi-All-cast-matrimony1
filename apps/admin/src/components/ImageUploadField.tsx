import { useRef, useState } from 'react';
import { Upload, Loader2, ImageIcon } from 'lucide-react';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

interface SignedUpload {
  path: string;
  token: string;
  publicUrl: string;
}

/**
 * Uploads a profile photo to Supabase Storage via a server-issued signed URL,
 * then reports back the public URL. Also accepts a pasted URL as a fallback.
 */
export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File): Promise<void> => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError('Please use a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image must be 5 MB or smaller.');
      return;
    }

    setUploading(true);
    try {
      const { path, token, publicUrl } = await api.post<SignedUpload>('/api/admin/uploads', {
        filename: file.name,
        content_type: file.type,
      });
      const { error: upErr } = await supabase.storage
        .from('profile-photos')
        .uploadToSignedUrl(path, token, file);
      if (upErr) throw new Error(upErr.message);
      onChange(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-20 w-20 rounded-lg border border-cream-200 object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-cream-200 bg-cream-100 text-maroon-700/40">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg border border-cream-200 bg-cream-100 px-3 py-2 text-sm font-semibold text-maroon-900 hover:bg-cream-200 disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading…' : value ? 'Replace photo' : 'Upload photo'}
          </button>
          <p className="mt-1 text-xs text-maroon-700/60">JPG, PNG or WebP · max 5 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm text-maroon-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
      />
    </div>
  );
}
