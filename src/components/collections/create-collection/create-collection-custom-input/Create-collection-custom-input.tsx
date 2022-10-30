import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { CreateCollectionFormInput } from "../models/create-collection-form-input";
import { customFieldTypeEnum } from "../../../../app/enum/custom-field-type.enum";
import { useTranslation } from "react-i18next";

interface CreateCollectionCustomInputProps {
  register: UseFormRegister<CreateCollectionFormInput>;
  index: number;
  errors: FieldErrorsImpl<CreateCollectionFormInput>;
}

const customFieldTypeOptions = Object.keys(customFieldTypeEnum);

function CreateCollectionCustomInput(props: CreateCollectionCustomInputProps) {
  const { t } = useTranslation();
  const createCustomInputOptions = () => {
    return customFieldTypeOptions.map((option) => {
      return (
        <option
          key={option}
          value={
            customFieldTypeEnum[option as keyof typeof customFieldTypeEnum]
          }
        >
          {/* {customFieldTypeEnum[option as keyof typeof customFieldTypeEnum]} */}
          {t(`collections:${option}`)}
        </option>
      );
    });
  };

  return (
    <InputGroup key={props.index} className="mb-3">
      <Form.Select
        {...props.register(`customFields.${props.index}.fieldType`, {
          required: true,
        })}
      >
        <option value="">{t("collections:field-type")}</option>
        {createCustomInputOptions()}
      </Form.Select>
      <Form.Control
        {...props.register(`customFields.${props.index}.title`, {
          required: true,
        })}
      />
    </InputGroup>
  );
}

export default CreateCollectionCustomInput;
