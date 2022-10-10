import styles from "./Create-collection-form.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { CreateCollectionFormInput } from "../models/create-collection-form-input";
import { customFieldTypeEnum } from "../enum/custom-field-type.enum";

interface CreateCollectionCustomInputProps {
  register: UseFormRegister<CreateCollectionFormInput>;
  index: number;
  errors: FieldErrorsImpl<CreateCollectionFormInput>;
}

const customFieldTypeOptions = Object.keys(customFieldTypeEnum);

function CreateCollectionCustomInput(props: CreateCollectionCustomInputProps) {
  const createCustomInputOptions = () => {
    return customFieldTypeOptions.map((option) => {
      return (
        <option
          key={option}
          value={
            customFieldTypeEnum[option as keyof typeof customFieldTypeEnum]
          }
        >
          {customFieldTypeEnum[option as keyof typeof customFieldTypeEnum]}
        </option>
      );
    });
  };

  return (
    <InputGroup key={props.index} className="mb-3">
      <Form.Select
        aria-label="Default select example"
        {...props.register(`custom.${props.index}.fieldType`, {
          required: true,
        })}
      >
        <option value="">Field type</option>
        {createCustomInputOptions()}
      </Form.Select>
      <Form.Control
        aria-label="Text input with dropdown button"
        {...props.register(`custom.${props.index}.title`, {
          required: true,
        })}
      />
    </InputGroup>
  );
}

export default CreateCollectionCustomInput;
