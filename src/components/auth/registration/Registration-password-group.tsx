import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { registrationFormLimits } from "./form-limits";

function RegistrationPasswordGroup() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className="mb-3" controlId="RegistrationFromPassword">
      <Form.Label>{t("auth:password")}</Form.Label>
      <Form.Control
        type="password"
        placeholder={t("auth:enter-password")}
        {...register("password", {
          required: registrationFormLimits.password.required,
          maxLength: registrationFormLimits.password.maxLength,
          minLength: registrationFormLimits.password.minLength,
        })}
      />
      {errors.password?.type === "required" && (
        <Form.Text>{t("auth:password-is-required")}</Form.Text>
      )}
      {errors.password?.type === "minLength" && (
        <Form.Text>
          {t("auth:minimum-length-is")} 8 {t("auth:characters")}
        </Form.Text>
      )}
      {errors.password?.type === "maxLength" && (
        <Form.Text>
          {t("auth:maximum-length-is")} 200 {t("auth:characters")}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default RegistrationPasswordGroup;
