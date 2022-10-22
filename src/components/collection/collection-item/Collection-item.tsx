import styles from "./Collection-item.module.css";
import Card from "react-bootstrap/Card";
import { NoImageSwg } from "../No-image-swg";
import { ICollectionItem } from "../../../models/ICollectionItem";
import { Badge, Button } from "react-bootstrap";
import RouteButton from "../../common/route-button/Route-button";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setCollectionItemUpdateModalVisibility, setUpdatedCollectionItemId } from "../../../app/collection-items/collection-items.slice";

type CollectionsItemProps = {
  item: ICollectionItem;
};

function CollectionItem({ item }: CollectionsItemProps) {
  const auth = useAppSelector((state) => state.auth);

  const isUserOwnerOrAdmin =
    item.ownerName === auth.username || auth.role === "admin" || false;

  const dispatch = useAppDispatch();

  const onEditClickHandler = () => {
    dispatch(setUpdatedCollectionItemId(item.id));
    dispatch(setCollectionItemUpdateModalVisibility(true));
  };

  return (
    <Card className={styles.collectionItem}>
      {item.image ? (
        <Card.Img className={styles.image} variant="top" src={item.image} />
      ) : (
        <NoImageSwg color={"#8054A0"} />
      )}
      <Card.Body className={styles.cardBody}>
        <Card.Title>{item.name}</Card.Title>
        <div className={styles.badges}>
          {item.tagNames.map((tagObject) => {
            return (
              <Badge key={tagObject.id} bg="warning" text="dark">
                {tagObject.name}
              </Badge>
            );
          })}
        </div>
        <div className={styles.buttons}>
          <RouteButton
            text="View"
            route={`/collections/${item.ownerName}/${item.collectionId}/${item.id}`}
          />
          {isUserOwnerOrAdmin && (
            <Button onClick={onEditClickHandler}>Edit</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CollectionItem;
