import {
  Resolver,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  Query,
  Int,
  FieldResolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipe.entity";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { UpdateRecipeInput } from "./types/update-recipe-input.type";
import { PayloadUser } from "src/utils/types/payload-user.interface";
import { Category } from "../category/category.entity";
import { User } from "../user/user.entity";
import { Loader } from "src/utils/types/loader.interface";

@Resolver((of) => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  constructor(private recipeService: RecipeService) {}

  @Authorized()
  @Query((returns) => [Recipe])
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeService.getRecipes();
  }

  @Authorized()
  @Query((returns) => Recipe)
  async getOneRecipe(@Arg("id", (type) => Int) id: number): Promise<Recipe> {
    return await this.recipeService.getOneRecipe(id);
  }

  @Authorized()
  @Query((returns) => [Recipe])
  async getMyRecipes(
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<Recipe[]> {
    return await this.recipeService.getMyRecipes(payloadUser);
  }

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
    @Arg("id", (type) => Int) id: number,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<boolean> {
    return await this.recipeService.deleteRecipe(id, payloadUser);
  }

  @FieldResolver()
  async category(
    @Root() recipe: Recipe,
    @Ctx("loader") loader: Loader
  ): Promise<Category> {
    return await loader.category.load(recipe.categoryId);
  }

  @FieldResolver()
  async user(
    @Root() recipe: Recipe,
    @Ctx("loader") loader: Loader
  ): Promise<User> {
    return await loader.user.load(recipe.userId);
  }
}
