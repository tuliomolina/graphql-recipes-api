import { NameOrIdInput } from "./types/name-or-id-input.type";

export const validateNameOrIdInput = (
  nameOrIdInput: NameOrIdInput,
  entityName: string
): void => {
  if (Object.keys(nameOrIdInput).length == 0) {
    throw new Error(
      `No name or id provided for NameOrIdInput type, ${entityName} entity`
    );
  }

  if (Object.keys(nameOrIdInput).length == 2) {
    throw new Error(
      `Only one field must be provided for NameOrIdInput type: either name or id, ${entityName} entity`
    );
  }
};
