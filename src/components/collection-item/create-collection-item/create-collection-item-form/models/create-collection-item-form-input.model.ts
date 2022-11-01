import { ICustomFieldValue } from "../../../../../app/models/collection-item-custom-field/custom-field-value.model";

export interface CreateCollectionItemFormInput {
  name: string;
  image: FileList;
  tagNames: string[];
  customFields: Record<string, ICustomFieldValue>
}
