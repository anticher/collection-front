import styles from "./Route-button.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { buttonVariant } from "../../../constants/bootstrap-constants";

type RouteButtonProps = {
  route: string;
  text: string;
};

function RouteButton(props: RouteButtonProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        className={styles.button}
        variant={buttonVariant}
        type="button"
        onClick={() => navigate(props.route)}
      >
        {props.text}
      </Button>
    </>
  );
}

export default RouteButton;
