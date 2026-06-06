'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { AuditEvent } from '@/lib/audit';

interface Props {
  events: AuditEvent[];
}

function formatDate(iso: string): { date: string; time: string; relative: string } {
  const d = new Date(iso);
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  let relative: string;
  if (diffMin < 1) relative = 'just now';
  else if (diffMin < 60) relative = `${diffMin}m ago`;
  else if (diffHr < 24) relative = `${diffHr}h ago`;
  else if (diffDay < 7) relative = `${diffDay}d ago`;
  else relative = d.toLocaleDateString();

  return {
    date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    relative,
  };
}

function abbreviateUA(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'Safari';
  if (/curl/.test(ua)) return 'curl';
  if (ua === 'unknown') return '—';
  return ua.slice(0, 30);
}

export default function AuditLogView({ events: initialEvents }: Props) {
  const router = useRouter();
  const [events, setEvents] = useState<AuditEvent[]>(initialEvents);
  const [filter, setFilter] = useState<'ALL' | 'SUCCESS' | 'FAILURE'>('ALL');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        if (filter === 'SUCCESS') return e.type === 'LOGIN_SUCCESS';
        if (filter === 'FAILURE') return e.type === 'LOGIN_FAILURE';
        return true;
      }),
    [events, filter],
  );

  const stats = useMemo(
    () => ({
      total: events.length,
      success: events.filter((e) => e.type === 'LOGIN_SUCCESS').length,
      failure: events.filter((e) => e.type === 'LOGIN_FAILURE').length,
    }),
    [events],
  );

  async function refresh() {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/audit');
      if (res.ok) setEvents(await res.json());
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <div>
            <h1 className="font-semibold text-stone-800 text-sm leading-tight">Audit Log</h1>
            <p className="text-xs text-stone-400 leading-tight">Login history</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="text-xs text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            {refreshing ? 'Refreshing…' : '↻ Refresh'}
          </button>
          <a
            href="/admin/dashboard"
            className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-100 text-stone-700 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs font-medium mt-0.5">Total Events</p>
          </div>
          <div className="bg-green-100 text-green-700 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{stats.success}</p>
            <p className="text-xs font-medium mt-0.5">Successful Logins</p>
          </div>
          <div className="bg-red-100 text-red-700 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold">{stats.failure}</p>
            <p className="text-xs font-medium mt-0.5">Failed Attempts</p>
          </div>
        </div>

        {stats.failure > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
            <span className="text-lg leading-tight">⚠</span>
            <span>
              {stats.failure} failed login attempt{stats.failure !== 1 ? 's' : ''} recorded.
              {stats.failure >= 5 && ' Consider changing your password if you did not make these attempts.'}
            </span>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex gap-2">
          {(['ALL', 'SUCCESS', 'FAILURE'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-stone-800 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {f === 'ALL' ? 'All' : f === 'SUCCESS' ? '✓ Successful' : '✗ Failed'}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400 self-center">
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} · last {events.length} total stored
          </span>
        </div>

        {/* Log table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-stone-400 text-sm">
              {events.length === 0 ? 'No login events recorded yet.' : 'No events match this filter.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Browser</th>
                    <th className="px-4 py-3">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((event) => {
                    const { date, time, relative } = formatDate(event.timestamp);
                    const isSuccess = event.type === 'LOGIN_SUCCESS';
                    return (
                      <tr key={event.id} className={`hover:bg-stone-50 transition-colors ${!isSuccess ? 'bg-red-50/30' : ''}`}>
                        <td className="px-4 py-3">
                          {isSuccess ? (
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              Failed
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-stone-800 font-medium">{relative}</p>
                          <p className="text-xs text-stone-400">{date} · {time}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-stone-800">{event.username}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-stone-600">{event.ip}</span>
                        </td>
                        <td className="px-4 py-3 text-stone-600 text-xs">
                          {abbreviateUA(event.userAgent)}
                        </td>
                        <td className="px-4 py-3 text-xs text-stone-500">
                          {event.reason ?? '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-stone-400 text-center">
          Storing the {MAX_EVENTS} most recent events. Oldest entries are dropped automatically.
        </p>
      </main>
    </div>
  );
}

const MAX_EVENTS = 200;
