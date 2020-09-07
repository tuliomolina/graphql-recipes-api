import { Resolver, Arg, Mutation, Ctx, ID, Authorized } from "type-graphql";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipe.entity";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { UpdateRecipeInput } from "./types/update-recipe-input.type";
import { PayloadUser } from "src/utils/types/payload-user.interface";

@Resolver()
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Authorized()
  @Mutation((returns) => Recipe)
  async createRecipe(
    @Arg("createRecipeInput") createRecipeInput: CreateRecipeInput,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<Recipe> {
    return await this.recipeService.createRecipe(
      createRecipeInput,
      payloadUser
    );
  }

  @Authorized()
  @Mutation((returns) => Recipe)
  async updateRecipe(
    @Arg("updateRecipeInput") updateRecipeInput: UpdateRecipeInput,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<Recipe> {
    return await this.recipeService.updateRecipe(
      updateRecipeInput,
      payloadUser
    );
  }

  @Authorized()
  @Mutation((returns) => Boolean)
  async deleteRecipe(
    @Arg("id", (type) => ID) id: number,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<boolean> {
    return await this.recipeService.deleteRecipe(id, payloadUser);
  }
}
