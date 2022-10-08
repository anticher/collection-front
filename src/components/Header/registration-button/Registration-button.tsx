import styles from "./Registration-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function RegistrationButton() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/registration');
  }

  return (
    <>
      <Button className={styles.button} variant="primary" onClick={onClickHandler}>
        SignUp
      </Button>
    </>
  );
}

export default RegistrationButton;
