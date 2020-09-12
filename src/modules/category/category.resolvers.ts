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
import { User } from "../user/user.entity";
import { Loader } from "src/utils/types/loader.interface";
import { NameOrIdInput } from "../utils/types/name-or-id-input.type";

@Resolver((of) => Category)
export class CategoryResolver implements ResolverInterface<Category> {
  constructor(private categoryService: CategoryService) {}

  @Authorized()
  @Query((returns) => [Category], {
    description: "Returns an array of all existing categories",
  })
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Authorized()
  @Query((returns) => Category, {
    description: "Returns one category given either its name or id",
  })
  async getOneCategory(
    @Arg("categoryNameOrId", (type) => NameOrIdInput)
    categoryNameOrId: NameOrIdInput
  ): Promise<Category> {
    return await this.categoryService.getOneCategory(categoryNameOrId);
  }

  @Authorized()
  @Mutation((returns) => Category, {
    description: `Creates a new category belonging to the current user. 
    Returns the newly created category`,
  })
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
  @Mutation((returns) => Category, {
    description: `Updates a category identified by either name or id. This operation may only be 
    performed by the category's owner user. Returns the updated category`,
  })
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
  @Mutation((returns) => Boolean, {
    description: `Deletes a category identified by id. 
    This operation may only be performed by the category's owner user. 
    All recipes related to this category object are also deleted on cascade. 
    Returns true if the operation was successful`,
  })
  async deleteCategory(
    @Arg("id", (type) => Int) id: number,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<boolean> {
    return await this.categoryService.deleteCategory(id, payloadUser);
  }

  @FieldResolver()
  async user(
    @Root() category: Category,
    @Ctx("loader") loader: Loader
  ): Promise<User> {
    return await loader.user.load(category.userId);
  }
}
