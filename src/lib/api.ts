import { Profile } from '../types';

/**
 * Resolves the API base URL. Prefers the build-time VITE_API_URL; otherwise
 * defaults to the deployed API on any non-localhost host, and to the local
 * dev server when running locally. This keeps production working even if the
 * env var is not configured on the hosting project.
 */
function resolveBaseUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
  if (envUrl) return envUrl.replace(/\/+$/, '');
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  return isLocal ? 'http://localhost:4000' : 'https://sri-lakshmi-api.vercel.app';
}

const BASE_URL = resolveBaseUrl();

interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // ignore non-JSON
  }
  if (!res.ok || !envelope?.success) {
    throw new Error(envelope?.error ?? `Request failed (${res.status})`);
  }
  return envelope.data as T;
}

/** Raw approved-profile shape returned by the public API (snake_case). */
interface ApiProfile {
  id: string;
  gender: 'Bride' | 'Groom';
  age: number | null;
  education: string | null;
  profession: string | null;
  location: string | null;
  community: string | null;
  height: string | null;
  gotram: string | null;
  native_place: string | null;
  star: string | null;
  image_url: string | null;
}

const FALLBACK_IMAGE: Record<'Bride' | 'Groom', string> = {
  Groom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  Bride: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=600&auto=format&fit=crop&q=80',
};

/** Maps an API profile to the front-end Profile type used by the UI. */
function mapProfile(p: ApiProfile): Profile {
  return {
    id: p.id,
    gender: p.gender,
    age: p.age ?? 0,
    education: p.education || 'Graduate',
    profession: p.profession || 'Professional',
    location: p.location || 'Telugu States',
    community: p.community || 'Telugu',
    height: p.height || "5'5\"",
    gotram: p.gotram || 'Vasishta',
    nativePlace: p.native_place || p.location || 'Telugu States',
    star: p.star || 'Rohini',
    imageUrl: p.image_url || FALLBACK_IMAGE[p.gender],
  };
}

/** Fetches approved profiles for public display. */
export async function fetchApprovedProfiles(): Promise<Profile[]> {
  const rows = await request<ApiProfile[]>('GET', '/api/profiles');
  return rows.map(mapProfile);
}

export interface ProfileSubmission {
  full_name: string;
  gender: 'Bride' | 'Groom';
  age?: number;
  community?: string;
  location?: string;
  education?: string;
  profession?: string;
  gotram?: string;
  phone: string;
  whatsapp?: string;
  dob?: string;
  email?: string;
  income?: string;
  family_details?: string;
  match_details?: string;
  image_url?: string;
}

/** Submits a public profile registration (created as pending for approval). */
export async function submitProfile(input: ProfileSubmission): Promise<{ id: string }> {
  return request<{ id: string }>('POST', '/api/profiles', input);
}

const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const PHOTO_MAX_BYTES = 5 * 1024 * 1024;

/**
 * Uploads a registrant's photo to Supabase Storage via a server-issued signed
 * URL and returns the public URL to attach to the pending profile.
 */
export async function uploadProfilePhoto(file: File): Promise<string> {
  if (!PHOTO_TYPES.includes(file.type)) {
    throw new Error('Please use a JPG, PNG, or WebP image.');
  }
  if (file.size > PHOTO_MAX_BYTES) {
    throw new Error('Photo must be 5 MB or smaller.');
  }
  const { uploadUrl, publicUrl } = await request<{ uploadUrl: string; publicUrl: string }>(
    'POST',
    '/api/uploads',
    { filename: file.name, content_type: file.type },
  );
  const form = new FormData();
  form.append('cacheControl', '3600');
  form.append('', file);
  const res = await fetch(uploadUrl, { method: 'PUT', body: form });
  if (!res.ok) throw new Error(`Photo upload failed (${res.status})`);
  return publicUrl;
}

export interface LeadSubmission {
  full_name: string;
  phone: string;
  source?: 'registration' | 'expert_call' | 'profile_request' | 'contact' | 'membership';
  role?: 'Bride' | 'Groom' | '';
  community?: string;
  location?: string;
  profession?: string;
  whatsapp?: string;
  message?: string;
}

/** Submits a contact/enquiry lead (expert call, detail requests). */
export async function submitLead(input: LeadSubmission): Promise<{ id: string }> {
  return request<{ id: string }>('POST', '/api/leads', input);
}
