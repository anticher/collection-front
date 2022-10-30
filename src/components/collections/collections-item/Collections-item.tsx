import { ICollection } from "../../../app/models/collection/collection.model";
import styles from "./Collections-item.module.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import CollectionsItemDescriptionModal from "./collections-item-description-modal/Collections-item-description-modal";
import { useState } from "react";
import { NoImageSwg } from "../../common/no-image/No-image-swg";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setCollectionUpdateModalVisibility, setUpdatedCollectionId } from "../../../app/collections/collections.slice";

type CollectionsItemProps = {
  data: ICollection;
};

function CollectionsItem({data}: CollectionsItemProps) {
  const [showDescription, setShowDescription] = useState(false);

  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  const isUserOwnerOrAdmin = data.ownerName === auth.username || auth.role === 'admin' || false;

  const dispatch = useAppDispatch();
  
  const onEditClickHandler = () => {
    dispatch(setUpdatedCollectionId(data.id))
    dispatch(setCollectionUpdateModalVisibility(true))
  };

  const onDescriptionClickHandler = (e: React.MouseEvent<EventTarget>) => {
    setShowDescription(true);
  };

  const onShowClickHandler = () => {
    console.log("card trigger");
    navigate(`${data.id}`);
  };

  return (
    <Card className={styles.collectionsItem}>
      <CollectionsItemDescriptionModal
        showDescription={showDescription}
        setShowDescription={setShowDescription}
        data={data}
      />

      {data.image ? (
        // <div className={styles.imageContainer}>
          <Card.Img
            className={styles.image}
            src={data.image}
            alt="collection-image"
          />
        // </div>
      ) : (
        <NoImageSwg color={"#8054A0"} />
      )}

      <Card.Body className={styles.body}>
        <Card.Title>{data.name || "no name"}</Card.Title>
        <Card.Text>{data.topic?.name || ""}</Card.Text>
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
          {isUserOwnerOrAdmin && <Button
            className={styles.button}
            variant={buttonVariant}
            onClick={onEditClickHandler}
          >
            Edit
          </Button>}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CollectionsItem;
