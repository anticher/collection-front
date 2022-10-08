import styles from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSendRegistrationCredentialsMutation } from "../../../app/api-slices/auth.api-slice";

interface RegistrationFormInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function Registration() {
  const navigate = useNavigate();
  const [sendCredentials, { isLoading }] =
    useSendRegistrationCredentialsMutation();
  const { register, handleSubmit } = useForm<RegistrationFormInput>();
  const onSubmit: SubmitHandler<RegistrationFormInput> = async (data) => {
    const canSend =
      [data.username, data.email, data.password, data.passwordConfirm].every(
        Boolean
      ) &&
      data.password === data.passwordConfirm &&
      !isLoading;
    if (canSend) {
      try {
        const { username, email, password } = data;
        const result = await sendCredentials({username, email, password}).unwrap();
        console.log(result);
        navigate('/login');
      } catch (err) {
        console.error("Failed to signUp: ", err);
      }
    }
  };

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
