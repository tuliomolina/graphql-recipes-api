import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Recipe } from "./recipe.entity";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";
import { NameOrIdInput } from "../utils/types/name-or-id-input.type";
import { validateNameOrIdInput } from "../utils/validate-name-or-id-input";

@Service()
@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  async findRecipe(recipeNameOrIdInput: NameOrIdInput): Promise<Recipe> {
    validateNameOrIdInput(recipeNameOrIdInput, "Recipe");

    const { id, name } = recipeNameOrIdInput;
    const foundRecipe = await this.findOne({ where: [{ id }, { name }] });

    if (!foundRecipe) {
      throw new Error("Recipe not found");
    }

    return foundRecipe;
  }

  async findOwnedRecipe(
    recipeNameOrIdInput: NameOrIdInput,
    userId: number
  ): Promise<Recipe> {
    validateNameOrIdInput(recipeNameOrIdInput, "Recipe");

    const { id, name } = recipeNameOrIdInput;
    const foundRecipe = await this.findOne({
      where: [
        { id, userId },
        { name, userId },
      ],
    });

    if (!foundRecipe) {
      throw new Error("Recipe not found");
    }

    return foundRecipe;
  }

  async createRecipe(
    createRecipeInput: CreateRecipeInput,
    user: User,
    category: Category
  ): Promise<Recipe> {
    const { name, description, ingredients } = createRecipeInput;

    const recipe = this.create({
      name,
      description,
      ingredients,
      category,
      user,
    });

    return await recipe.save();
  }
}
