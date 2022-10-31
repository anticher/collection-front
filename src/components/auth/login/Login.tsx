import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSendLoginCredentialsMutation } from "../../../app/auth/auth.api-slice";
import { useAppDispatch } from "../../../app/app-hooks";
import { setAuthData } from "../../../app/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../utils/useErrorSnack";
import LoginNameGroup from "./Login-name-group";
import LoginPasswordGroup from "./Login-password-group";

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

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const canSend = [data.username, data.password].every(Boolean) && !isLoading;
    if (canSend) {
      const result = await sendCredentials(data).unwrap();
      dispatch(setAuthData(result));
      navigate(`/collections/${result.username}`);
    }
  };

  const methods = useForm<LoginFormInput>({});

  useErrorSnack(
    Boolean(error),
    error && "status" in error && error.status === 400
      ? t("auth:wrong-username-or-password")
      : t("common:server-error")
  );

  return (
    <FormProvider {...methods}>
      <Form className={styles.login} onSubmit={methods.handleSubmit(onSubmit)}>
        <LoginNameGroup />
        <LoginPasswordGroup />
        <Button variant={buttonVariant} type="submit">
          {t("auth:login")}
        </Button>
      </Form>
    </FormProvider>
  );
}

export default Login;
