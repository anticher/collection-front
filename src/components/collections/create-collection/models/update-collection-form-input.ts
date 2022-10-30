import { customFieldTypeEnum } from "../../../../app/enum/custom-field-type.enum";

export type UpdatedCustomField = {
    fieldType: customFieldTypeEnum,
    title: string
}

export interface UpdateCollectionFormInput {
  name: string;
  description: string;
  topic: string;
  image: FileList;
  customFields: {[key: string]: UpdatedCustomField; };
}
