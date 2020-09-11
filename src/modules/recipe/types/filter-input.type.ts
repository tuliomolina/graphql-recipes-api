import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType({
  description: "Type for defining and validating Recipe filtering input data",
})
export class FilterInput {
  @Field((type) => [String], { nullable: true })
  nameList: string[];

  @Field((type) => String, { nullable: true })
  @Length(2, 255)
  descriptionTerm: string;

  @Field((type) => String, { nullable: true })
  @Length(5, 255)
  ingredient?: string;

  @Field((type) => [String], { nullable: true })
  categoryNameList?: string[];
}
