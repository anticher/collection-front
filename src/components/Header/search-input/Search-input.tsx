import styles from "./Search-input.module.css";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

function SearchInput() {
  const { t } = useTranslation();

  return (
    <>
      <Form.Control className={styles.input} placeholder={t("header:search")} aria-label="Search" />
    </>
  );
}

export default SearchInput;
