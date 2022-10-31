import { Badge, Card, Container, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useGetCollectionItemByIdQuery } from "../../app/collection-items/collection-items.api-slice";
import { badgeVariant } from "../../constants/bootstrap-constants";
import RouteButton from "../common/route-button/Route-button";
import styles from "./Collection-item-page.module.css";
import CommentsSection from "./comments-section/Comments-section";
import LikesBlock from "./likes-block/Likes-block";

function CollectionItemPage() {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const { data: collectionItem } =
    useGetCollectionItemByIdQuery(collectionItemId);
  if (!collectionItem) return null;
  const customFieldValues = [...collectionItem.customFieldValues];
  return (
    <Container>
      <Card>
        <Card.Img
          className={styles.image}
          variant="top"
          src={collectionItem.image || undefined}
        />
        <Card.Body>
          <Card.Title>{collectionItem.name}</Card.Title>
          <Card.Text className={styles.tags}>
            {collectionItem.tagNames
              .map((tagName) => tagName.name)
              .map((tag) => (
                <Badge bg={badgeVariant}>{tag}</Badge>
              ))}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {customFieldValues
            .sort(
              (a, b) =>
                a.customFieldTitle.fieldIndex - b.customFieldTitle.fieldIndex
            )
            .map((customFieldValue) => {
              return (
                <ListGroup.Item key={customFieldValue.id}>
                  {customFieldValue.customFieldTitle.fieldName +
                    ": " +
                    customFieldValue.fieldValue}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        <Card.Body className={styles.buttons}>
          <RouteButton
            text={t("collections:back")}
            route={`/collections/${collectionItem?.ownerName}/${collectionItem?.collectionId}`}
          />
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
