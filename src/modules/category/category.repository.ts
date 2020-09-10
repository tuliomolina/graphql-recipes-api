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
  async findCategory(categoryNameOrIdInput: NameOrIdInput) {
    validateNameOrIdInput(categoryNameOrIdInput, "Category");

    const { id, name } = categoryNameOrIdInput;
    const foundCategory = await this.findOne({
      where: [{ id }, { name }],
    });

    if (!foundCategory) {
      throw new Error("Category not found");
    }

    return foundCategory;
  }

  async findOwnedCategory(
    categoryNameOrIdInput: NameOrIdInput,
    userId: number
  ) {
    validateNameOrIdInput(categoryNameOrIdInput, "Category");

    const { id, name } = categoryNameOrIdInput;
    const foundCategory = await this.findOne({
      where: [
        { id, userId },
        { name, userId },
      ],
    });

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

    return await category.save();
  }
}
