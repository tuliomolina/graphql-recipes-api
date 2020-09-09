import { User } from "src/modules/user/user.entity";
import { Category } from "src/modules/category/category.entity";

type Resource = User | Category;

export const sortBatchById = (ids: number[], batchArray: Resource[]): any[] => {
  const map: { [id: number]: Resource } = {};

  batchArray.forEach((item) => {
    map[item.id] = item;
  });

  return ids.map((id) => map[id]);
};
