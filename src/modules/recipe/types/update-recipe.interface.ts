import { Category } from "src/modules/category/category.entity";

export interface UpdateRecipe {
  name?: string;

  description?: string;

  ingredients?: string;

  category?: Category;
}
