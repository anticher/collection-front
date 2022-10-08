import styles from "./Login-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginButton() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const onClickHandler = () => navigate('/login');
  return (
    <>
      <Button
        className={styles.button}
        variant="primary"
        onClick={onClickHandler}
      >
        {t("header:signIn")}
      </Button>
    </>
  );
}

export default LoginButton;
