import type { OpenNextConfig } from 'open-next/types/open-next.d.ts';

const config = {
  default: {
    override: {
      wrapper: 'aws-lambda-streaming',
    },
  },
  buildCommand: 'yarn build',
} satisfies OpenNextConfig;

export default config;
export type Config = typeof config;
