import jwt from "jsonwebtoken";
import { Context } from "./types/context.interface";
import { PayloadUser } from "./types/payload-user.interface";

export const contextCreator = ({ req }: any): Context => {
  const context: Context = {};

  try {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);
      const payloadUser: PayloadUser = {
        userId: payload.userId,
        email: payload.email,
      };
      context.payloadUser = payloadUser;
    }
  } catch (error) {}

  return context;
};
