import { ICollection } from "../../../models/ICollection";
import styles from "./CollectionsItem.module.css";

type CollectionsItemProps = {
  data: ICollection
}

function CollectionsItem(props: CollectionsItemProps) {
    return <div className={styles.collectionsItem}>{props.data.id}</div>;
  }
  
  export default CollectionsItem;
  