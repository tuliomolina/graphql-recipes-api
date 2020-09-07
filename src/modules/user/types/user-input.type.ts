import { InputType, Field } from "type-graphql";
import { MaxLength, IsEmail, Matches, Length } from "class-validator";

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
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must have at least one of each of the following characters: uppercae, lowercase, number and non-alphanumeric",
  })
  password: string;
}
