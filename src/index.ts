import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers/HelloResolver";

const port = 3000;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
  });

  const app = express();

  apolloServer.applyMiddleware({ app, path: "/" });

  app.listen(port, () => {
    console.log("Server running on port", port);
  });
};

main();
