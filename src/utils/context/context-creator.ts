import { Request } from "express";

import { Context } from "../types/context.interface";
import { userLoader } from "../loaders/user-loader";
import { categoryLoader } from "../loaders/category-loader";
import { verifyToken } from "../auth/verify-token";

interface RawContext {
  req: Request;
}

export const contextCreator = ({ req }: RawContext): Context => {
  const context: Context = {};

  try {
    const payloadUser = verifyToken(req);
    context.payloadUser = {
      ...payloadUser,
    };
  } catch (error) {
    // let auth error be caught by TypeGraphQL authChecker
  }

  context.loader = {
    user: userLoader(),
    category: categoryLoader(),
  };

  return context;
};
