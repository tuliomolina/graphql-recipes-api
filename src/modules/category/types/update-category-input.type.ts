import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

import { Category } from "../category.entity";

@InputType()
export class UpdateCategoryInput implements Partial<Category> {
  @Field((type) => ID)
  id: number;

  @Field()
  @Length(3, 255)
  name: string;
}
