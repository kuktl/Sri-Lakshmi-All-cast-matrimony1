import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
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
  phone: string;
  whatsapp: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ['new', 'contacted', 'converted', 'closed'] as const;

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <PageHeader title="Leads" subtitle={`${leads.length} enquiries from the website`} />
      {error ? (
        <EmptyState message={error} />
      ) : leads.length === 0 ? (
        <EmptyState message="No leads yet. Submissions from the website registration form appear here." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-cream-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-100 text-xs uppercase tracking-wide text-maroon-700/70">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Looking for</th>
                <th className="px-4 py-3 font-semibold">Community</th>
                <th className="px-4 py-3 font-semibold">Received</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-maroon-950">{l.full_name}</div>
                    {l.location && <div className="text-xs text-maroon-700/60">{l.location}</div>}
                    <Badge>{l.source === 'expert_call' ? 'Expert call' : 'Registration'}</Badge>
                  </td>
                  <td className="px-4 py-3 text-maroon-900">
                    <div>{l.phone}</div>
                    {l.whatsapp && <div className="text-xs text-maroon-700/60">wa: {l.whatsapp}</div>}
                  </td>
                  <td className="px-4 py-3 text-maroon-900">{l.role || '—'}{l.age ? `, ${l.age}` : ''}</td>
                  <td className="px-4 py-3 text-maroon-900">{l.community || '—'}</td>
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
      )}
    </div>
  );
}
