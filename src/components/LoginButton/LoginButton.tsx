import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";

function LoginButton() {
  return (
    <>
      <Button className={styles.button} variant="primary">
        SignIn
      </Button>
    </>
  );
}

export default LoginButton;
