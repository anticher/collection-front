import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {useSendLoginCredentialsMutation } from "../../../app/api-slices/auth.api-slice"
import { useAppDispatch } from "../../../app/hooks";
import { setAuthData } from "../../../app/auth.slice";
import { useNavigate } from "react-router-dom";

interface LoginFormInput {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [sendCredentials, { isLoading }] = useSendLoginCredentialsMutation()
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const canSend = [data.username, data.password].every(Boolean) && !isLoading
    if (canSend) {
      try {
        const result = await sendCredentials(data).unwrap()
        dispatch(setAuthData(result));
        navigate(`/collections/${result.username}`)
      } catch (err) {
        console.error('Failed to login: ', err)
      }
    }
  };

  return (
    <>
      <Form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="loginFromUsername">
          <Form.Label>{t("login:username")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder={t("login:enter-username")}
            {...register("username")}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginFromPassword">
          <Form.Label>{t("login:password")}</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder={t("login:enter-password")}
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("login:login")}
        </Button>
      </Form>
    </>
  );
}

export default Login;
