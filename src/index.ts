import "reflect-metadata";
import "dataloader";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";
import { Container } from "typedi";
import dotEnv from "dotenv";

import { UserResolver } from "./modules/user/user.resolver";
import { connectDatabase } from "./config/typeorm.config";
import { contextCreator } from "./utils/context/context-creator";
import { authenticationChecker } from "./utils/auth/authentication-checker";
import { RecipeResolver } from "./modules/recipe/recipe.resolvers";
import { CategoryResolver } from "./modules/category/category.resolvers";

async function main() {
  dotEnv.config();

  useContainer(Container);
  await connectDatabase();

  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, RecipeResolver, CategoryResolver],
    dateScalarMode: "isoDate",
    validate: true,
    container: Container,
    authChecker: authenticationChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: contextCreator,
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
