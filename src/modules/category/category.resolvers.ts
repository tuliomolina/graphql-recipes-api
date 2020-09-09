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
import { SearchInput } from "../utils/types/search-input.type";

@Resolver((of) => Category)
export class CategoryResolver implements ResolverInterface<Category> {
  constructor(private categoryService: CategoryService) {}

  @Authorized()
  @Query((returns) => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Authorized()
  @Query((returns) => Category)
  async getOneCategory(
    @Arg("searchInput", (type) => SearchInput) searchInput: SearchInput
  ): Promise<Category> {
    return await this.categoryService.getOneCategory(searchInput);
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
  async user(
    @Root() category: Category,
    @Ctx("loader") loader: Loader
  ): Promise<User> {
    return await loader.user.load(category.userId);
  }
}
