import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function CollectionNameGroup() {
  const { t } = useTranslation();

  const { register, setFocus } = useFormContext();

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-name")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={t("collections:enter-collection-name")}
        {...register("name", {
          required: true,
        })}
      />
    </Form.Group>
  );
}

export default CollectionNameGroup;
