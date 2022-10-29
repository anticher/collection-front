import { customFieldTypeEnum } from "../../../components/collections/create-collection/enum/custom-field-type.enum";

export interface ICustomFieldTitle {
    id: string;
    fieldName: string;
    collectionId: string;
    fieldType: customFieldTypeEnum;
    creatorName: string;
    createDate: string;
    fieldIndex: number;
}
