import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { ICustomFieldTitle } from "../../../../../../app/models/collection-custom-field/custom-field-titile.model";
import { customFieldTypeEnum } from "../../../../../../app/enum/custom-field-type.enum";
import CustomIntegerGroup from "./Custom-integer-group";
import CustomCheckGroup from "./Custom-check-group";
import CustomDateGroup from "./Custom-date-group";
import CustomTextGroup from "./Custom-text-group";
import CustomStringGroup from "./Custom-string-group";

type CustomGroupsProps = {
  customFieldsTitles: ICustomFieldTitle[];
};

function CustomGroups({ customFieldsTitles }: CustomGroupsProps) {
  const { t } = useTranslation();

  if (!customFieldsTitles || customFieldsTitles.length === 0) {
    return null;
  }

  const sortedCustomFields = [...customFieldsTitles].sort(
    (a, b) => a.fieldIndex - b.fieldIndex
  );
  return (
    <>
      <Form.Label className="mb-2">{t("collections:custom-inputs")}</Form.Label>
      {sortedCustomFields.map(({ id, fieldName, fieldType }) => {
        switch (fieldType) {
          case customFieldTypeEnum.integer:
            return (
              <CustomIntegerGroup key={id} id={id} fieldName={fieldName} />
            );
          case customFieldTypeEnum.checkbox:
            return <CustomCheckGroup key={id} id={id} fieldName={fieldName} />;
          case customFieldTypeEnum.date:
            return <CustomDateGroup key={id} id={id} fieldName={fieldName} />;
          case customFieldTypeEnum.textarea:
            return <CustomTextGroup key={id} id={id} fieldName={fieldName} />;
          default:
            return <CustomStringGroup key={id} id={id} fieldName={fieldName} />;
        }
      })}
    </>
  );
}

export default CustomGroups;
