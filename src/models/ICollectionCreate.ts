import { customFieldTypeEnum } from "../components/collections/create-collection/enum/custom-field-type.enum";

export interface ICollectionCreate {
  name: string;
  description: string;
  theme: string;
  ownerName: string;
  creatorName: string;
  custom: { fieldType: customFieldTypeEnum; title: string }[];
}
