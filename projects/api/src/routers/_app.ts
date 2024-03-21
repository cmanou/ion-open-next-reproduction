import { router } from '../trpc.js';
import { authRouter } from './auth.js';
import { organizationRouter } from './organization.js';

export const apiRouter = router({
  organizations: organizationRouter,
  auth: authRouter,
});

export type ApiRouter = typeof apiRouter;
