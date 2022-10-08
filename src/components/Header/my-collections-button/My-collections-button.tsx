import styles from "./My-collections-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";

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
        variant="primary"
        onClick={onClickHandler}
      >
        {t("header:myCollections")}
      </Button>
    </>
  );
}

export default MyCollectionsButton;
