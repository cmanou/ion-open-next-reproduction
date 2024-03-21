'use client';

import { Button } from '@/components/shadcn/ui/button';
import { trpc } from '@/lib/trpc/react';

export default function GeneralSettings() {
  const { data, refetch } = trpc.organizations.get.useQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={() => refetch()}>Refetch</Button>
    </div>
  );
}
