import styles from "./Search-input.module.css";
import Form from "react-bootstrap/Form";

function SearchInput() {
  return (
    <>
      <Form.Control className={styles.input} placeholder="Search" aria-label="Search" />
    </>
  );
}

export default SearchInput;
