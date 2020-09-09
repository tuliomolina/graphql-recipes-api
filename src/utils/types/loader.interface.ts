import { userLoader } from "../loaders/user-loader";
import { categoryLoader } from "../loaders/category-loader";

export interface Loader {
  user: ReturnType<typeof userLoader>;
  category: ReturnType<typeof categoryLoader>;
}
