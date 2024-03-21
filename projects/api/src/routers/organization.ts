import { setTimeout } from 'timers/promises';
import { z } from 'zod';
import { router, userOrgAuthenticatedProcedure } from '../trpc.js';

export const organizationRouter = router({
  get: userOrgAuthenticatedProcedure
    .output(
      z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .nullish(),
    )
    .query(async () => {
      await setTimeout(300);
      // return  { id: '1', name: 'organization' };
      return null;
    }),
  getUsers: userOrgAuthenticatedProcedure.query(async ({ ctx }) => {
    await setTimeout(1000);
    return [
      {
        id: '1',
        name: 'user1',
        organizationId: ctx.session.organizationId,
      },
      {
        id: '2',
        name: 'user2',
        organizationId: ctx.session.organizationId,
      },
    ];
  }),
});
