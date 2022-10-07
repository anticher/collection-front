import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from 'react-i18next';

interface LoginFormInput {
  username: String;
  password: String;
}

function Login() {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => console.log(data);

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
