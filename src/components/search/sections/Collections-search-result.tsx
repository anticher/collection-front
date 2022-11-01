import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useSearchCollectionQuery } from "../../../app/collections/collections.api-slice";
import SearchResultItem from "../search-result-item/Search-result-item";

function CollectionsSearchResult() {
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchCollectionResult } =
    useSearchCollectionQuery(debouncedValue);

  if (!searchCollectionResult || !searchCollectionResult.length) return null;

  return (
    <>
      {searchCollectionResult.map((collection) => {
        return (
          <SearchResultItem
            key={collection.id}
            navigateUrl={`/collections/${collection.ownerName}/${collection.id}`}
            name={collection.name}
            type="Collection"
          />
        );
      })}
    </>
  );
}

export default CollectionsSearchResult;
