import styles from "./LogoutButton.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { initialState, setAuthData } from "../../../app/authSlice";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        LogOut
      </Button>
    </>
  );
}

export default LogoutButton;
