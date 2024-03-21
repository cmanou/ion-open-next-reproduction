'use server';

import type { ApiRouter } from '@cmanou/api/routers/_app';
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
} from '@trpc/react-query';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import SuperJSON from 'superjson';

const getAbsoluteApiUrl = async () => {
  return process.env['NEXT_PUBLIC_API_URL']!;
};

export const getServerSideTrpc = async () => {
  const baseLinkOptions: Parameters<typeof httpLink<ApiRouter>>[0] &
    Parameters<typeof httpBatchLink<ApiRouter>>[0] = {
    transformer: SuperJSON,
    url: await getAbsoluteApiUrl(),
    headers: cache(() => {
      const clientHeaders = headers();
      const requestHeaders = new Headers();
      // Pass through cookies and user agent
      if (clientHeaders.has('cookie')) {
        requestHeaders.set('cookie', clientHeaders.get('cookie')!);
      }
      if (clientHeaders.has('user-agent')) {
        requestHeaders.set('user-agent', clientHeaders.get('user-agent')!);
      }
      requestHeaders.set('x-trpc-source', 'nextjs-rsc');
      return requestHeaders;
    }),
    fetch: async (url, options) => {
      // Remove content-length header if body is empty
      if (options?.body == null && options?.headers !== undefined) {
        if (Array.isArray(options.headers)) {
          options.headers = options.headers.filter(
            ([key]) => key.toLowerCase() !== 'content-length',
          );
        } else if (options.headers instanceof Headers) {
          options.headers.delete('content-length');
        } else {
          delete options.headers['content-length'];
        }
      }
      return fetch(url, options);
    },
  };

  const proxyClient = createTRPCClient<ApiRouter>({
    links: [
      loggerLink({
        enabled: () => process.env.NODE_ENV === 'development',
      }),
      splitLink({
        condition: (op) => op.path === 'auth.login' || op.path === 'auth.logout',
        true: httpLink(baseLinkOptions),
        // No more stream since lambda doesn't support it
        false: httpBatchLink(baseLinkOptions),
      }),
    ],
  });

  const serverTrpc = createServerSideHelpers({ client: proxyClient });

  return serverTrpc;
};
