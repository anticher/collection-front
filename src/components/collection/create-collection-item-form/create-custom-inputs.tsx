import Form from "react-bootstrap/Form";
import { UseFormRegister } from "react-hook-form";
import { ICustomFieldTitle } from "../../../models/ICustomFieldTitle";
import { customFieldTypeEnum } from "../../collections/create-collection/enum/custom-field-type.enum";
import { CreateCollectionItemFormInput } from "../../collections/create-collection/models/create-collection-item-form-input";

type createCustomInputsProps = {
    customFieldsTitles: ICustomFieldTitle[];
    register: UseFormRegister<CreateCollectionItemFormInput>
}

export const createCustomInputs = ({customFieldsTitles , register}: createCustomInputsProps) => {
  if (!customFieldsTitles || customFieldsTitles.length === 0) {
    return null;
  }
  return customFieldsTitles.map(({ id, fieldName, fieldType }, index) => {
    return (
      <Form.Group className="mb-3" key={id}>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control
          type={fieldType === customFieldTypeEnum.string ? "text" : "number"}
          placeholder="Enter collection description"
          autoComplete="off"
          {...register(`customFields.${id}`, {
            required: true,
          })}
        />
      </Form.Group>
    );
  });
};
