import styles from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSendRegistrationCredentialsMutation } from "../../../app/auth/auth.api-slice";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import { useTranslation } from "react-i18next";

interface RegistrationFormInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const formLimits = {
  username: {
    required: true,
    maxLength: 30,
  },
  email: {
    required: true,
    maxLength: 40,
    pattern: /.+@.+\..+/i,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 200,
  },
};

function Registration() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [sendCredentials, { isLoading, error }] =
    useSendRegistrationCredentialsMutation();

  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<RegistrationFormInput>();

  useEffect(() => {
    if (error) {
      "status" in error && error.status === 400
        ? enqueueSnackbar(t("auth:user-with-the-same-name-or-email-already-exists"), { variant: 'error' })
        : enqueueSnackbar(t("common:server-error"), { variant: 'error' });
    }
  }, [enqueueSnackbar, error, t]);

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit: SubmitHandler<RegistrationFormInput> = async (data) => {
    const canSend =
      [data.username, data.email, data.password, data.passwordConfirm].every(
        Boolean
      ) &&
      data.password === data.passwordConfirm &&
      !isLoading;
    if (canSend) {
      const { username, email, password } = data;
      await sendCredentials({
        username,
        email,
        password,
      }).unwrap();
      navigate("/login");
    }
  };

  return (
    <>
      <Form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="RegistrationFromUsername">
          <Form.Label>{t("auth:username")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder={t("auth:enter-username")}
            autoComplete="off"
            {...register("username", {
              required: formLimits.username.required,
              maxLength: formLimits.username.maxLength,
            })}
          />
          {errors.username?.type === "required" && (
            <Form.Text>{t("auth:username-is-required")}</Form.Text>
          )}
          {errors.username?.type === "maxLength" && (
            <Form.Text>{t("auth:maximum-length-is")} 30 {t("auth:characters")}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromEmail">
          <Form.Label>{t("auth:email")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="email"
            placeholder={t("auth:enter-email")}
            autoComplete="off"
            {...register("email", {
              required: formLimits.email.required,
              maxLength: formLimits.email.maxLength,
              pattern: formLimits.email.pattern,
            })}
          />
          {errors.email?.type === "required" && (
            <Form.Text>{t("auth:email-is-required")}</Form.Text>
          )}
          {errors.email?.type === "maxLength" && (
            <Form.Text>{t("auth:maximum-length-is")} 40 {t("auth:characters")}</Form.Text>
          )}
          {errors.email?.type === "pattern" && (
            <Form.Text>
              {t("auth:it-should-be-with-@-and-domain-name")}({t("auth:example")}: myemail@mail.com)
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromPassword">
          <Form.Label>{t("auth:password")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder={t("auth:enter-password")}
            {...register("password", {
              required: formLimits.password.required,
              maxLength: formLimits.password.maxLength,
              minLength: formLimits.password.minLength,
            })}
          />
          {errors.password?.type === "required" && (
            <Form.Text>{t("auth:password-is-required")}</Form.Text>
          )}
          {errors.password?.type === "minLength" && (
            <Form.Text>{t("auth:minimum-length-is")} 8 {t("auth:characters")}</Form.Text>
          )}
          {errors.password?.type === "maxLength" && (
            <Form.Text>{t("auth:maximum-length-is")} 200 {t("auth:characters")}</Form.Text>
          )}
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="RegistrationFromPasswordConfirm"
        >
          <Form.Label>{t("auth:confirm-password")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder={t("auth:enter-password")}
            {...register("passwordConfirm", {
              required: formLimits.password.required,
              maxLength: formLimits.password.maxLength,
              minLength: formLimits.password.minLength,
              validate: (val: string) => watch('password') === val
            })}
          />
          {errors.passwordConfirm?.type === "required" && (
            <Form.Text>{t("auth:password-confirmation-is-required")}</Form.Text>
          )}
          {errors.passwordConfirm?.type === "minLength" && (
            <Form.Text>{t("auth:minimum-length-is")} 8 {t("auth:characters")}</Form.Text>
          )}
          {errors.passwordConfirm?.type === "maxLength" && (
            <Form.Text>{t("auth:maximum-length-is")} 200 {t("auth:characters")}</Form.Text>
          )}
          {errors.passwordConfirm?.type === "validate" && (
            <Form.Text>{t("auth:passwords-should-match")}</Form.Text>
          )}
        </Form.Group>
        <Button variant={buttonVariant} type="submit">
        {t("auth:register")}
        </Button>
      </Form>
    </>
  );
}

export default Registration;
