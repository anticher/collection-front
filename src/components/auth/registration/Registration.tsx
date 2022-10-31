import styles from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSendRegistrationCredentialsMutation } from "../../../app/auth/auth.api-slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import { useTranslation } from "react-i18next";
import { useErrorSnack } from "../../../utils/useErrorSnack";
import RegistrationNameGroup from "./Registration-name-group";
import RegistrationEmailGroup from "./Registration-email-group";
import RegistrationPasswordGroup from "./Registration-password-group";
import RegistrationPasswordConfirmGroup from "./Registration-password-confirm-group";

interface RegistrationFormInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function Registration() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [sendCredentials, { isLoading, error }] =
    useSendRegistrationCredentialsMutation();

  const methods = useForm<RegistrationFormInput>();

  useErrorSnack(
    Boolean(error),
    error && "status" in error && error.status === 400
      ? t("auth:user-with-the-same-name-or-email-already-exists")
      : t("common:server-error")
  );

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
    <FormProvider {...methods}>
      <Form
        className={styles.registration}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <RegistrationNameGroup />
        <RegistrationEmailGroup />
        <RegistrationPasswordGroup />
        <RegistrationPasswordConfirmGroup />
        <Button variant={buttonVariant} type="submit">
          {t("auth:register")}
        </Button>
      </Form>
    </FormProvider>
  );
}

export default Registration;
