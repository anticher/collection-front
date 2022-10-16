import { CustomFieldValue } from "./custom-field-value";

export interface CreateCollectionItemFormInput {
  name: string;
  tagNames: string[];
  customFields: Record<string, CustomFieldValue>
}
