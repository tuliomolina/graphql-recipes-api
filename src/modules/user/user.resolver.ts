import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";

import { UserInput, LoginInput } from "./types/user-input.type";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthToken } from "./types/token.type";
import { AuthRequest } from "./types/auth-request.type";

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
  noauthdQuery(@Ctx() req: AuthRequest): string {
    // console.log("not auth endpoint context", req.user);
    return "all users";
  }

  @Authorized()
  @Query()
  authedQuery(@Ctx() req: AuthRequest): string {
    // console.log("auth endpoint context", req.user);
    return "Authorized users only!";
  }
}
