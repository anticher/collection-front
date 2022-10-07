import { ICollectionItem } from "./ICollectionItem";
import { ITheme } from "./ITheme";

export interface ICollection {
    id: string;
    name: string;
    description: string;
    image?: any;
    ownerName: string;
    creatorName: string;
    createDate: string;
    updateDate?: any;
    updatedBy?: any;
    items: ICollectionItem[];
    theme: ITheme;
}
