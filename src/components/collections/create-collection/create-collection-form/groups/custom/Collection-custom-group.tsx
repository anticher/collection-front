import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { customFieldTypeEnum } from "../../../../../../app/enum/custom-field-type.enum";

interface CollectionCustomGroupProps {
  index: number;
}

const customFieldTypeOptions = Object.keys(customFieldTypeEnum);

function CollectionCustomGroup(props: CollectionCustomGroupProps) {
  const { t } = useTranslation();

  const { register } = useFormContext();

  const createCustomInputOptions = () => {
    return customFieldTypeOptions.map((option) => {
      return (
        <option
          key={option}
          value={
            customFieldTypeEnum[option as keyof typeof customFieldTypeEnum]
          }
        >
          {t(`collections:${option}`)}
        </option>
      );
    });
  };

  return (
    <InputGroup key={props.index} className="mb-3">
      <Form.Select
        {...register(`customFields.${props.index}.fieldType`, {
          required: true,
        })}
      >
        <option value="">{t("collections:field-type")}</option>
        {createCustomInputOptions()}
      </Form.Select>
      <Form.Control
        {...register(`customFields.${props.index}.title`, {
          required: true,
        })}
      />
    </InputGroup>
  );
}

export default CollectionCustomGroup;
