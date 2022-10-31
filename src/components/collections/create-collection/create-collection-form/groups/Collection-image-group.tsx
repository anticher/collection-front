import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function CollectionImageGroup() {
  const { t } = useTranslation();

  const { register } = useFormContext();

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-image")}</Form.Label>
      <Form.Control type="file" {...register("image")} />
    </Form.Group>
  );
}

export default CollectionImageGroup;
