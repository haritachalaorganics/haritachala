'use client';

import { useEffect, useState } from 'react';

interface SetupData {
  secret: string;
  uri: string;
  qrDataUrl: string;
  configured: boolean;
}

const INPUT = 'border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white';

export default function SetupClient() {
  const [data, setData] = useState<SetupData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('');
  const [testResult, setTestResult] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/setup')
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  async function testTotp() {
    if (!testCode) return;
    setTesting(true);
    setTestResult('idle');
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testCode }),
      });
      const d = await res.json();
      setTestResult(d.valid ? 'ok' : 'fail');
    } finally {
      setTesting(false);
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Loading…</p>
      </div>
    );
  }

  const CopyBtn = ({ text, label }: { text: string; label: string }) => (
    <button
      onClick={() => copy(text, label)}
      className="text-xs px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-600 transition-colors shrink-0"
    >
      {copied === label ? '✓ Copied' : 'Copy'}
    </button>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl font-bold">H</span>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800">Admin Setup</h1>
          <p className="text-sm text-stone-500 mt-1">Configure your admin credentials</p>
        </div>

        {/* Step 1 — Credentials */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-3">
          <h2 className="font-semibold text-stone-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-700 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
            Set your credentials
          </h2>
          <p className="text-sm text-stone-600">
            Add these to your <code className="bg-stone-100 px-1 rounded">.env.local</code> file (or Vercel Environment Variables):
          </p>
          <div className="bg-stone-900 text-green-400 rounded-xl p-4 text-xs font-mono space-y-1">
            <div>ADMIN_USERNAME=<span className="text-yellow-300">your-username</span></div>
            <div>ADMIN_PASSWORD_HASH=<span className="text-yellow-300">{'<SHA-256 of your password>'}</span></div>
            <div>ADMIN_JWT_SECRET=<span className="text-yellow-300">{'<random 32+ char string>'}</span></div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
            <p className="font-semibold mb-1">Generate your password hash — run in terminal:</p>
            <code className="block mt-1 bg-blue-100 rounded px-2 py-1 break-all">
              {'node -e "const c=require(\'crypto\');console.log(c.createHash(\'sha256\').update(\'YOUR_PASSWORD\').digest(\'hex\'))"'}
            </code>
          </div>
        </div>

        {/* Step 2 — TOTP */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-4">
          <h2 className="font-semibold text-stone-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-700 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
            Two-factor authentication
          </h2>

          {data.configured ? (
            <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
              ✓ TOTP is configured. Scan the QR code below to add it to another device.
            </p>
          ) : (
            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              ⚠ TOTP is not yet configured. Scan the QR code and add the secret to your env vars.
            </p>
          )}

          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.qrDataUrl} alt="TOTP QR Code" className="rounded-xl border border-stone-200" width={200} height={200} />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">Manual entry secret</p>
            <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-2">
              <code className="text-sm font-mono text-stone-800 flex-1 break-all">{data.secret}</code>
              <CopyBtn text={data.secret} label="secret" />
            </div>
          </div>

          {!data.configured && (
            <div className="bg-stone-900 text-green-400 rounded-xl p-3 text-xs font-mono">
              <div className="flex items-center justify-between gap-2">
                <span className="break-all">ADMIN_TOTP_SECRET=<span className="text-yellow-300">{data.secret}</span></span>
                <CopyBtn text={`ADMIN_TOTP_SECRET=${data.secret}`} label="env" />
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Test your code</p>
            <p className="text-xs text-stone-400 mb-2">
              You can add the same QR code to multiple phones — all will generate identical codes.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={testCode}
                onChange={(e) => { setTestCode(e.target.value); setTestResult('idle'); }}
                onKeyDown={(e) => e.key === 'Enter' && testTotp()}
                placeholder="000000"
                className={`${INPUT} flex-1 font-mono text-center tracking-widest`}
              />
              <button
                onClick={testTotp}
                disabled={testing || !testCode}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 disabled:bg-stone-300 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {testing ? '…' : 'Test'}
              </button>
            </div>
            {testResult === 'ok' && (
              <p className="text-sm text-green-700 mt-2">✓ Code is valid — your authenticator is working.</p>
            )}
            {testResult === 'fail' && (
              <p className="text-sm text-red-600 mt-2">✗ Invalid code. Check your clock sync or re-scan the QR code.</p>
            )}
          </div>
        </div>

        {/* Step 3 — Blob storage */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-3">
          <h2 className="font-semibold text-stone-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-700 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
            Enable live product saves (Vercel only)
          </h2>
          <p className="text-sm text-stone-600">
            Without this, changes only persist locally. To enable on Vercel:
          </p>
          <ol className="text-sm text-stone-600 space-y-1 list-decimal list-inside">
            <li>Vercel dashboard → your project → Storage → Create Blob store</li>
            <li><code className="bg-stone-100 px-1 rounded">BLOB_READ_WRITE_TOKEN</code> is added automatically</li>
            <li>Redeploy</li>
          </ol>
        </div>

        <div className="text-center">
          <a
            href="/admin"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Go to Login →
          </a>
        </div>
      </div>
    </div>
  );
}
