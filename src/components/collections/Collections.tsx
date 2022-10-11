import styles from "./Collections.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollectionsItem from "./collections-item/Collections-item";
import { useGetCollectionsByUserQuery } from "../../app/api-slices/collections.api-slice";
import { ICollection } from "../../models/ICollection";
import { useLocation } from "react-router-dom";
import CreateCollectionButton from "./create-collection/create-collection-button/Create-collection-button";
import { useState } from "react";
import CreateCollectionModal from "./create-collection/create-collection-modal/Create-collection-modal";
import RouteButton from "../common/route-button/Route-button";

function Collections() {
  const pathname = useLocation().pathname;
  const {
    data: collections = [],
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCollectionsByUserQuery(
    pathname.substring(pathname.lastIndexOf("/"))
  );

  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);

  let content;

  if (isLoading) {
    content = <Row>loading</Row>;
  } else if (isSuccess) {
    content = (
      <>
        {/* {isCreateModalVisible && <CreateCollectionModal />} */}
        <Row>{collections[0] && collections[0].ownerName}</Row>
        <Row xs={1} md={2}>
          {collections.map((collection: ICollection) => (
            <Col className={styles.col} key={collection.id}>
              <CollectionsItem data={collection} />
            </Col>
          ))}
        </Row>
      </>
    );
  } else if (isError) {
    content = <Row>failed to load data</Row>;
  }
  return (
    <Container className={styles.collections}>
      <Row>
        <RouteButton route={`/`} text='Main page' />
        <CreateCollectionButton
          setCreateModalVisibility={setCreateModalVisibility}
        />
      </Row>
      <CreateCollectionModal
          isCreateModalVisible={isCreateModalVisible}
          setCreateModalVisibility={setCreateModalVisibility}
          refetch={refetch}
        />
      {content}
    </Container>
  );
}

export default Collections;
