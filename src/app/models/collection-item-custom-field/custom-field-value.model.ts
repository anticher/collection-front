import { ICollectionItem } from "../collection-item/collection-item.model";
import { ICustomFieldTitle } from "../collection-custom-field/custom-field-titile.model";

export interface ICustomFieldValue {
    id: string;
    fieldValue: string;
    customFieldTitle: ICustomFieldTitle;
    collectionId: string;
    item: ICollectionItem;
    creatorName: string;
    createDate: string;
}
