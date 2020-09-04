import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  getHello() {
    return "Hello";
  }
}
