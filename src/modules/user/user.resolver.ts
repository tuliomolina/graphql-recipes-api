import { Resolver, Arg, Mutation } from "type-graphql";

import { UserInput } from "./types/user-input.type";
import { LoginInput } from "./types/login-input.type";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthToken } from "./types/token.type";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User, {
    description: "New user creation, returns the newly created user object",
  })
  async signUp(@Arg("userInput") userInput: UserInput): Promise<User> {
    return await this.userService.signUp(userInput);
  }

  @Mutation((returns) => AuthToken, {
    description: "User login, returns JWT auth token",
  })
  async login(@Arg("loginInput") loginInput: LoginInput): Promise<AuthToken> {
    return await this.userService.login(loginInput);
  }
}
