import { Repository, EntityRepository } from "typeorm";
import { Recipe } from "./recipe.entity";
import { Service } from "typedi";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

@Service()
@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  async findRecipe(id: number): Promise<Recipe> {
    const foundRecipe = await this.findOne(id);

    if (!foundRecipe) {
      throw new Error(`Recipe with ID "${id}" not found`);
    }

    return foundRecipe;
  }

  async findOwnedRecipe(id: number, userId: number): Promise<Recipe> {
    const foundRecipe = await this.findOne({
      where: { id, userId },
    });
    if (!foundRecipe) {
      throw new Error(`Recipe with ID "${id}" not found`);
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
