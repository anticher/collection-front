import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function LoginNameGroup() {
  const { t } = useTranslation();

  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext();

   useEffect(() => {
    setFocus("username");
  }, [setFocus]);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("auth:username")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={t("auth:enter-username")}
        autoComplete="off"
        {...register("username", {
          required: true,
        })}
      />
      {errors.username?.type === "required" && (
        <Form.Text>{t("auth:username-is-required")}</Form.Text>
      )}
    </Form.Group>
  );
}

export default LoginNameGroup;
