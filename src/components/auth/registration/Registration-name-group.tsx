import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { registrationFormLimits } from "./form-limits";

function RegistrationNameGroup() {
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
          required: registrationFormLimits.username.required,
          maxLength: registrationFormLimits.username.maxLength,
        })}
      />
      {errors.username?.type === "required" && (
        <Form.Text>{t("auth:username-is-required")}</Form.Text>
      )}
      {errors.username?.type === "maxLength" && (
        <Form.Text>
          {t("auth:maximum-length-is")} 30 {t("auth:characters")}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default RegistrationNameGroup;
