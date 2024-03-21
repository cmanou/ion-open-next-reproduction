import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { apiRouter } from './routers/_app.js';

const server = createHTTPServer({
  router: apiRouter,
  createContext: async () => {
    return {
      session: {
        id: 'session-id',
        userId: 'user-id',
        organizationMembershipId: 'organization-membership-id',
        organizationId: 'organization-id',
      },
    };
  },
});

// Log server errors
server.on('error', console.error);

server.listen(3333);
