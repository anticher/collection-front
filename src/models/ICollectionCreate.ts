import { customFieldTypeEnum } from "../components/collections/create-collection/enum/custom-field-type.enum";

export interface ICollectionCreate {
  name: string;
  description: string;
  theme: string;
  ownerName: string;
  creatorName: string;
  customFields: { fieldType: customFieldTypeEnum; title: string }[];
}
