import styles from "./Main-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function MainButton() {
    const navigate = useNavigate();
    
  return (
    <>
      <Button className={styles.button} variant="primary" type="button" onClick={() => navigate('/')}>
        To main
      </Button>
    </>
  );
}

export default MainButton;
