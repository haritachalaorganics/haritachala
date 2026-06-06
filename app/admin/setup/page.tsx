import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import SetupClient from './SetupClient';

export default async function SetupPage() {
  // In production, the setup page requires an active admin session.
  // In development it's always accessible so you can do first-time setup.
  if (process.env.NODE_ENV !== 'development') {
    const authed = await isAuthenticated();
    if (!authed) redirect('/admin');
  }

  return <SetupClient />;
}
