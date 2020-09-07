import { Resolver, Mutation, Arg, Ctx, Authorized, ID } from "type-graphql";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { CreateCategoryInput } from "./types/create-category-input.type";
import { UpdateCategoryInput } from "./types/update-category-input.type";
import { PayloadUser } from "src/utils/types/payload-user.interface";

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

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
    @Arg("id", (type) => ID) id: number,
    @Ctx("payloadUser") payloadUser: PayloadUser
  ): Promise<boolean> {
    return await this.categoryService.deleteCategory(id, payloadUser);
  }
}
