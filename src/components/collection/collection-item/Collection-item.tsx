import styles from "./Collection-item.module.css";
import Card from "react-bootstrap/Card";
import { NoImageSwg } from "../No-image-swg";
import { ICollectionItem } from "../../../models/ICollectionItem";
import { Badge } from "react-bootstrap";
import { ITag } from "../../../models/ITag";

type CollectionsItemProps = {
  item: ICollectionItem;
};

function CollectionItem({ item }: CollectionsItemProps) {
  return (
    <>
      <Card className={styles.collectionItem}>
        {item.image ? (
          <Card.Img className={styles.image} variant="top" src={item.image} />
        ) : (
          <NoImageSwg color={"#8054A0"} />
        )}
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          {item.tagNames.map((tagObject: ITag) => {
            return (
              <Badge key={tagObject.id} bg="warning" text="dark">
                {tagObject.name}
              </Badge>
            );
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default CollectionItem;
