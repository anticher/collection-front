import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";

function RegistrationButton() {
  return (
    <>
      <Button className={styles.button} variant="primary">
        SignUp
      </Button>
    </>
  );
}

export default RegistrationButton;
