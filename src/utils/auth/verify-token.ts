import jwt from "jsonwebtoken";
import { PayloadUser } from "../types/payload-user.interface";

export const verifyToken = ({ headers }: any): PayloadUser => {
  const bearerHeader = headers.authorization;

  if (!bearerHeader) {
    throw new Error();
  }

  const token = bearerHeader.split(" ")[1];
  const payload: any = jwt.verify(token, process.env.JWT_SECRET);
  const payloadUser: PayloadUser = {
    userId: payload.userId,
    email: payload.email,
  };
  return payloadUser;
};
