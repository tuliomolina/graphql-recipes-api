import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";

import { UserInput } from "./types/user-input.type";
import { LoginInput } from "./types/login-input.type";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthToken } from "./types/token.type";
import { Context } from "src/utils/types/context.interface";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User, {
    description:
      "New user registration, returns the newly created user in success",
  })
  async signUp(@Arg("userInput") userInput: UserInput): Promise<User> {
    return await this.userService.signUp(userInput);
  }

  @Mutation((returns) => AuthToken, {
    description: "User login, returns JWT auth token in success",
  })
  async login(@Arg("loginInput") loginInput: LoginInput): Promise<AuthToken> {
    return await this.userService.login(loginInput);
  }

  @Query()
  noauthdQuery(@Ctx() context: Context): string {
    console.log("not auth endpoint context", context.payloadUser);
    return "all users";
  }

  @Authorized()
  @Query()
  authedQuery(@Ctx() context: Context): string {
    console.log("auth endpoint context", context.payloadUser);
    return "Authorized users only!";
  }
}
