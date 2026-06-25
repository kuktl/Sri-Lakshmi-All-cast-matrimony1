import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { Layout } from './components/Layout';
import { ResourceCrud } from './components/ResourceCrud';
import { resourceByKey } from './resources';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Account } from './pages/Account';
import { Spinner } from './components/ui';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function ResourcePage() {
  const { resource } = useParams();
  const def = resource ? resourceByKey(resource) : undefined;
  if (!def) return <Navigate to="/" replace />;
  return <ResourceCrud key={def.key} def={def} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/account" element={<Account />} />
            <Route path="/:resource" element={<ResourcePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
