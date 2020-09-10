import { ObjectType, Field } from "type-graphql";

@ObjectType({
  description: `JWT token object type. Used for client authentication. 
  Span of ${process.env.JWT_EXPIRES_IN}`,
})
export class AuthToken {
  @Field()
  token: string;
}
