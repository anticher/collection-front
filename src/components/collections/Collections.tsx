import styles from "./Collections.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CollectionsItem from "./collections-item/Collections-item";
import { useGetCollectionsByUserQuery } from "../../app/collections/collections.api-slice";
import { ICollection } from "../../models/ICollection";
import { useLocation } from "react-router-dom";
import CreateCollectionButton from "./create-collection/create-collection-button/Create-collection-button";
import { useState } from "react";
import CreateCollectionModal from "./create-collection/create-collection-modal/Create-collection-modal";
import RouteButton from "../common/route-button/Route-button";
import { Alert, Spinner } from "react-bootstrap";
import { spinnerVariant } from "../../constants/bootstrap-constants";

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
    content = <Spinner animation="border" variant={spinnerVariant} />;
  } else if (isSuccess) {
    content = (
      <>
        <div className={styles.itemsContainer}>
          {collections.map((collection: ICollection) => (
            <div className={styles.gridCell} key={collection.id}>
              <CollectionsItem data={collection} />
            </div>
          ))}
        </div>
      </>
    );
  } else if (isError) {
    content = <Alert variant="danger">Failed to load data</Alert>;
  }
  return (
    <Container className={styles.collections}>
      <h2 className={styles.title}>
        {pathname.substring(pathname.lastIndexOf("/") + 1) + " collections"}
      </h2>
      <div className={styles.buttonsRow}>
        <RouteButton route={`/`} text="Main page" />
        <CreateCollectionButton
          setCreateModalVisibility={setCreateModalVisibility}
        />
      </div>
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
