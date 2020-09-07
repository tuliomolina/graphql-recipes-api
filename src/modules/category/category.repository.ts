import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Category } from "./category.entity";
import { User } from "../user/user.entity";
import { CreateCategoryInput } from "./types/create-category-input.type";

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findCategory(id: number) {
    const foundCategory = await this.findOne(id);

    if (!foundCategory) {
      throw new Error(`Category with ID "${id}" not found`);
    }

    return foundCategory;
  }

  async findOwnedCategory(id: number, userId: number): Promise<Category> {
    const foundCategory = await this.findOne({
      where: { id, userId },
    });

    if (!foundCategory) {
      throw new Error(`Category with ID "${id}" not found`);
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
