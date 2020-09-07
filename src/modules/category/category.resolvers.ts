import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Authorized,
  Int,
  Query,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { CreateCategoryInput } from "./types/create-category-input.type";
import { UpdateCategoryInput } from "./types/update-category-input.type";
import { PayloadUser } from "src/utils/types/payload-user.interface";
import { Recipe } from "../recipe/recipe.entity";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { RecipeService } from "../recipe/recipe.service";

@Resolver((of) => Category)
export class CategoryResolver implements ResolverInterface<Category> {
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  @Authorized()
  @Query((returns) => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Authorized()
  @Query((returns) => Category)
  async getOneCategory(
    @Arg("id", (type) => Int) id: number
  ): Promise<Category> {
    return await this.categoryService.getOneCategory(id);
  }

  @Authorized()
  @Mutation((returns) => Category, { description: "Creates new category" })
  async createCategory(
    @Arg("createCategoryInput") createCategoryInput: CreateCategoryInput,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<Category> {
    return await this.categoryService.createCategory(
      createCategoryInput,
      payloadUser
    );
  }

  @Authorized()
  @Mutation((returns) => Category, { description: "Updates owned category" })
  async updateCategory(
    @Arg("updateCategoryInput") updateCategoryInput: UpdateCategoryInput,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ) {
    return await this.categoryService.updateCategory(
      updateCategoryInput,
      payloadUser
    );
  }

  @Authorized()
  @Mutation((returns) => Boolean, { description: "Deletes owned category" })
  async deleteCategory(
    @Arg("id", (type) => Int) id: number,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<boolean> {
    return await this.categoryService.deleteCategory(id, payloadUser);
  }

  @FieldResolver()
  async recipes(@Root() category: Category): Promise<Recipe[]> {
    return await this.recipeService.getRecipesByOneCategory(category.id);
  }

  @FieldResolver()
  async user(@Root() category: Category): Promise<User> {
    return await this.userService.getUser(category.userId);
  }
}
