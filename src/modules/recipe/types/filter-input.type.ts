import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class FilterInput {
  @Field((type) => String, { nullable: true })
  @Length(2, 255)
  name: string;

  @Field((type) => String, { nullable: true })
  @Length(5, 255)
  descriptionTerm: string;

  @Field((type) => [String], { nullable: true })
  ingredientList?: string[];

  @Field((type) => [String], { nullable: true })
  categoryNameList?: string[];
}
