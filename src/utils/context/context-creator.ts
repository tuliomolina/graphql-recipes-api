import { Context } from "../types/context.interface";
import { userLoader } from "../loaders/user-loader";
import { categoryLoader } from "../loaders/category-loader";
import { verifyToken } from "../auth/verify-token";

export const contextCreator = ({ req }: any): Context => {
  const context: Context = {};

  try {
    const payloadUser = verifyToken(req);
    context.payloadUser = {
      ...payloadUser,
    };
  } catch (error) {}

  context.loader = {
    user: userLoader(),
    category: categoryLoader(),
  };

  return context;
};
