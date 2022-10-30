import { ICollectionItem } from "../collection-item/collection-item.model";
import { ICustomFieldTitle } from "../collection-custom-field/custom-field-titile.model";
import { ITopic } from "../topic/topic.model";

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
    topic: ITopic;
}
