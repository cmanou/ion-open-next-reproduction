'use client';

import { trpc } from '@/lib/trpc/react';

export default function GeneralSettings() {
  const { data } = trpc.organizations.get.useQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
