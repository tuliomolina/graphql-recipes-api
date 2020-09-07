import { InjectRepository } from "typeorm-typedi-extensions";
import { CategoryRepository } from "./category.repository";
import { PayloadUser } from "src/utils/types/payload-user.interface";
import { CreateCategoryInput } from "./types/create-category-input.type";
import { UserRepository } from "../user/user.repository";
import { Category } from "./category.entity";
import { UpdateCategoryInput } from "./types/update-category-input.type";

export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRespository: CategoryRepository,
    @InjectRepository(UserRepository)
    private userRespository: UserRepository
  ) {}

  //   private async findOwnedCategory(
  //     id: number,
  //     userId: number
  //   ): Promise<Category> {
  //     const category = await this.categoryRespository.findOne({
  //       id,
  //       userId,
  //     });

  //     if (!category) {
  //       throw new Error(`Category with ID "${id}" not found`);
  //     }
  //     return category;
  //   }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
    { userId }: PayloadUser
  ): Promise<Category> {
    const user = await this.userRespository.findUser(userId);

    return await this.categoryRespository.createCategory(
      createCategoryInput,
      user
    );
  }

  async updateCategory(
    updateCategoryInput: UpdateCategoryInput,
    { userId }: PayloadUser
  ): Promise<Category> {
    const { id, name } = updateCategoryInput;
    const result = await this.categoryRespository.update(
      { id, userId },
      { name }
    );

    if (result.affected === 0) {
      throw new Error(`Category with ID "${id}" not found`);
    }

    return await this.categoryRespository.findOne(id);
  }

  async deleteCategory(id: number, { userId }: PayloadUser): Promise<boolean> {
    const result = await this.categoryRespository.delete({ id, userId });

    if (result.affected === 0) {
      throw new Error(`Category with ID "${id}" not found`);
    }
    return true;
  }
}
