import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Category } from "./category.entity";
import { User } from "../user/user.entity";
import { CreateCategoryInput } from "./types/create-category-input.type";

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findCategory(id: number) {
    const foundRecipe = await this.findOne(id);

    if (!foundRecipe) {
      throw new Error(`Recipe with ID "${id}" not found`);
    }

    return foundRecipe;
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
