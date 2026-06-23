import { Profile } from '../types';

const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

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
}

/** Submits a public profile registration (created as pending for approval). */
export async function submitProfile(input: ProfileSubmission): Promise<{ id: string }> {
  return request<{ id: string }>('POST', '/api/profiles', input);
}

export interface LeadSubmission {
  full_name: string;
  phone: string;
  source?: 'registration' | 'expert_call' | 'profile_request' | 'contact';
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
