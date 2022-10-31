import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function CollectionDescriptionGroup() {
  const { t } = useTranslation();

  const { register } = useFormContext();

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-description")}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        type="text"
        placeholder={t("collections:enter-collection-description")}
        {...register("description", {
          required: true,
        })}
      />
    </Form.Group>
  );
}

export default CollectionDescriptionGroup;
