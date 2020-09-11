import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

import { NameOrIdInput } from "../../utils/types/name-or-id-input.type";

@InputType({
  description: "Type for defining and validating Category update input data",
})
export class UpdateCategoryInput {
  @Field((type) => NameOrIdInput)
  categoryNameOrId: NameOrIdInput;

  @Field()
  @Length(2, 255)
  name: string;
}
