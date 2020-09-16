import { InjectRepository } from "typeorm-typedi-extensions";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

import { UserInput } from "./types/user-input.type";
import { LoginInput } from "./types/login-input.type";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { AuthToken } from "./types/token.type";
import { PayloadUser } from "../../utils/types/payload-user.interface";

@Service()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRespository: UserRepository
  ) {}

  async signUp(userInput: UserInput): Promise<User> {
    return await this.userRespository.createUser(userInput);
  }

  async login(loginInput: LoginInput): Promise<AuthToken> {
    const payload: PayloadUser = await this.userRespository.validateCredentials(
      loginInput
    );

    if (!payload) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const authToken: AuthToken = { token };

    return authToken;
  }

  async getUser(id: number): Promise<User> {
    return await this.userRespository.findOne(id);
  }
}
