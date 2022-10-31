import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { registrationFormLimits } from "./form-limits";

function RegistrationPasswordConfirmGroup() {
  const { t } = useTranslation();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3" controlId="RegistrationFromPasswordConfirm">
      <Form.Label>{t("auth:confirm-password")}</Form.Label>
      <Form.Control
        type="password"
        placeholder={t("auth:enter-password")}
        {...register("passwordConfirm", {
          required: registrationFormLimits.password.required,
          maxLength: registrationFormLimits.password.maxLength,
          minLength: registrationFormLimits.password.minLength,
          validate: (val: string) => watch("password") === val,
        })}
      />
      {errors.passwordConfirm?.type === "required" && (
        <Form.Text>{t("auth:password-confirmation-is-required")}</Form.Text>
      )}
      {errors.passwordConfirm?.type === "minLength" && (
        <Form.Text>
          {t("auth:minimum-length-is")} 8 {t("auth:characters")}
        </Form.Text>
      )}
      {errors.passwordConfirm?.type === "maxLength" && (
        <Form.Text>
          {t("auth:maximum-length-is")} 200 {t("auth:characters")}
        </Form.Text>
      )}
      {errors.passwordConfirm?.type === "validate" && (
        <Form.Text>{t("auth:passwords-should-match")}</Form.Text>
      )}
    </Form.Group>
  );
}

export default RegistrationPasswordConfirmGroup;
