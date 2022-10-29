import { ICollectionItem } from "../collection-item/collection-item.model";
import { ICustomFieldTitle } from "../collection-custom-field/custom-field-titile.model";
import { ITheme } from "../theme/theme.model";

export interface ICollection {
    id: string;
    name: string;
    description: string;
    image: string | null;
    ownerName: string;
    creatorName: string;
    createDate: string;
    customFieldTitles: ICustomFieldTitle[];
    items: ICollectionItem[];
    theme: ITheme;
}
