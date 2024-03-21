import { getServerSideTrpc } from '@/lib/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { AuthenticatedNav } from './authenticated-nav';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const trpc = getServerSideTrpc();
  await trpc.auth.getCurrentUser.prefetch();

  // TODO: Add redirect to login if not logged in

  return (
    <div className="min-h-full">
      <div className="bg-orange-500 pb-48">
        <HydrationBoundary state={trpc.dehydrate()}>
          <AuthenticatedNav />
        </HydrationBoundary>
      </div>

      <main className="-mt-48">{children}</main>
    </div>
  );
}
