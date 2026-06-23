/**
 * One-off bootstrap: creates the single admin account (idempotent) and seeds
 * baseline content from the legacy hardcoded site data. Safe to re-run.
 *
 *   npm run bootstrap
 */
import { supabaseAdmin } from '../src/supabase';

const ADMIN_EMAIL = process.env.BOOTSTRAP_ADMIN_EMAIL ?? 'demo@demo.com';
const ADMIN_PASSWORD = process.env.BOOTSTRAP_ADMIN_PASSWORD ?? 'demo12345678';

const communities = [
  { name: 'Goud Matrimony', description: 'Find verified Goud bride and groom profiles from Telugu families across Telangana, Andhra Pradesh, and other locations.', goud: true },
  { name: 'Reddy Matrimony', description: 'Explore suitable Reddy brides and grooms with detailed professional, traditional family backgrounds, and astrological configurations.', goud: false },
  { name: 'Kamma Matrimony', description: 'Handpicked Kamma community alignments from highly educated, industrial, and business families situated across AP, TS, & NRIs.', goud: false },
  { name: 'Kapu Matrimony', description: 'Tailored matches for the Kapu/Telaga/Balija communities, coordinating with families for seamless cultural and professional suitability.', goud: false },
  { name: 'Brahmin Matrimony', description: 'Traditional and orthodox Brahmin alliances (including Niyogi & Vaidiki segments) following high-standard spiritual family guidelines.', goud: false },
  { name: 'Naidu Matrimony', description: 'Handcrafted partnerships for Telugu Naidu families, tracking local requirements and gotram restrictions cleanly for you.', goud: false },
  { name: 'Velama Matrimony', description: 'Premium matching directory catering specifically to the Velama legacy alliances, ensuring matching respect and values.', goud: false },
  { name: 'Arya Vysya Matrimony', description: 'Suitable professional & corporate matches from Arya Vysya business clans with shared economic standards, locations, and moral values.', goud: false },
];

const testimonials = [
  { quote: 'We were looking for a respectable family alliance across Andhra and Telangana, and Sri Lakshmi All Caste Matrimony helped us with verified and relevant profiles. Their senior matchmakers guided us patiently throughout the process.', name: "Bride's Family", location: 'Hyderabad', match_year: '2024' },
  { quote: 'The profile suggestions were genuine and matched our community expectations. The team understood our family preferences and helped us connect with the right match.', name: "Groom's Family", location: 'Vijayawada', match_year: '2025' },
  { quote: 'Finding a respectable match matching our gotram guidelines became easier with their direct support. The process was simple, respectful, and trustworthy.', name: 'Parent of Bride', location: 'Telangana', match_year: '2023' },
];

const faqs = [
  { question: 'Are the profiles verified?', answer: 'Yes, all registrations are verified via identity proofs (Aadhar/Voter ID) and phone consultation before active profile matching commences to maintain high trust and safety standards.', telugu_question: 'రిజిస్టర్డ్ ప్రొఫైల్స్ అన్నీ ధృవీకరించబడినవేనా?', telugu_answer: 'అవును, అన్ని రిజిస్ట్రేషన్లు యాక్టివ్ ప్రొఫైల్ మ్యాచ్ ప్రారంభం కాకముందే గుర్తింపు ఆధారాలు (ఆధార్/ఓటర్ ఐడీ) మరియు ఫోన్ సంప్రదింపుల ద్వారా ధృవీకరించబడతాయి.' },
  { question: 'Do you provide community-specific matches?', answer: 'Yes, we provide specialized matchmaking services for all castes across Andhra Pradesh and Telangana, ensuring deep respect for ancestral lineages, gotrams, customs, and native family backgrounds.', telugu_question: 'మీరు కులాల వారీగా సంబంధాలు చూపిస్తారా?', telugu_answer: 'అవును, మేము ఆంధ్రప్రదేశ్ మరియు తెలంగాణ రాష్ట్రాల వ్యాప్తంగా ఉన్న అన్ని కులాల వారికి ప్రత్యేక మ్యాచ్ మేకింగ్ సేవలను అందిస్తాము.' },
  { question: 'Will my personal details be safe?', answer: 'Absolutely. We practice maximum discretion. Photos, full names, addresses, and phone numbers are only disclosed to other families when mutual interest is explicitly verified and approved by you.', telugu_question: 'నా వ్యక్తిగత వివరాలు సురక్షితంగా ఉంటాయా?', telugu_answer: 'ఖచ్చితంగా. మేము అపారమైన గోప్యతను పాటిస్తాము.' },
  { question: 'How can I register?', answer: 'Registration is simple and free to start. You can fill out our lead form on this website, call our expert matchmaking support team directly, or send us a WhatsApp message to get manual onboarding assistance instantly.', telugu_question: 'నేను ఎలా రిజిస్టర్ చేసుకోవాలి?', telugu_answer: 'నమోదు చేసుకోవడం చాలా సులభం మరియు ఉచితం.' },
  { question: 'Can I contact through WhatsApp?', answer: 'Yes, absolutely! You can contact us instantly on WhatsApp by clicking the green buttons across our website to share bride or groom details with our senior matchmaking officer.', telugu_question: 'నేను వాట్సాప్ ద్వారా మిమ్మల్ని సంప్రదించవచ్చా?', telugu_answer: 'అవును, తప్పకుండా!' },
];

async function ensureAdmin(): Promise<void> {
  // Find existing user by email (paginated list).
  const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listErr) throw listErr;
  const existing = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  let userId: string;
  if (existing) {
    userId = existing.id;
    await supabaseAdmin.auth.admin.updateUserById(userId, { password: ADMIN_PASSWORD, email_confirm: true });
    console.log(`[bootstrap] admin user already existed, password reset: ${ADMIN_EMAIL}`);
  } else {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (error || !data.user) throw error ?? new Error('Failed to create admin user');
    userId = data.user.id;
    console.log(`[bootstrap] created admin user: ${ADMIN_EMAIL}`);
  }

  const { error: staffErr } = await supabaseAdmin
    .from('staff')
    .upsert({ user_id: userId, email: ADMIN_EMAIL, role: 'admin' }, { onConflict: 'user_id' });
  if (staffErr) throw staffErr;
  console.log('[bootstrap] staff row ensured');
}

async function seedTable(table: string, rows: Record<string, unknown>[]): Promise<void> {
  const { count, error: countErr } = await supabaseAdmin.from(table).select('id', { count: 'exact', head: true });
  if (countErr) throw countErr;
  if ((count ?? 0) > 0) {
    console.log(`[bootstrap] ${table} already has ${count} rows, skipping seed`);
    return;
  }
  const withOrder = rows.map((r, i) => ({ ...r, sort_order: i }));
  const { error } = await supabaseAdmin.from(table).insert(withOrder);
  if (error) throw error;
  console.log(`[bootstrap] seeded ${rows.length} rows into ${table}`);
}

async function main(): Promise<void> {
  await ensureAdmin();
  await seedTable('communities', communities);
  await seedTable('testimonials', testimonials);
  await seedTable('faqs', faqs);
  console.log('[bootstrap] done');
  process.exit(0);
}

main().catch((err) => {
  console.error('[bootstrap] failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
