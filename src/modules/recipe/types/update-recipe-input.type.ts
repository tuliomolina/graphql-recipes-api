import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

import { Recipe } from "../recipe.entity";

@InputType()
export class UpdateRecipeInput implements Partial<Recipe> {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: true })
  @Length(2, 255)
  name?: string;

  @Field({ nullable: true })
  @Length(10, 255)
  description?: string;

  @Field({ nullable: true })
  @Length(10, 255)
  ingredients?: string;

  @Field((type) => ID, { nullable: true })
  categoryId?: number;
}
