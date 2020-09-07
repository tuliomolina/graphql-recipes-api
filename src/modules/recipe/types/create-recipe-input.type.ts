import { InputType, Field, Int } from "type-graphql";
import { Length } from "class-validator";

import { Recipe } from "../recipe.entity";

@InputType()
export class CreateRecipeInput implements Partial<Recipe> {
  @Field()
  @Length(2, 255)
  name: string;

  @Field()
  @Length(5, 255)
  description: string;

  @Field()
  @Length(5, 255)
  ingredients: string;

  @Field((type) => Int)
  categoryId: number;
}
