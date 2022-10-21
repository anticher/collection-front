import styles from "./Create-collection-button.module.css";
import Button from "react-bootstrap/Button";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useAppDispatch } from "../../../../app/app-hooks";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";

function CreateCollectionButton() {
  const dispatch = useAppDispatch();
  
  const onClickHandler = () => {
    dispatch(setCollectionModalVisibility(true))
  };

  return (
    <>
      <Button
        className={styles.button}
        variant={buttonVariant}
        onClick={onClickHandler}
      >
        Create collection
      </Button>
    </>
  );
}

export default CreateCollectionButton;
