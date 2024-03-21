import { getServerSideTrpc } from '@/lib/trpc/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const trpc = getServerSideTrpc();

  const user = await trpc.auth.getCurrentUser.fetch().catch(() => null);

  if (user !== null) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
