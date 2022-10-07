import styles from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegistrationFormInput {
  username: String;
  email: String;
  password: String;
  passwordConfirm: String;
}

function Registration() {
  const { register, handleSubmit } = useForm<RegistrationFormInput>();
  const onSubmit: SubmitHandler<RegistrationFormInput> = (data) =>
    console.log(data);

  return (
    <>
      <Form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="RegistrationFromUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={styles.control}
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="RegistrationFromPasswordConfirm"
        >
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder="Password"
            {...register("passwordConfirm")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}

export default Registration;
