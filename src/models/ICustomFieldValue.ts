import { ICollectionItem } from "./ICollectionItem";
import { ICustomFieldTitle } from "./ICustomFieldTitle";

export interface ICustomFieldValue {
    id: string;
    fieldValue: string;
    customFieldTitle: ICustomFieldTitle;
    collectionId: string;
    item: ICollectionItem;
    creatorName: string;
    createDate: string;
    updateDate: string | null;
    updatedBy: string | null;
}
