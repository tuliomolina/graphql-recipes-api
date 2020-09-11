import { AuthChecker } from "type-graphql";

import { Context } from "../types/context.interface";

export const authenticationChecker: AuthChecker<Context> = ({ context }) => {
  return context.payloadUser ? true : false;
};
