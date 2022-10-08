import { ICollection } from "../../../models/ICollection";
import styles from "./Collections-item.module.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type CollectionsItemProps = {
  data: ICollection;
};

function CollectionsItem(props: CollectionsItemProps) {
  const navigate = useNavigate();
  const { data } = props;

  const onClickHandler = (e: React.MouseEvent<EventTarget>) => {
    e.stopPropagation();
  };

  const onCardClickHandler = (e: any) => {
    console.log('card trigger')
    navigate(`/collection/${data.id}`)
  }

  return (
    <Card className={styles.collectionsItem} onClick={(e) => onCardClickHandler(e)}>
      <Card.Img className={styles.background} />
      <Card.Body>
        <Card.Title>Title: {data.name || "no name"}</Card.Title>
        <Card.Text>
          Description: {data.description || "no description"}
        </Card.Text>
        <Card.Text>Theme: {data.theme?.name || "empty theme"}</Card.Text>
        <Button variant="primary" onClick={(e) => onClickHandler(e)}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CollectionsItem;
