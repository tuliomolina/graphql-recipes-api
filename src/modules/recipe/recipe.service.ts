import { InjectRepository } from "typeorm-typedi-extensions";
import { RecipeRepository } from "./recipe.repository";
import { Recipe } from "./recipe.entity";
import { CreateRecipeInput } from "./types/create-recipe-input.type";
import { UpdateRecipeInput } from "./types/update-recipe-input.type";
import { UserRepository } from "../user/user.repository";
import { PayloadUser } from "src/utils/types/payload-user.interface";
import { CategoryRepository } from "../category/category.repository";
import { UpdateRecipe } from "./types/update-recipe.interface";
import { NameOrIdInput } from "../utils/types/name-or-id-input.type";

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

  async getOneRecipe(recipeNameOrIdInput: NameOrIdInput): Promise<Recipe> {
    return await this.recipeRespository.findRecipe(recipeNameOrIdInput);
  }

  async getMyRecipes({ userId }: PayloadUser): Promise<Recipe[]> {
    return await this.recipeRespository.find({ userId });
  }

  async createRecipe(
    createRecipeInput: CreateRecipeInput,
    { userId }: PayloadUser
  ): Promise<Recipe> {
    const { categoryNameOrId } = createRecipeInput;

    const category = await this.categoryRespository.findCategory(
      categoryNameOrId
    );

    const user = await this.userRespository.findUser(userId);

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
    const { recipeNameOrId, categoryNameOrId } = updateRecipeInput;

    const recipe = await this.recipeRespository.findOwnedRecipe(
      recipeNameOrId,
      userId
    );

    delete updateRecipeInput.recipeNameOrId;
    delete updateRecipeInput.categoryNameOrId;

    const updateData: UpdateRecipe = { ...updateRecipeInput };

    if (categoryNameOrId) {
      const category = await this.categoryRespository.findCategory(
        categoryNameOrId
      );
      updateData.category = category;
    }

    const partialRecipe = this.recipeRespository.create({
      ...updateRecipeInput,
    });

    this.recipeRespository.merge(recipe, partialRecipe);

    return await recipe.save();
  }

  async deleteRecipe(id: number, { userId }: PayloadUser): Promise<boolean> {
    const result = await this.recipeRespository.delete({ id, userId });

    if (result.affected === 0) {
      throw new Error(`Recipe with ID "${id}" not found`);
    }
    return true;
  }
}
