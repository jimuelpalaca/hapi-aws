import Hapi from "@hapi/hapi";
import serverless from "serverless-http";

const server = new Hapi.Server({
  port: process.env.APP_PORT || 8080,
});

server.route({
  method: "GET",
  path: "/test",
  handler: (request, h) => {
    return "Hello, Serverless!";
  },
});

server.route({
  method: "POST",
  path: "/rpc",
  handler: (request, h) => {
    return {
      payload: request.payload,
    };
  },
});

const init = async () => {
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

export const handler = async (event: any, context: any) => {
  const handler = serverless(server as Hapi.ServerApplicationState);

  return handler(event, context);
};
