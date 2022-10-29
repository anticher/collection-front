import { ICollectionItem } from "../collection-item/collection-item.model";
import { IUser } from "../user/user.model";

export interface IComment {
  id: string;
  message: string;
  user: IUser;
  item: ICollectionItem;
  createDate: string;
}
