import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useGetTagByNameQuery } from "../../../app/tags/tags.api-slice";
import SearchResultItem from "../search-result-item/Search-result-item";

type ItemsByTagSearchProps = {
  isDebounce: boolean;
};

function ItemsByTagSearchResult({ isDebounce }: ItemsByTagSearchProps) {
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(
    searchString || "",
    isDebounce ? 500 : 0
  );

  const { data: tag } = useGetTagByNameQuery(debouncedValue);

  return (
    <>
      {tag &&
        tag.collectionItems.map((item) => {
          return (
             <SearchResultItem
             key={item.id}
             navigateUrl={`/collections/${item.ownerName}/${item.collectionId}/${item.id}`}
             name={item.ownerName}
             type="Item"
           />
          );
        })}
    </>
  );
}

export default ItemsByTagSearchResult;
