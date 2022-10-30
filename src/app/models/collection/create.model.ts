import { customFieldTypeEnum } from "../../enum/custom-field-type.enum";

export interface ICollectionCreate {
  name: string;
  description: string;
  topic: string;
  ownerName: string;
  username: string;
  customFields: { fieldType: customFieldTypeEnum; title: string }[];
}
