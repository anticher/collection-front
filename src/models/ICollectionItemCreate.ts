import { CustomFieldValue } from "../components/collections/create-collection/models/custom-field-value";

export interface ICollectionItemCreate {
  ownerName: string;
  creatorName: string;
  name: string;
  image: string | null;
  tagNames: string;
  customFields: Record<string, CustomFieldValue>
  collectionId: string;
}
