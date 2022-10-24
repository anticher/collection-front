import { Card, Container, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetCollectionItemByIdQuery } from "../../app/collection-items/collection-items.api-slice";
import RouteButton from "../common/route-button/Route-button";
import styles from "./Collection-item-page.module.css";
import CommentsSection from "./comments-section/Comments-section";
import LikesBlock from "./likes-block/Likes-block";

function CollectionItemPage() {
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const {
    data: collectionItem,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCollectionItemByIdQuery(collectionItemId);
  // console.log(CollectionItem)
  if (!collectionItem) return null;
  return (
    <Container>
      <Card>
        <Card.Img  className={styles.image} variant="top" src={collectionItem.image || undefined} />
        <Card.Body>
          <Card.Title>{collectionItem.name}</Card.Title>
          <Card.Text>
            {collectionItem.tagNames.map((tagName) => tagName.name).join(" ")}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {collectionItem.customFieldValues.map((customFieldValue) => {
            return (
              <ListGroup.Item key={customFieldValue.id}>
                {customFieldValue.customFieldTitle.fieldName +
                  ": " +
                  customFieldValue.fieldValue}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Card.Body>
          <RouteButton text="Back" route={`/collections/${collectionItem?.ownerName}/${collectionItem?.collectionId}`} />
          <LikesBlock />
        </Card.Body>
        <Card.Body>
          <CommentsSection />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CollectionItemPage;
