import { PayloadUser } from "./payload-user.interface";
import { Loader } from "./loader.interface";

export interface Context {
  payloadUser?: PayloadUser;
  loader?: Loader;
}
