import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Users } from 'lucide-react';
import { RESOURCES } from '../resources';
import { api } from '../lib/api';
import { PageHeader, Spinner } from '../components/ui';

type Counts = Record<string, number>;

export function Dashboard() {
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keys = ['leads', ...RESOURCES.map((r) => r.key)];
    Promise.all(
      keys.map(async (key) => {
        try {
          const rows = await api.get<unknown[]>(`/api/admin/${key}`);
          return [key, rows.length] as const;
        } catch {
          return [key, 0] as const;
        }
      }),
    ).then((entries) => {
      setCounts(Object.fromEntries(entries));
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  const tiles = [
    { key: 'leads', title: 'Leads', icon: Inbox, to: '/leads' },
    ...RESOURCES.map((r) => ({ key: r.key, title: r.title, icon: r.icon, to: `/${r.key}` })),
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of everything in the system" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.key}
            to={t.to}
            className="group rounded-xl border border-cream-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-maroon-50 text-maroon-800 group-hover:bg-gold-100">
                <t.icon className="h-5 w-5" />
              </span>
              <span className="text-3xl font-bold text-maroon-950">{counts[t.key] ?? 0}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-maroon-700/80">{t.title}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-cream-200 bg-white p-5">
        <div className="flex items-center gap-2 text-maroon-800">
          <Users className="h-4 w-4" />
          <p className="text-sm font-semibold">Tip</p>
        </div>
        <p className="mt-1 text-sm text-maroon-700/70">
          New profile registrations from the website land in <Link to="/leads" className="font-semibold text-maroon-800 underline">Leads</Link>. Approve a profile by setting its status to <span className="font-semibold">approved</span> — only approved profiles appear on the public site.
        </p>
      </div>
    </div>
  );
}
