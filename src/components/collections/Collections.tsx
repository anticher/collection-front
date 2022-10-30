import styles from "./Collections.module.css";
import Container from "react-bootstrap/Container";
import CollectionsItem from "../collections-item/Collections-item";
import { useGetCollectionsByUserQuery } from "../../app/collections/collections.api-slice";
import { ICollection } from "../../app/models/collection/collection.model";
import { useLocation } from "react-router-dom";
import CreateCollectionButton from "./create-collection/create-collection-button/Create-collection-button";
import CreateCollectionModal from "./create-collection/create-collection-modal/Create-collection-modal";
import RouteButton from "../common/route-button/Route-button";
import { Alert, Spinner } from "react-bootstrap";
import { spinnerVariant } from "../../constants/bootstrap-constants";
import { useAppSelector } from "../../app/app-hooks";
import UpdateCollectionModal from "./update-collection/update-collection-modal/Update-collection-modal";
import { useTranslation } from "react-i18next";
import { useGetUserByNameQuery } from "../../app/users/users.api-slice";

function Collections() {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const collectionsOwner = pathname.substring(pathname.lastIndexOf("/") + 1);

  const { isError: isUserError } = useGetUserByNameQuery(collectionsOwner);

  const {
    data: collections = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetCollectionsByUserQuery(collectionsOwner);

  const auth = useAppSelector((state) => state.auth);

  const isUserOwnerOrAdmin =
    collectionsOwner === auth.username || auth.role === "admin" || false;

  let content;

  if (isLoading) {
    content = <Spinner animation="border" variant={spinnerVariant} />;
  } else if (isError || isUserError) {
    content = <Alert variant="danger">Failed to load data</Alert>;
  } else if (isSuccess) {
    content = (
      <>
        <div className={styles.itemsGrid}>
          {collections.map((collection: ICollection) => (
            <div className={styles.itemContainer} key={collection.id}>
              <CollectionsItem data={collection} />
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <Container className={styles.collections}>
      <h2 className={styles.title}>
        {pathname.substring(pathname.lastIndexOf("/") + 1)}
      </h2>
      <div className={styles.buttonsRow}>
        <RouteButton route={`/`} text={t("collections:main-page")} />
        {isUserOwnerOrAdmin && <CreateCollectionButton />}
      </div>
      <CreateCollectionModal />
      <UpdateCollectionModal />
      {content}
    </Container>
  );
}

export default Collections;
