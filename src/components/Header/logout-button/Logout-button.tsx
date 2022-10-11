import styles from "./Logout-button.module.css";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import { useSendLogoutMutation } from "../../../app/api-slices/auth.api-slice";
import { setLocalStorageAuthDefault } from "../../../app/local-storage/auth-storage";
import { initialState, setAuthData } from "../../../app/auth.slice";


function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [sendLogout, { isLoading }] = useSendLogoutMutation();


  const onClickHandler = async () => {
    await sendLogout();
    setLocalStorageAuthDefault();
    dispatch(setAuthData(initialState));
    navigate("/");
  };

  return (
      <Button
        className={styles.button}
        variant="primary"
        onClick={onClickHandler}
      >
        {isLoading ? <Spinner animation="border" variant="dark" /> : t("header:logOut")}
      </Button>
  );
}

export default LogoutButton;
