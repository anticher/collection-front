import styles from "./Collections.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollectionsItem from "../Collection/CollectionsItem";
import { useGetCollectionsByUserQuery } from "./collectionsApiSlice";
import { ICollection } from "../../../models/ICollection";
import { useLocation } from 'react-router-dom'

function Collections() {
  const location = useLocation();
  const {
    data: collections = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCollectionsByUserQuery(location.pathname);

  let content;

  if (isLoading) {
    content = <Col>loading</Col>;
  } else if (isSuccess) {
    content = collections.map((collection: ICollection) => <Col className={styles.col} xs={4} key={collection.id}><CollectionsItem data={collection} /></Col>);
  } else if (isError) {
    content = <Col>{error.toString()}</Col>;
  }
  return (
    <Container className={styles.collections}>
      <Row>
        {content}
      </Row>
    </Container>
  );
}

export default Collections;
