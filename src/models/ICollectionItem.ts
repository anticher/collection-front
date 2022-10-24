import { ICustomFieldValue } from "./ICustomFieldValue";
import { ILike } from "./ILike";
import { ITag } from "./ITag";

export interface ICollectionItem {
    id: string;
    name: string;
    tagNames: ITag[];
    comments: string; 
    collectionId: string;
    customFieldValues: ICustomFieldValue[];
    image: string;
    likes: ILike[];
    ownerName: string;
    creatorName: string;
    createDate: string;
    updateDate: any;
    updatedBy: any;
}