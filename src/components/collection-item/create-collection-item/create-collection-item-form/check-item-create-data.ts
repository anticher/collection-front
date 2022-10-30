import { ICollectionItemCreate } from "../../../../app/models/collection-item/create.model";

export const checkItemCreateData = (
  { name, tagNames, ownerName, username }: ICollectionItemCreate,
  isCollectionItemSendLoading: boolean,
  creatorRole: string
) => {
  return (
    [
      name,
      tagNames.length,
      !isCollectionItemSendLoading,
      ownerName,
      username,
    ].every(Boolean) &&
    (creatorRole === "admin" ||
      (ownerName === username && creatorRole === "user"))
  );
};
