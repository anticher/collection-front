import { customFieldTypeEnum } from "../../../../app/enum/custom-field-type.enum";

export interface CreateCollectionFormInput {
  name: string;
  description: string;
  topic: string;
  image: FileList;
  customFields: { fieldType: customFieldTypeEnum; title: string }[];
}
