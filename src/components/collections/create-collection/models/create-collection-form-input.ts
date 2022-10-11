import { customFieldTypeEnum } from "../enum/custom-field-type.enum";

export interface CreateCollectionFormInput {
  name: string;
  description: string;
  theme: string;
  image: string;
  customFields: { fieldType: customFieldTypeEnum; title: string }[];
}
