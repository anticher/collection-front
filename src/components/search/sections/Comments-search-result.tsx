import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useSearchCommentQuery } from "../../../app/comments/comments.api-slice";
import SearchResultItem from "../search-result-item/Search-result-item";

function CommentsSearchResult() {
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchCommentResult } = useSearchCommentQuery(debouncedValue);

  if (!searchCommentResult || !searchCommentResult.length) return null;

  return (
    <>
      {searchCommentResult.map((comment) => {
        return (
          <SearchResultItem
            key={comment.id}
            navigateUrl={`/collections/${comment.ownerName}/${comment.collectionId}/${comment.itemId}`}
            name={comment.ownerName}
            type="Comment"
          />
        );
      })}
    </>
  );
}

export default CommentsSearchResult;
