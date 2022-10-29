import styles from "./Create-custom-inputs.module.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { UseFormRegister } from "react-hook-form";
import { ICustomFieldTitle } from "../../../../../app/models/collection-custom-field/custom-field-titile.model";
import { customFieldTypeEnum } from "../../../../../app/enum/custom-field-type.enum";
import { CreateCollectionItemFormInput } from "../../../../collections/create-collection/models/create-collection-item-form-input";

type createCustomInputsProps = {
  customFieldsTitles: ICustomFieldTitle[];
  register: UseFormRegister<CreateCollectionItemFormInput>;
};

export const createCustomInputs = ({
  customFieldsTitles,
  register,
}: createCustomInputsProps) => {
  if (!customFieldsTitles || customFieldsTitles.length === 0) {
    return null;
  }
  return (
    <>
      <Form.Label className="mb-2">Custom fields</Form.Label>
      {[...customFieldsTitles]
        .sort((a, b) => a.fieldIndex - b.fieldIndex)
        .map(({ id, fieldName, fieldType }) => {
          switch (fieldType) {
            case customFieldTypeEnum.integer:
              return (
                <InputGroup key={id} className="mb-3">
                  <Form.Control disabled value={fieldName} />
                  <Form.Control
                    type="number"
                    autoComplete="off"
                    {...register(`customFields.${id}`, {})}
                  />
                </InputGroup>
              );
            case customFieldTypeEnum.checkbox:
              return (
                <InputGroup key={id} className="mb-3">
                  <Form.Control defaultValue={fieldName} disabled />
                  <div className={styles.checkWrapper}>
                    <Form.Check
                      type="checkbox"
                      {...register(`customFields.${id}`, {})}
                    />
                  </div>
                </InputGroup>
              );
            case customFieldTypeEnum.date:
              return (
                <InputGroup key={id} className="mb-3">
                  <Form.Control disabled value={fieldName} />
                  <Form.Control
                    type="date"
                    autoComplete="off"
                    {...register(`customFields.${id}`, {})}
                  />
                </InputGroup>
              );
            case customFieldTypeEnum.textarea:
              return (
                <InputGroup key={id} className="mb-3">
                  <Form.Control disabled value={fieldName} />
                  <Form.Control
                    as="textarea"
                    rows={1}
                    autoComplete="off"
                    {...register(`customFields.${id}`, {})}
                  />
                </InputGroup>
              );
            default:
              return (
                <InputGroup key={id} className="mb-3">
                  <Form.Control disabled value={fieldName} />
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    {...register(`customFields.${id}`, {})}
                  />
                </InputGroup>
              );
          }
        })}
    </>
  );
};
