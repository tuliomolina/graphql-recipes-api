import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import bcrypt from "bcryptjs";

import { User } from "./user.entity";
import { UserInput } from "./types/user-input.type";
import { LoginInput } from "./types/login-input.type";
import { PayloadUser } from "src/utils/types/payload-user.interface";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userInput: UserInput): Promise<User> {
    const { name, email, password } = userInput;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      } else {
        throw error;
      }
    }
  }

  async validateCredentials(loginInput: LoginInput): Promise<PayloadUser> {
    const { email, password } = loginInput;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      const payloadUser: PayloadUser = { userId: user.id, email: user.email };
      return payloadUser;
    }

    return undefined;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async findUser(id: number): Promise<User> {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new Error(`User with ID "${id}" not found`);
    }

    return foundUser;
  }
}
