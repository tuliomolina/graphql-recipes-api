import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import bcrypt from "bcryptjs";

import { User } from "./user.entity";
import { UserInput, LoginInput } from "./types/user-input.type";
import { AuthUser } from "./types/auth-request.type";

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

  async authenticateUser(loginInput: LoginInput): Promise<AuthUser | null> {
    const { email, password } = loginInput;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return { userId: user.id, email: user.email };
    }
    return null;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
