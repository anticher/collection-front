import styles from "./Search-result-item.module.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type SearchResultItemProps = {
  navigateUrl: string;
  name: string;
  type: string;
};

function SearchResultItem(props: SearchResultItemProps) {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <Card.Body onClick={() => navigate(props.navigateUrl)}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.type}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default SearchResultItem;
