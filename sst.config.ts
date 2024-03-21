/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ion-open-next-null-repo",
      home: "aws",
      removal: "remove",
      providers: {
        aws: true,
      },
    };
  },
  async run() {
    const api = new sst.aws.Function("ReproductionApi", {
      runtime: "nodejs20.x",
      architecture: "arm64",
      handler: "projects/api/src/lambdaServer.handler",
      environment: {},
      url: {
        cors: {
          allowOrigins: ["*"],
          allowHeaders: ["*"],
          allowMethods: ["*"],
        },
      },
    });
    // Web app frontend
    new sst.aws.Nextjs("ReproductionWebApp", {
      path: "projects/webapp",
      buildCommand: "yarn open-next-build",
      environment: {
        NEXT_PUBLIC_API_URL: api.url,
      },
      logging: "combined",
      invalidation: false,
    });
  },
});
