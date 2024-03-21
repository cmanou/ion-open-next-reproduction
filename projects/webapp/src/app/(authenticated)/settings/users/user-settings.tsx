'use client';

import { Button } from '@/components/shadcn/ui/button';
import { trpc } from '@/lib/trpc/react';

export default function UserSettings() {
  const { data, refetch } = trpc.organizations.getUsers.useQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={() => refetch()}>Refetch</Button>
    </div>
  );
}
