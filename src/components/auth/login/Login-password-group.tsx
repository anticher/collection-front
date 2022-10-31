import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function LoginPasswordGroup() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("auth:password")}</Form.Label>
      <Form.Control
        type="password"
        placeholder={t("auth:enter-password")}
        {...register("password", {
          required: true,
        })}
      />
      {errors.password?.type === "required" && (
        <Form.Text>{t("auth:password-is-required")}</Form.Text>
      )}
    </Form.Group>
  );
}

export default LoginPasswordGroup;
