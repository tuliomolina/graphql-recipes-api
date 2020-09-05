import { InjectRepository } from "typeorm-typedi-extensions";
import jwt from "jsonwebtoken";

import { UserInput, LoginInput } from "./types/user-input.type";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { AuthToken } from "./types/token.type";
import { AuthUser } from "src/modules/user/types/auth-request.type";

export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRespository: UserRepository
  ) {}

  async signUp(userInput: UserInput): Promise<User> {
    return await this.userRespository.signUp(userInput);
  }

  async login(loginInput: LoginInput): Promise<AuthToken> {
    const authentication: AuthUser = await this.userRespository.authenticateUser(
      loginInput
    );

    if (!authentication) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(authentication, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return { token };
  }
}
