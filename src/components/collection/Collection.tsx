import styles from "./Collection.module.css";
import Container from "react-bootstrap/Container";
import { useGetCollectionByIdQuery } from "../../app/collections/collections.api-slice";
import { useParams } from "react-router-dom";
import RouteButton from "../common/route-button/Route-button";
import CreateCollectionItemButton from "../collection-item/create-collection-item/create-collection-item-button/Create-collection-item-button";
import { Alert, Spinner } from "react-bootstrap";
import CollectionItem from "../collection-item/Collection-item";
import { spinnerVariant } from "../../constants/bootstrap-constants";
import { useAppSelector } from "../../app/app-hooks";
import CreateCollectionItemModal from "../collection-item/create-collection-item/create-collection-item-modal/Create-collection-item-modal";
import UpdateCollectionItemModal from "../collection-item/update-collection-item/update-collection-item-modal/Update-collection-item-modal";
import { sortCollectionItems } from "./collection-sort/sort-collection";
import { filterCollectionItems } from "./collection-filter/filter-collection";
import CollectionSortSelect from "./collection-sort/Collection-sort-select";
import CollectionFilterInput from "./collection-filter/Collection-filter-input";
import { useTranslation } from "react-i18next";

function Collection() {
  const { t } = useTranslation();

  const { ownerName, collectionId } = useParams();
  
  const {
    data: collection,
    isLoading,
    isSuccess,
    isError,
  } = useGetCollectionByIdQuery(collectionId!);

  const auth = useAppSelector((state) => state.auth);

  const {collectionSortValue, collectionFilterValue} = useAppSelector((state) => state.collections)

  const isUserOwnerOrAdmin =
    collection?.ownerName === auth.username || auth.role === "admin" || false;

  const items = collection ? sortCollectionItems(collection, collectionSortValue) : [];

  const filteredItems = filterCollectionItems(items, collectionFilterValue);

  let mainContent;

  if (isLoading) {
    mainContent = <Spinner animation="border" variant={spinnerVariant} />;
  } else if (isError) {
    mainContent = <Alert variant="danger">Failed to load data</Alert>;
  } else if (isSuccess) {
    mainContent = (
      <>
        <CreateCollectionItemModal/>
        <UpdateCollectionItemModal />
        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </>
    );
  }
  return (
    <Container className={styles.collection}>
      <h2 className={styles.title}>{collection && collection.name}</h2>
      <div className={styles.buttonsRow}>
        <RouteButton
          route={`/collections/${ownerName}`}
          text={t("collections:back-to-collections")}
        />
        <CollectionSortSelect />
        <CollectionFilterInput />
        {isSuccess && isUserOwnerOrAdmin && (
          <CreateCollectionItemButton />
        )}
      </div>
      {mainContent}
    </Container>
  );
}

export default Collection;
