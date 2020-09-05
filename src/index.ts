import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";
import { Container } from "typedi";
import dotEnv from "dotenv";

import { UserResolver } from "./modules/user/user.resolver";
import { connectDatabase } from "./config/typeorm.config";
import { authChecker } from "./utils/authChecker";
import { AuthContext } from "./modules/user/types/auth-context.type";
import { AuthRequest } from "./modules/user/types/auth-request.type";

async function main(): Promise<void> {
  dotEnv.config();

  useContainer(Container);
  await connectDatabase();

  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: "isoDate",
    container: Container,
    validate: true,
    authChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }: AuthContext): AuthRequest => req,
    formatError: ({ message, extensions }) => {
      return { message, extensions };
    },
  });

  apolloServer.applyMiddleware({ app, path: "/" });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
}

main();
