import { ICollection } from "../../../app/models/collection/collection.model";

export const sortCollectionItems = (
  collection: ICollection,
  sortQuery: string
) => {
  const items = [...collection.items];
  switch (sortQuery) {
    case "create-date-up":
      return items.sort((a, b) => +a.createDate - +b.createDate);
    case "create-date-down":
      return items.sort((a, b) => +b.createDate - +a.createDate);
    case "name-up":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "name-down":
      return items.sort((a, b) => b.name.localeCompare(a.name));
    case "likes-up":
      return items.sort((a, b) => a.likes.length - b.likes.length);
    case "likes-down":
      return items.sort((a, b) => b.likes.length - a.likes.length);
    default:
      return items.sort((a, b) => +b.createDate - +a.createDate);
  }
};
