import { ITag } from "./ITag";

export interface ICollectionItem {
    id: string;
    name: string;
    tagNames: ITag[];
    comments: string; 
    collectionId: string;
    image: string;
    likes?: any;
    ownerName: string;
    creatorName: string;
    createDate: string;
    updateDate: any;
    updatedBy: any;
}