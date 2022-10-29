import { ICustomFieldValue } from "../collection-item-custom-field/custom-field-value.model";
import { ILike } from "../like/like.model";
import { ITag } from "../tag/tag.model";

export interface ICollectionItem {
    id: string;
    name: string;
    tagNames: ITag[];
    comments: string; 
    collectionId: string;
    customFieldValues: ICustomFieldValue[];
    image: string | null;
    likes: ILike[];
    ownerName: string;
    creatorName: string;
    createDate: string;
}