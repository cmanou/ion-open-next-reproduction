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
    // Web app frontend
    new sst.aws.Nextjs("ReproductionWebApp", {
      path: "projects/webapp",
      buildCommand: "yarn open-next-build",
      invalidation: false,
    });
  },
});
