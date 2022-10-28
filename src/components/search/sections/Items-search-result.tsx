import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useSearchCollectionItemQuery } from "../../../app/collection-items/collection-items.api-slice";
import SearchResultItem from "../search-result-item/Search-result-item";

function ItemsSearchResult() {
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchItemResult } =
    useSearchCollectionItemQuery(debouncedValue);

  return (
    <>
      {searchItemResult && searchItemResult.length
        ? searchItemResult.map((item) => {
            return (
              <SearchResultItem
                key={item.id}
                navigateUrl={`/collections/${item.ownerName}/${item.collectionId}/${item.id}`}
                name={item.ownerName}
                type="Item"
              />
            );
          })
        : null}
    </>
  );
}

export default ItemsSearchResult;
