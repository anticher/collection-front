import styles from "./Registration.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSendRegistrationCredentialsMutation } from "../../../app/auth/auth.api-slice";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { buttonVariant } from "../../../constants/bootstrap-constants";

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
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [sendCredentials, { isLoading, error }] =
    useSendRegistrationCredentialsMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<RegistrationFormInput>();

  useEffect(() => {
    if (error) {
      "status" in error && error.status === 400
        ? enqueueSnackbar("User with the same name or email already exists", { variant: 'error' })
        : enqueueSnackbar("Server error", { variant: 'error' });
    }
  }, [enqueueSnackbar, error]);

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
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={styles.control}
            type="text"
            placeholder="Enter username"
            autoComplete="off"
            {...register("username", {
              required: formLimits.username.required,
              maxLength: formLimits.username.maxLength,
            })}
          />
          {errors.username?.type === "required" && (
            <Form.Text>Username is required</Form.Text>
          )}
          {errors.username?.type === "maxLength" && (
            <Form.Text>Maximum length is 30 characters</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={styles.control}
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            {...register("email", {
              required: formLimits.email.required,
              maxLength: formLimits.email.maxLength,
              pattern: formLimits.email.pattern,
            })}
          />
          {errors.email?.type === "required" && (
            <Form.Text>Email is required</Form.Text>
          )}
          {errors.email?.type === "maxLength" && (
            <Form.Text>Maximum length is 40 characters</Form.Text>
          )}
          {errors.email?.type === "pattern" && (
            <Form.Text>
              It should be with @ and domain name(example: myemail@mail.com)
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegistrationFromPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={styles.control}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: formLimits.password.required,
              maxLength: formLimits.password.maxLength,
              minLength: formLimits.password.minLength,
            })}
          />
          {errors.password?.type === "required" && (
            <Form.Text>Password required</Form.Text>
          )}
          {errors.password?.type === "minLength" && (
            <Form.Text>Minimum length is 8 characters</Form.Text>
          )}
          {errors.password?.type === "maxLength" && (
            <Form.Text>Maximum length is 200 characters</Form.Text>
          )}
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
            {...register("passwordConfirm", {
              required: formLimits.password.required,
              maxLength: formLimits.password.maxLength,
              minLength: formLimits.password.minLength,
              validate: (val: string) => watch('password') === val
            })}
          />
          {errors.passwordConfirm?.type === "required" && (
            <Form.Text>Password confirmation required</Form.Text>
          )}
          {errors.passwordConfirm?.type === "minLength" && (
            <Form.Text>Minimum length is 8 characters</Form.Text>
          )}
          {errors.passwordConfirm?.type === "maxLength" && (
            <Form.Text>Maximum length is 200 characters</Form.Text>
          )}
          {errors.passwordConfirm?.type === "validate" && (
            <Form.Text>Passwords should match</Form.Text>
          )}
        </Form.Group>
        <Button variant={buttonVariant} type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}

export default Registration;
