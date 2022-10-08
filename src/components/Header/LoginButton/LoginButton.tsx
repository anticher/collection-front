import styles from "./LoginButton.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  const onClickHandler = () => navigate('/login');

  return (
    <>
      <Button
        className={styles.button}
        variant="primary"
        onClick={onClickHandler}
      >
        SignIn
      </Button>
    </>
  );
}

export default LoginButton;
