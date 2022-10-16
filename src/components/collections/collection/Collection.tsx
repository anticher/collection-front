import styles from "./Collection.module.css";
import Container from "react-bootstrap/Container";
import { useGetCollectionByIdQuery } from "../../../app/collections/collections.api-slice";
import { useLocation } from "react-router-dom";
import { ICollectionItem } from "../../../models/ICollectionItem";
import RouteButton from "../../common/route-button/Route-button";
import CreateCollectionItemButton from "./create-collection-item-button/Create-collection-item-button";
import { useState } from "react";
import CreateCollectionItemModal from "./create-collection-item-modal/create-collection-modal/Create-collection-item-modal";
import { Card } from "react-bootstrap";

function Collection() {
  const pathname = useLocation().pathname;

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetCollectionByIdQuery(pathname.substring(pathname.lastIndexOf("/")));

  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);

  let content;

  if (isLoading) {
    content = <div>loading</div>;
  } else if (isError) {
    content = <div>failed to load data</div>;
  } else if (isSuccess) {
    content = (
      <>
        <CreateCollectionItemModal
          isCreateModalVisible={isCreateModalVisible}
          setCreateModalVisibility={setCreateModalVisibility}
          collectionData={data}
          refetch={refetch}
        />
        {data.items.length ? (
          <>
            <h2 className={styles.title}>{data.name}</h2>
            <div className={styles.itemsContainer}>
              {data.items.map((item: ICollectionItem) => (
                <div className={styles.gridCell} key={item.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKUxaKXHXDF2oyXfMM1igSWtR-8SQ6yyCOw&usqp=CAU"
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ) : (
          "no items"
        )}
      </>
    );
  }
  return (
    <Container>
      <div className={styles.buttonsRow}>
        <RouteButton
          route={pathname.substring(0, pathname.lastIndexOf("/"))}
          text="Back to collections"
        />
        {isSuccess && (
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
