import { useEffect, useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import { api } from '../lib/api';
import { Button, PageHeader, Spinner, EmptyState, Badge } from '../components/ui';

interface Lead {
  id: string;
  source: string;
  full_name: string;
  role: string | null;
  age: string | null;
  community: string | null;
  location: string | null;
  profession: string | null;
  phone: string;
  whatsapp: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ['new', 'contacted', 'converted', 'closed'] as const;

type Tone = 'neutral' | 'green' | 'amber' | 'red';

// Human-readable label + colour for each enquiry source (i.e. which page it came from).
const SOURCE_META: Record<string, { label: string; tone: Tone }> = {
  registration: { label: 'Home · Register', tone: 'green' },
  membership: { label: 'Membership / Package', tone: 'amber' },
  expert_call: { label: 'Talk to Expert', tone: 'red' },
  contact: { label: 'Contact Us', tone: 'neutral' },
  profile_request: { label: 'Profile Request', tone: 'neutral' },
};

const sourceLabel = (s: string): string => SOURCE_META[s]?.label ?? s;
const sourceTone = (s: string): Tone => SOURCE_META[s]?.tone ?? 'neutral';

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [query, setQuery] = useState('');

  const load = async (): Promise<void> => {
    setLoading(true);
    try {
      setLeads(await api.get<Lead[]>('/api/admin/leads'));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const updateStatus = async (id: string, status: string): Promise<void> => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await api.patch(`/api/admin/leads/${id}`, { status });
    } catch {
      await load();
    }
  };

  const remove = async (id: string): Promise<void> => {
    if (!confirm('Delete this lead?')) return;
    await api.del(`/api/admin/leads/${id}`);
    await load();
  };

  if (loading) return <Spinner />;

  // Sources present in the data, ordered by our known list then any extras.
  const knownOrder = Object.keys(SOURCE_META);
  const presentSources = Array.from(new Set(leads.map((l) => l.source))).sort(
    (a, b) => knownOrder.indexOf(a) - knownOrder.indexOf(b),
  );
  const countFor = (s: string): number => leads.filter((l) => l.source === s).length;
  const q = query.trim().toLowerCase();
  const displayed = leads
    .filter((l) => !sourceFilter || l.source === sourceFilter)
    .filter((l) =>
      !q ||
      [l.full_name, l.phone, l.message, l.community, l.location]
        .some((v) => (v ?? '').toLowerCase().includes(q)),
    );

  return (
    <div>
      <PageHeader title="Leads" subtitle={`${leads.length} enquiries from the website`} />

      {error ? (
        <EmptyState message={error} />
      ) : leads.length === 0 ? (
        <EmptyState message="No leads yet. Enquiries from every website form appear here." />
      ) : (
        <>
          {/* Search by profile ID (SL-0001), name, phone, or message */}
          <div className="relative mb-4 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-maroon-700/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID (SL-0001), name, phone…"
              className="w-full rounded-lg border border-cream-200 bg-white py-2 pl-9 pr-3 text-sm text-maroon-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
            />
          </div>

          {/* Filter by which page the enquiry came from */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSourceFilter('')}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                sourceFilter === '' ? 'bg-maroon-800 text-cream-50' : 'bg-cream-100 text-maroon-800 hover:bg-cream-200'
              }`}
            >
              All ({leads.length})
            </button>
            {presentSources.map((s) => (
              <button
                key={s}
                onClick={() => setSourceFilter(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  sourceFilter === s ? 'bg-maroon-800 text-cream-50' : 'bg-cream-100 text-maroon-800 hover:bg-cream-200'
                }`}
              >
                {sourceLabel(s)} ({countFor(s)})
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-cream-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-100 text-xs uppercase tracking-wide text-maroon-700/70">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">From (page)</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Looking for</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {displayed.map((l) => (
                  <tr key={l.id} className="align-top hover:bg-cream-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-maroon-950">{l.full_name}</div>
                      {l.location && <div className="text-xs text-maroon-700/60">{l.location}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={sourceTone(l.source)}>{sourceLabel(l.source)}</Badge>
                    </td>
                    <td className="px-4 py-3 text-maroon-900">
                      <div>{l.phone}</div>
                      {l.whatsapp && <div className="text-xs text-maroon-700/60">wa: {l.whatsapp}</div>}
                    </td>
                    <td className="px-4 py-3 text-maroon-900">
                      <div>
                        {l.role || '—'}
                        {l.age ? `, ${l.age}` : ''}
                      </div>
                      {l.community && <div className="text-xs text-maroon-700/60">{l.community}</div>}
                      {l.profession && <div className="text-xs text-maroon-700/60">{l.profession}</div>}
                    </td>
                    <td className="px-4 py-3 text-maroon-800">
                      {l.message ? (
                        <span className="block max-w-xs whitespace-pre-wrap text-xs leading-relaxed">{l.message}</span>
                      ) : (
                        <span className="text-maroon-700/30">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-maroon-700/70">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => void updateStatus(l.id, e.target.value)}
                        className="rounded-lg border border-cream-200 bg-white px-2 py-1 text-sm outline-none focus:border-gold-500"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button variant="danger" onClick={() => void remove(l.id)} className="!px-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
