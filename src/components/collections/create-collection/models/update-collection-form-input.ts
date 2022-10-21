import { customFieldTypeEnum } from "../enum/custom-field-type.enum";

export type UpdatedCustomField = {
    fieldType: customFieldTypeEnum,
    title: string
}

export interface UpdateCollectionFormInput {
  name: string;
  description: string;
  theme: string;
  image: FileList;
  customFields: {[key: string]: UpdatedCustomField; };
}
