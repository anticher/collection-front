import { ICollection } from "../../../models/ICollection";
import styles from "./Collections-item.module.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import CollectionsItemDescriptionModal from "./collections-item-description-modal/Collections-item-description-modal";
import { useState } from "react";

type CollectionsItemProps = {
  data: ICollection;
};

function CollectionsItem(props: CollectionsItemProps) {
  const [showDescription, setShowDescription] = useState(false);

  const navigate = useNavigate();
  const { data } = props;

  const onEditClickHandler = (e: React.MouseEvent<EventTarget>) => {
    console.log("edit");
  };

  const onDescriptionClickHandler = (e: React.MouseEvent<EventTarget>) => {
    setShowDescription(true);
  };

  const onShowClickHandler = () => {
    console.log("card trigger");
    navigate(`${data.ownerName}/${data.id}`);
  };

  return (
    <Card className={styles.collectionsItem}>
      <CollectionsItemDescriptionModal
        showDescription={showDescription}
        setShowDescription={setShowDescription}
        data={data}
      />
      <Card.Img className={styles.background} />
      <Card.Body className={styles.body}>
        <Card.Title>{data.name || "no name"}</Card.Title>
        <Card.Text>{data.theme?.name || "empty theme"}</Card.Text>
        {/* <Card.Text>{data.description || "no description"}</Card.Text> */}
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            variant={buttonVariant}
            onClick={onShowClickHandler}
          >
            Show
          </Button>
          <Button
            className={styles.button}
            variant={buttonVariant}
            onClick={onDescriptionClickHandler}
          >
            Description
          </Button>
          <Button
            className={styles.button}
            variant={buttonVariant}
            onClick={onEditClickHandler}
          >
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CollectionsItem;
