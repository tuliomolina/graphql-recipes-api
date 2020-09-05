import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "JWT auth token" })
export class AuthToken {
  @Field()
  token: string;
}
