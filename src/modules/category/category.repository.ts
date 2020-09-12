import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Category } from "./category.entity";
import { User } from "../user/user.entity";
import { CreateCategoryInput } from "./types/create-category-input.type";
import { NameOrIdInput } from "../utils/types/name-or-id-input.type";
import { validateNameOrIdInput } from "../utils/validate-name-or-id-input";

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findCategory(
    categoryNameOrId: NameOrIdInput,
    userId?: number
  ): Promise<Category> {
    validateNameOrIdInput(categoryNameOrId, "Category");

    const { id, name } = categoryNameOrId;
    const query = this.createQueryBuilder("category").leftJoinAndSelect(
      "category.recipes",
      "recipes"
    );

    query.where("(category.id = :id OR category.name = :name)", { id, name });

    if (userId) {
      query.andWhere("category.userId = :userId", { userId });
    }

    const foundCategory = await query.getOne();

    if (!foundCategory) {
      throw new Error("Category not found");
    }

    return foundCategory;
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
    user: User
  ): Promise<Category> {
    const category = this.create({
      name: createCategoryInput.name,
      user,
    });

    return await category.saveCheckingDuplicateName();
  }
}
