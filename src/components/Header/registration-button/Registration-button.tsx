import styles from "./Registration-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function RegistrationButton() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const onClickHandler = () => {
    navigate('/registration');
  }
  return (
    <>
      <Button className={styles.button} variant={buttonVariant} onClick={onClickHandler}>
      {t("header:signUp")}
      </Button>
    </>
  );
}

export default RegistrationButton;
