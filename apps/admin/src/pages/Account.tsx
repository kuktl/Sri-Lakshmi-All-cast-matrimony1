import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../auth/AuthContext';
import { Button, PageHeader } from '../components/ui';

const inputClass =
  'w-full rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

export function Account() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(session?.user.email ?? '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== confirm) {
      setMessage({ ok: false, text: 'Passwords do not match' });
      return;
    }

    const body: { email?: string; password?: string } = {};
    if (email && email !== session?.user.email) body.email = email.trim();
    if (password) body.password = password;
    if (!body.email && !body.password) {
      setMessage({ ok: false, text: 'Nothing to update' });
      return;
    }

    setBusy(true);
    try {
      await api.patch('/api/admin/account', body);
      // Credentials changed — force a fresh sign-in with the new credentials.
      setMessage({ ok: true, text: 'Updated. Please sign in again with your new credentials.' });
      setTimeout(() => {
        void signOut().then(() => navigate('/login'));
      }, 1500);
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : 'Update failed' });
      setBusy(false);
    }
  };

  return (
    <div className="max-w-lg">
      <PageHeader title="Account" subtitle="Change your login email or password" />
      <form onSubmit={(e) => void submit(e)} className="space-y-5 rounded-xl border border-cream-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-xs font-semibold text-maroon-800">Login email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <hr className="border-cream-200" />
        <div>
          <label className="mb-1 block text-xs font-semibold text-maroon-800">New password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" autoComplete="new-password" className={inputClass} />
          <p className="mt-1 text-xs text-maroon-700/60">At least 8 characters.</p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-maroon-800">Confirm new password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" className={inputClass} />
        </div>

        {message && (
          <p className={`rounded-lg px-3 py-2 text-sm ${message.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </p>
        )}

        <Button type="submit" loading={busy}>
          Save changes
        </Button>
      </form>
    </div>
  );
}
