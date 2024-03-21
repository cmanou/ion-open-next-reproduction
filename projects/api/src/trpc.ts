import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';

const t = initTRPC
  .context<{
    session?:
      | {
          id: string;
          userId: string;
          organizationMembershipId: string | null;
          organizationId: string | null;
        }
      | undefined
      | null;
  }>()
  .create({ transformer: SuperJSON });

export const router = t.router;
export const publicProcedure = t.procedure;
export const userAuthenticatedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (ctx.session == undefined) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
      },
    },
  });
});

export const userOrgAuthenticatedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (ctx.session?.organizationMembershipId == null || ctx.session?.organizationId == null) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        organizationMembershipId: ctx.session.organizationMembershipId,
        organizationId: ctx.session.organizationId,
      },
    },
  });
});
