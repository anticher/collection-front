import { ICollectionItem } from "../collection-item/collection-item.model";

export interface ITag {
  id: string;
  name: string;
  collectionItems: ICollectionItem[];
  createDate: string;
}
