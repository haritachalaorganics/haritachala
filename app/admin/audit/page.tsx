import { requireAuth } from '@/lib/auth';
import { getAuditLog } from '@/lib/audit';
import AuditLogView from './AuditLogView';

export default async function AuditPage() {
  await requireAuth();
  const events = await getAuditLog();
  return <AuditLogView events={events} />;
}
