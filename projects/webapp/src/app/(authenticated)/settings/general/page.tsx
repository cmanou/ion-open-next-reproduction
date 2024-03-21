import { getServerSideTrpc } from '@/lib/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import GeneralSettings from './general-settings';

export const dynamic = 'force-dynamic';

export default async function SettingsGeneralPage() {
  const trpc = await getServerSideTrpc();

  await trpc.organizations.get.prefetch();

  return (
    <HydrationBoundary state={trpc.dehydrate()}>
      <GeneralSettings />
    </HydrationBoundary>
  );
}
