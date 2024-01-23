import { type SSTConfig } from "sst";
import { Service } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "t3-sst-docker",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app.stack(function Site({ stack }) {
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
