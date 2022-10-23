import { ICollectionItem } from "./ICollectionItem";
import { IUser } from "./IUser";

export interface IComment {
  id: string;
  message: string;
  user: IUser;
  item: ICollectionItem;
  createDate: string;
}
