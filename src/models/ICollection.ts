import { ICollectionItem } from "./ICollectionItem";
import { ICustomFieldTitle } from "./ICustomFieldTitle";
import { ITheme } from "./ITheme";

export interface ICollection {
    id: string;
    name: string;
    description: string;
    image: string | null;
    ownerName: string;
    creatorName: string;
    createDate: string;
    updateDate: string | null;
    updatedBy: string | null;
    customFieldTitles: ICustomFieldTitle[];
    items: ICollectionItem[];
    theme: ITheme;
}
