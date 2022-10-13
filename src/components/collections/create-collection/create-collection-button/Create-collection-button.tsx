import { Dispatch, SetStateAction } from "react";
import styles from "./Create-collection-button.module.css";
import Button from "react-bootstrap/Button";
import { buttonVariant } from "../../../../constants/bootstrap-constants";

type CreateCollectionButtonProps = {
  setCreateModalVisibility: Dispatch<SetStateAction<boolean>>
};

function CreateCollectionButton(props: CreateCollectionButtonProps) {
  const onClickHandler = () => {
    props.setCreateModalVisibility(true);
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
