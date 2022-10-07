import { ICollection } from "../../../models/ICollection";
import styles from "./Collections-item.module.css";
import { Link } from "react-router-dom";

type CollectionsItemProps = {
  data: ICollection;
};

function CollectionsItem(props: CollectionsItemProps) {
  const { data } = props;

  return <Link to={`/collection/${data.id}` } className={styles.collectionsItem} type="button">
    <div className={styles.background}></div>
    <div className={styles.descriptionBlock}>
    <div>Title: {data.name || 'no name'}</div>
    <div>Description: {data.description || 'no description'}</div>
    <div>Theme: {data.theme?.name || 'empty theme'}</div>
    </div>
  </Link>;
}

export default CollectionsItem;
