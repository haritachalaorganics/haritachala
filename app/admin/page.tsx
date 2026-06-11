'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INPUT = 'w-full border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsTotp, setNeedsTotp] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth-config')
      .then((r) => r.json())
      .then((d) => setNeedsTotp(!!d.totpRequired))
      .catch(() => setNeedsTotp(true));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, totpCode: totpCode || undefined }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error ?? 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800">Admin Login</h1>
          <p className="text-sm text-stone-500 mt-1">Haritachala Organics</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className={INPUT}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={INPUT}
            />
          </div>

          {needsTotp && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Authenticator Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={7}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                required
                autoComplete="one-time-code"
                className={`${INPUT} text-center tracking-widest font-mono`}
                placeholder="000000"
              />
              <p className="text-xs text-stone-400 mt-1">6-digit code from your authenticator app</p>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-stone-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
