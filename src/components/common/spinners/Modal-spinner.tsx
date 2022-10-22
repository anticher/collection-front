import styles from "./Modal-spinner.module.css";
import { Spinner } from "react-bootstrap";
import { spinnerVariant } from "../../../constants/bootstrap-constants";

function ModalSpinner() {
  return (
    <Spinner
      className={styles.spinner}
      variant={spinnerVariant}
      animation="border"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default ModalSpinner;
