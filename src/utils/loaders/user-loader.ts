import DataLoader from "dataloader";
import { User } from "../../modules/user/user.entity";
import { sortBatchById } from "./helper/sort-batch-by-id";

type BatchUsers = (keys: readonly number[]) => Promise<User[]>;

const batchUsers: BatchUsers = async (keys) => {
  const userIds: number[] = [...keys];
  const users = await User.findByIds(userIds);
  return sortBatchById(userIds, users);
};

export const userLoader = () => new DataLoader<number, User>(batchUsers);
