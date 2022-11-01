import { ICustomFieldValue } from "../collection-item-custom-field/custom-field-value.model";

export interface ICollectionItemCreate {
  ownerName: string;
  username: string;
  name: string;
  image: string | null;
  tagNames: string;
  customFields: Record<string, ICustomFieldValue>
  collectionId: string;
}
