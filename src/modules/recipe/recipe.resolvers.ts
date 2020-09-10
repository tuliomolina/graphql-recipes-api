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
import { NameOrIdInput } from "../utils/types/name-or-id-input.type";
import { FilterInput } from "./types/filter-input.type";

@Resolver((of) => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  constructor(private recipeService: RecipeService) {}
  @Authorized()
  @Query((returns) => [Recipe], {
    description: "Returns an array of all existing recipes",
  })
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeService.getRecipes();
  }

  @Authorized()
  @Query((returns) => Recipe, {
    description: "Returns one recipe given either its name or id",
  })
  async getOneRecipe(
    @Arg("nameOrIdInput", (type) => NameOrIdInput) nameOrIdInput: NameOrIdInput
  ): Promise<Recipe> {
    return await this.recipeService.getOneRecipe(nameOrIdInput);
  }

  @Authorized()
  @Query((returns) => [Recipe], {
    description:
      "Returns an array of all existing recipes belonging to the current user",
  })
  async getMyRecipes(
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<Recipe[]> {
    return await this.recipeService.getMyRecipes(payloadUser);
  }

  @Authorized()
  @Query((returns) => [Recipe], {
    description: `Filters amongst all recipes matching the following criteria: 
    array of recipe names, description, ingredient, array of category names. 
    Each criterion is optional, and they are combined using AND logical operators. 
    Returns an array of recipes`,
  })
  async getFilteredRecipes(
    @Arg("filterInput") filterInput: FilterInput
  ): Promise<Recipe[]> {
    return await this.recipeService.getFilteredRecipes(filterInput);
  }

  @Authorized()
  @Mutation((returns) => Recipe, {
    description: `Creates a new recipe belonging to the current user and linked 
      to an existing category provided with either name or id. Returns the newly created recipe`,
  })
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
  @Mutation((returns) => Recipe, {
    description: `Updates a recipe identified by either name or id. This operation may only be 
    performed by the recipe's owner user. Returns the updated recipe`,
  })
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
  @Mutation((returns) => Boolean, {
    description: `Deletes a recipe identified by either name or id. 
  This operation may only be performed by the recipe's owner user. 
  Returns true if the operation was successful.`,
  })
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
