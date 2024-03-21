import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { apiRouter, type ApiRouter } from './routers/_app.js';

export const handler = awsLambdaRequestHandler<
  ApiRouter,
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
>({
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
