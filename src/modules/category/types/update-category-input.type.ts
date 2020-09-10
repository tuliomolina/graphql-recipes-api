import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

import { NameOrIdInput } from "../../utils/types/name-or-id-input.type";

@InputType()
export class UpdateCategoryInput {
  @Field((type) => NameOrIdInput)
  categoryNameOrId: NameOrIdInput;

  @Field()
  @Length(3, 255)
  name: string;
}
