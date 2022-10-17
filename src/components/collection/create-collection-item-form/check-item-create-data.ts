import { ICollectionItemCreate } from "../../../models/ICollectionItemCreate";

export const checkItemCreateData = (
  { name, tagNames, ownerName, creatorName }: ICollectionItemCreate,
  isCollectionItemSendLoading: boolean,
  creatorRole: string
) => {
  return (
    [
      name,
      tagNames.length,
      !isCollectionItemSendLoading,
      ownerName,
      creatorName,
    ].every(Boolean) &&
    (creatorRole === "admin" ||
      (ownerName === creatorName && creatorRole === "user"))
  );
};
