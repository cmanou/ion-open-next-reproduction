'use client';

import type { ApiRouter } from '@cmanou/api/routers/_app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, httpLink, loggerLink, splitLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import SuperJSON from 'superjson';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const trpc = createTRPCReact<ApiRouter>();

const baseLinkOptions = {
  transformer: SuperJSON,
  url: process.env['NEXT_PUBLIC_API_URL']!,
  fetch: (url: URL | RequestInfo, options: RequestInit | undefined) =>
    fetch(url, {
      ...options,
      // Send auth cookies
      credentials: 'include',
    }),
  headers: {
    'x-trpc-source': 'nextjs-react',
  },
};

export function TRPCReactQueryProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        splitLink({
          condition: (op) => op.path === 'auth.login' || op.path === 'auth.logout',
          true: httpLink(baseLinkOptions),
          // No more stream since lambda doesn't support it
          false: httpBatchLink(baseLinkOptions),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}

// Based on: https://github.com/t3-oss/create-t3-turbo/blob/e2f479fcc9e6c1efc82dda03389ec9bff0d115b9/apps/nextjs/src/trpc/react.tsx
