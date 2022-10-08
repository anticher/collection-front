import styles from "./Collections.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollectionsItem from "./collections-item/Collections-item";
import { useGetCollectionsByUserQuery } from "../../app/api-slices/collections.api-slice";
import { ICollection } from "../../models/ICollection";
import { useLocation } from "react-router-dom";
import CreateCollectionButton from "./create-collection-button/Create-collection-button";
import BackButton from "../common/main-button/Main-button";

function Collections() {
  
  const pathname = useLocation().pathname;
  const {
    data: collections = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetCollectionsByUserQuery(pathname.substring(pathname.lastIndexOf('/')));

  let content;

  if (isLoading) {
    content = <Row>loading</Row>;
  } else if (isSuccess) {
    content = (
      <>
        <Row>{collections[0] && collections[0].ownerName}</Row>
        <Row>
          {collections.map((collection: ICollection) => (
            <Col className={styles.col} xl={3} md={4} xs={6} key={collection.id}>
              <CollectionsItem data={collection} />
            </Col>
          ))}
        </Row>
      </>
    );
  } else if (isError) {
    content = <Row>failed to load data</Row>;
  }
  return <Container className={styles.collections}>
    <Row>
      <BackButton />
      <CreateCollectionButton />
    </Row>
    {content}</Container>;
}

export default Collections;
