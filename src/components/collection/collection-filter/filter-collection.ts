import { ICollectionItem } from "../../../app/models/collection-item/collection-item.model";

export const filterCollectionItems = (items: ICollectionItem[], filterString: string) => {
    return items.filter((item) => item.name.includes(filterString))
}