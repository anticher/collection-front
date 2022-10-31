import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function ItemNameGroup() {
  const { t } = useTranslation();

  const { register, setFocus } = useFormContext();

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:item-name")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={t("collections:enter-item-name")}
        autoComplete="off"
        {...register("name", {
          required: true,
        })}
      />
    </Form.Group>
  );
}

export default ItemNameGroup;
