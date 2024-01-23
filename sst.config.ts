import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Service } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "t3-sst-docker",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // const site = new NextjsSite(stack, "site");

      // stack.addOutputs({
      //   SiteUrl: site.url,
      // });

      const nextjsService = new Service(stack, "nextjs", {
        path: ".",
        port: 3000,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
        },
      });
      stack.addOutputs({
        ServiceUrl: nextjsService.url,
      });
    });
  },
} satisfies SSTConfig;
