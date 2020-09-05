import { InputType, Field } from "type-graphql";
import { MaxLength, IsEmail, MinLength, Matches } from "class-validator";

import { User } from "../user.entity";

@InputType({ description: "User registration input data" })
export class UserInput implements Partial<User> {
  @Field()
  @MaxLength(20)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must have at least one of each of the following characters: uppercae, lowercase, number and non-alphanumeric",
  })
  password: string;
}

@InputType({ description: "User login input data" })
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
