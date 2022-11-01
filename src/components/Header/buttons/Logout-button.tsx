import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/app-hooks";
import { useTranslation } from "react-i18next";
import { useSendLogoutMutation } from "../../../app/auth/auth.api-slice";
import { initialState, setAuthData } from "../../../app/auth/auth.slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [sendLogout, { isLoading }] = useSendLogoutMutation();

  const onClickHandler = async () => {
    await sendLogout();
    dispatch(setAuthData(initialState));
    navigate("/");
  };

  return (
    <Button
      variant={buttonVariant}
      onClick={onClickHandler}
      disabled={isLoading}
    >
      {t("header:logOut")}
    </Button>
  );
}

export default LogoutButton;
