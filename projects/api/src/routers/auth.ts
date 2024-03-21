import { setTimeout } from 'timers/promises';
import { publicProcedure, router } from '../trpc.js';

export const authRouter = router({
  getCurrentUser: publicProcedure.query(async () => {
    await setTimeout(400);
    return {
      id: '1',
      name: 'user1',
    };
  }),
});
