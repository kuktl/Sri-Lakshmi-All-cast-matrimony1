import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Heart, Lock } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/ui';

const inputClass =
  'w-full rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

export function Login() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/" replace />;

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-cream-50 p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-maroon-950">
            <Heart className="h-6 w-6" fill="currentColor" />
          </span>
          <h1 className="text-xl font-bold text-maroon-950">Sri Lakshmi Matrimony</h1>
          <p className="text-sm text-maroon-700/70">Admin sign in</p>
        </div>

        <form onSubmit={(e) => void submit(e)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-maroon-800">Email</label>
            <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-maroon-800">Password</label>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <Button type="submit" loading={loading} className="w-full">
            <Lock className="h-4 w-4" /> Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
