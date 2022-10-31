import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { registrationFormLimits } from "./form-limits";

function RegistrationEmailGroup() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3" controlId="RegistrationFromEmail">
      <Form.Label>{t("auth:email")}</Form.Label>
      <Form.Control
        type="email"
        placeholder={t("auth:enter-email")}
        autoComplete="off"
        {...register("email", {
          required: registrationFormLimits.email.required,
          maxLength: registrationFormLimits.email.maxLength,
          pattern: registrationFormLimits.email.pattern,
        })}
      />
      {errors.email?.type === "required" && (
        <Form.Text>{t("auth:email-is-required")}</Form.Text>
      )}
      {errors.email?.type === "maxLength" && (
        <Form.Text>
          {t("auth:maximum-length-is")} 40 {t("auth:characters")}
        </Form.Text>
      )}
      {errors.email?.type === "pattern" && (
        <Form.Text>
          {t("auth:it-should-be-with-@-and-domain-name")}({t("auth:example")}:
          myemail@mail.com)
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default RegistrationEmailGroup;
