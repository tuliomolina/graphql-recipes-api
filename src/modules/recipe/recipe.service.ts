import { InjectRepository } from "typeorm-typedi-extensions";
import { RecipeRepository } from "./recipe.repository";
import { Recipe } from "./recipe.entity";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { UpdateRecipeInput } from "./types/update-recipe-input.type";
import { UserRepository } from "../user/user.repository";
import { PayloadUser } from "src/utils/types/payload-user.interface";
import { CategoryRepository } from "../category/category.repository";
import { UpdateRecipe } from "./types/update-recipe.interface";
import { SearchInput } from "../utils/types/search-input.type";
import { validateSearchInputExistence } from "../utils/validate-search-input-existence";

export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private recipeRespository: RecipeRepository,
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    @InjectRepository(CategoryRepository)
    private categoryRespository: CategoryRepository
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeRespository.find();
  }

  async getOneRecipe(searchInput: SearchInput): Promise<Recipe> {
    validateSearchInputExistence(searchInput);

    const recipe = await this.recipeRespository.findRecipe(searchInput);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  }

  async getMyRecipes({ userId }: PayloadUser): Promise<Recipe[]> {
    return await this.recipeRespository.find({ userId });
  }

  async getRecipesByOneCategory(categoryId: number): Promise<Recipe[]> {
    return await this.recipeRespository.find({ categoryId });
  }

  async createRecipe(
    createRecipeInput: CreateRecipeInput,
    { userId }: PayloadUser
  ): Promise<Recipe> {
    const user = await this.userRespository.findUser(userId);

    const { categoryId } = createRecipeInput;

    const category = await this.categoryRespository.findCategory(categoryId);

    return await this.recipeRespository.createRecipe(
      createRecipeInput,
      user,
      category
    );
  }

  async updateRecipe(
    updateRecipeInput: UpdateRecipeInput,
    { userId }: PayloadUser
  ): Promise<Recipe> {
    if (Object.keys(updateRecipeInput).length <= 1) {
      throw new Error("No update field provided");
    }

    const { id, categoryId } = updateRecipeInput;

    delete updateRecipeInput.categoryId;
    const updateData: UpdateRecipe = { ...updateRecipeInput };

    if (categoryId) {
      const category = await this.categoryRespository.findCategory(categoryId);
      updateData.category = category;
    }

    await this.recipeRespository.update({ id, userId }, updateData);

    return await this.recipeRespository.findOwnedRecipe(id, userId);
  }

  async deleteRecipe(id: number, { userId }: PayloadUser): Promise<boolean> {
    const result = await this.recipeRespository.delete({ id, userId });

    if (result.affected === 0) {
      throw new Error(`Recipe with ID "${id}" not found`);
    }
    return true;
  }
}
