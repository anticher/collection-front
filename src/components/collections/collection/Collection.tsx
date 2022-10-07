import styles from "./Collection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useGetCollectionByIdQuery } from "../collections.api-slice";
import { useLocation } from "react-router-dom";
import { ICollectionItem } from "../../../models/ICollectionItem";

function Collection() {
  const pathname = useLocation().pathname;
  console.log(pathname);
  const { data, isLoading, isSuccess, isError } = useGetCollectionByIdQuery(
    pathname.substring(pathname.lastIndexOf("/"))
  );

  let content;

  if (isLoading) {
    content = <div>loading</div>;
  } else if (isSuccess) {
    content = data.items.length ? (
      <>
        <Row>{data.items.length && data.ownerName}</Row>
        <Row>
          {data.items.map((item: ICollectionItem) => (
            <Col
              className={styles.col}
              xl={3}
              md={4}
              xs={6}
              key={item.id}
            >
              <div>{item.name}</div>
            </Col>
          ))}
        </Row>
      </>
    ) : 'no content';
    // content = <div>{data.items.length ? data.items[0].id : 'no items'}</div>
  } else if (isError) {
    content = <div>failed to load data</div>;
  }
  return <Container className={styles.collections}>{content}</Container>;
}

export default Collection;
