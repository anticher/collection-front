import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useGetTagByNameQuery } from "../../../app/tags/tags.api-slice";
import { spinnerVariant } from "../../../constants/bootstrap-constants";
import SearchResultItem from "../search-result-item/Search-result-item";

type ItemsByTagSearchProps = {
  isDebounce: boolean;
  isVoid: boolean;
};

function ItemsByTagSearchResult({ isDebounce, isVoid }: ItemsByTagSearchProps) {
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(
    searchString || "",
    isDebounce ? 500 : 0
  );

  const {
    data: tag,
    isSuccess,
    isLoading,
    isError,
  } = useGetTagByNameQuery(debouncedValue);

  let content = null;

  if (isLoading) {
    content = <Spinner animation="border" variant={spinnerVariant} />;
  } else if (
    isSuccess &&
    tag &&
    tag.collectionItems &&
    tag.collectionItems.length
  ) {
    content = tag.collectionItems.map((item) => {
      return (
        <SearchResultItem
          key={item.id}
          navigateUrl={`/collections/${item.ownerName}/${item.collectionId}/${item.id}`}
          name={item.name}
          type="Item"
        />
      );
    });
  } else if (isError) {
    content = <Alert variant="danger">Failed to load data</Alert>;
  } else if (!isVoid) {
    content = <Alert variant="warning">No items</Alert>;
  }

  return <>{content}</>;
}

export default ItemsByTagSearchResult;
