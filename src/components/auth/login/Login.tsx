import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSendLoginCredentialsMutation } from "../../../app/auth/auth.api-slice";
import { useAppDispatch } from "../../../app/app-hooks";
import { setAuthData } from "../../../app/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { buttonVariant } from "../../../constants/bootstrap-constants";

interface LoginFormInput {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [sendCredentials, { isLoading, error }] =
    useSendLoginCredentialsMutation();

  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const canSend = [data.username, data.password].every(Boolean) && !isLoading;
    if (canSend) {
      const result = await sendCredentials(data).unwrap();
      dispatch(setAuthData(result));
      navigate(`/collections/${result.username}`);
    }
  };

  useEffect(() => {
    if (error) {
      "status" in error && error.status === 400
        ? enqueueSnackbar("Wrong username or password", { variant: 'error' })
        : enqueueSnackbar("Server error", { variant: 'error' });
    }
  }, [enqueueSnackbar, error]);

  return (
    <>
      <Form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="loginFromUsername">
          <Form.Label>{t("login:username")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder={t("login:enter-username")}
            autoComplete="off"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username?.type === "required" && (
            <Form.Text>Username required</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginFromPassword">
          <Form.Label>{t("login:password")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder={t("login:enter-password")}
            {...register("password", {
              required: true,
            })}
          />
          {errors.password?.type === "required" && (
            <Form.Text>Password required</Form.Text>
          )}
        </Form.Group>

        <Button variant={buttonVariant} type="submit">
          {t("login:login")}
        </Button>
      </Form>
    </>
  );
}

export default Login;
