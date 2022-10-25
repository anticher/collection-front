import { ICollectionItem } from "./ICollectionItem";

export interface ITag {
  id: string;
  name: string;
  collectionItems: ICollectionItem[];
  createDate: string;
}
