import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

import { Recipe } from "../recipe.entity";
import { NameOrIdInput } from "../../utils/types/name-or-id-input.type";

@InputType({
  description: "Type for defining and validating Recipe creation input data",
})
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

  @Field((type) => NameOrIdInput)
  categoryNameOrId: NameOrIdInput;
}
