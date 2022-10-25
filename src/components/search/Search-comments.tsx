import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useSearchCommentQuery } from "../../app/comments/comments.api-slice";

function SearchComments() {
  const navigate = useNavigate();
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchCommentResult } = useSearchCommentQuery(debouncedValue);

  return (
    <>
      {searchCommentResult && searchCommentResult.length
        ? searchCommentResult.map((comment) => {
            return (
              <Card key={comment.id}>
                <Card.Body
                  onClick={() =>
                    navigate(
                      `/collections/${comment.item.ownerName}/${comment.item.collectionId}/${comment.item.id}`
                    )
                  }
                >
                  {comment.message}
                </Card.Body>
              </Card>
            );
          })
        : null}
    </>
  );
}

export default SearchComments;
