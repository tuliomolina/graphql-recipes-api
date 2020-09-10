import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

import { User } from "../user.entity";

@InputType({
  description: "Type for defining and validating User login input data",
})
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
