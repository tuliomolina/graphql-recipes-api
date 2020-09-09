import { SearchInput } from "./types/search-input.type";

export const validateSearchInputExistence = (
  searchInput: SearchInput
): boolean => {
  if (Object.keys(searchInput).length == 0) {
    throw new Error("No search input provided");
  }

  return true;
};
