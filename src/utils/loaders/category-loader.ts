import DataLoader from "dataloader";
import { Category } from "../../modules/category/category.entity";
import { sortBatchById } from "./helper/sort-batch-by-id";

type BatchCategories = (keys: readonly number[]) => Promise<Category[]>;

const batchCategories: BatchCategories = async (keys) => {
  const categoryIds: number[] = [...keys];
  const categories = await Category.findByIds(categoryIds);
  return sortBatchById(categoryIds, categories);
};

export const categoryLoader = () =>
  new DataLoader<number, Category>(batchCategories);
