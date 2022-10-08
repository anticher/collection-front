import styles from "./Create-collection-button.module.css";
import Button from "react-bootstrap/Button";


function CreateCollectionButton() {

  const onClickHandler = () => {
    console.log('create collection')
  }

  return (
    <>
      <Button
        className={styles.button}
        variant="primary"
        onClick={onClickHandler}
      >
        Create collection
      </Button>
    </>
  );
}

export default CreateCollectionButton;
