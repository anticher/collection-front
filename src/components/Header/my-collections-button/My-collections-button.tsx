import styles from "./My-collections-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function MyCollectionsButton() {
  const username = useAppSelector((state) => state.auth.username);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const onClickHandler = () => {
    navigate(`/collections/${username}`);
  }
  return (
    <>
      <Button
        className={styles.button}
        variant={buttonVariant}
        onClick={onClickHandler}
      >
        {t("header:home")}
      </Button>
    </>
  );
}

export default MyCollectionsButton;
