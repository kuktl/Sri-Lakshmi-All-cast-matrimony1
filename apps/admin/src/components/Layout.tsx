import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, Settings, LogOut } from 'lucide-react';
import { RESOURCES } from '../resources';
import { useAuth } from '../auth/AuthContext';
import { Button } from './ui';

export function Layout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-maroon-800 text-cream-50' : 'text-cream-100/80 hover:bg-maroon-800/50 hover:text-cream-50'
    }`;

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col bg-maroon-950 px-4 py-6">
        <div className="mb-8 px-1">
          <img
            src="/logo.png"
            alt="Sri Lakshmi All Caste Matrimony"
            className="h-auto w-full rounded-lg"
          />
          <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-widest text-gold-300">
            Admin Panel
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          <NavLink to="/" end className={linkClass}>
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </NavLink>
          <NavLink to="/leads" className={linkClass}>
            <Inbox className="h-4 w-4" /> Leads
          </NavLink>

          <p className="mt-5 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-gold-300/60">Content</p>
          {RESOURCES.map((r) => (
            <NavLink key={r.key} to={`/${r.key}`} className={linkClass}>
              <r.icon className="h-4 w-4" /> {r.title}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 border-t border-maroon-800 pt-4">
          <NavLink to="/account" className={linkClass}>
            <Settings className="h-4 w-4" /> Account
          </NavLink>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-cream-200 bg-cream-50/80 px-8 py-3 backdrop-blur">
          <p className="text-sm text-maroon-700/70">
            Signed in as <span className="font-semibold text-maroon-900">{session?.user.email}</span>
          </p>
          <Button variant="subtle" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </header>
        <main className="flex-1 px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
