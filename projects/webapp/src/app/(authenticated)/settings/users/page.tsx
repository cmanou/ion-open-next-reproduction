import { getServerSideTrpc } from '@/lib/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import UserSettings from './user-settings';

export const dynamic = 'force-dynamic';

export default async function SettingsUsersPage() {
  const trpc = await getServerSideTrpc();

  await trpc.organizations.getUsers.prefetch();

  return (
    <HydrationBoundary state={trpc.dehydrate()}>
      <UserSettings />
    </HydrationBoundary>
  );
}
