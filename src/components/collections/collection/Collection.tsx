import styles from "./Collection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useGetCollectionByIdQuery } from "../../../app/api-slices/collections.api-slice";
import { useLocation } from "react-router-dom";
import { ICollectionItem } from "../../../models/ICollectionItem";
import RouteButton from "../../common/route-button/Route-button";
import CreateCollectionItemButton from "./create-collection-item-button/Create-collection-item-button";
import { useState } from "react";
import CreateCollectionItemModal from "./create-collection-item-modal/create-collection-modal/Create-collection-item-modal";

function Collection() {
  const pathname = useLocation().pathname;

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetCollectionByIdQuery(pathname.substring(pathname.lastIndexOf("/")));

  console.log(data?.customFieldTitles);

  console.log(data?.items);

  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);

  let content;

  if (isLoading) {
    content = <div>loading</div>;
  } else if (isError) {
    content = <div>failed to load data</div>;
  } else if (isSuccess) {
    content = (
      <>
        <Row>
          <RouteButton
            route={`/collections/${data.ownerName}`}
            text="back to collection"
          />
          <CreateCollectionItemButton
            setCreateModalVisibility={setCreateModalVisibility}
          />
        </Row>
        <CreateCollectionItemModal
          isCreateModalVisible={isCreateModalVisible}
          setCreateModalVisibility={setCreateModalVisibility}
          collectionData={data}
          refetch={refetch}
        />
        {data.items.length ? (
          <>
            <Row>{data.items.length && data.ownerName}</Row>
            <Row>
              {data.items.map((item: ICollectionItem) => (
                <Col className={styles.col} xl={3} md={4} xs={6} key={item.id}>
                  <div>{item.name}</div>
                </Col>
              ))}
            </Row>
          </>
        ) : "no items" }
      </>
    );
  }
  return <Container>{content}</Container>;
}

export default Collection;
