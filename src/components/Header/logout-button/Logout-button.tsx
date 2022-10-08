import styles from "./Logout-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { initialState, setAuthData } from "../../../app/auth.slice";
import { useTranslation } from "react-i18next";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onClickHandler = () => {
    dispatch(setAuthData(initialState));
    navigate('/');
  }

  return (
    <>
      <Button
        className={styles.button}
        variant="primary"
        onClick={onClickHandler}
      >
        {t("header:logOut")}
      </Button>
    </>
  );
}

export default LogoutButton;
