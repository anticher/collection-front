import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInput {
  username: String;
  password: String;
}

function Login() {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => console.log(data);

  return (
    <>
      <Form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="loginFromUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginFromPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
