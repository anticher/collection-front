import { CustomFieldValue } from "./custom-field-value";

export interface CreateCollectionItemFormInput {
  name: string;
  image: FileList;
  tagNames: string[];
  customFields: Record<string, CustomFieldValue>
}
