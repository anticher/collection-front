import styles from "./Collection.module.css";
import Container from "react-bootstrap/Container";
import { useGetCollectionByIdQuery } from "../../app/collections/collections.api-slice";
import { useLocation } from "react-router-dom";
import { ICollectionItem } from "../../app/models/collection-item/collection-item.model";
import RouteButton from "../common/route-button/Route-button";
import CreateCollectionItemButton from "./create-collection-item-button/Create-collection-item-button";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import CollectionItem from "./collection-item/Collection-item";
import { spinnerVariant } from "../../constants/bootstrap-constants";
import { useAppSelector } from "../../app/app-hooks";
import CreateCollectionItemModal from "./collection-item/create-collection-item/create-collection-item-modal/Create-collection-item-modal";
import UpdateCollectionItemModal from "./collection-item/update-collection-item/update-collection-item-modal/Update-collection-item-modal";

function Collection() {
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const {
    data: collection,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId);

  const auth = useAppSelector((state) => state.auth);

  const isUserOwnerOrAdmin =
    collection?.ownerName === auth.username || auth.role === "admin" || false;

  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);

  let content;

  if (isLoading) {
    content = <Spinner animation="border" variant={spinnerVariant} />;
  } else if (isError) {
    content = <Alert variant="danger">Failed to load data</Alert>;
  } else if (isSuccess) {
    content = (
      <>
        <CreateCollectionItemModal
          isCreateModalVisible={isCreateModalVisible}
          setCreateModalVisibility={setCreateModalVisibility}
          refetch={refetch}
          collectionData={collection}
        />
        <UpdateCollectionItemModal />
        <div className={styles.itemsGrid}>
          {collection.items.map((item: ICollectionItem) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </>
    );
  }
  return (
    <Container className={styles.collection}>
      <h2 className={styles.title}>
        {collection && collection.name}
      </h2>
      <div className={styles.buttonsRow}>
        <RouteButton
          route={pathname.substring(0, pathname.lastIndexOf("/"))}
          text="Back to collections"
        />
        {isSuccess && isUserOwnerOrAdmin && (
          <CreateCollectionItemButton
            setCreateModalVisibility={setCreateModalVisibility}
          />
        )}
      </div>
      {content}
    </Container>
  );
}

export default Collection;
