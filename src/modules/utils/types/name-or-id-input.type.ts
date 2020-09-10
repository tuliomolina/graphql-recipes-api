import { InputType, Field, Int } from "type-graphql";
import { Length } from "class-validator";

@InputType({
  description:
    "Input to uniquely find an object by either name or id. Only one of the fields is accepted.",
})
export class NameOrIdInput {
  @Field((type) => Int, {
    nullable: true,
  })
  id?: number;

  @Field((type) => String, {
    nullable: true,
  })
  @Length(3, 255)
  name?: string;
}
