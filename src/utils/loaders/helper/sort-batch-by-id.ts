import { User } from "src/modules/user/user.entity";
import { Category } from "src/modules/category/category.entity";

type Entity = User | Category;

export const sortBatchById = <T extends Entity>(
  ids: number[],
  batchArray: T[]
): T[] => {
  const map: { [key: number]: T } = {};

  batchArray.forEach((item) => {
    map[item.id] = item;
  });

  return ids.map((id) => map[id]);
};
