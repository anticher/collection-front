import { useLocation } from "react-router-dom";
import { useGetCommentsByCollectionItemQuery } from "../../../app/comments/comments.api-slice";
import Comment from "./Comment";

function CommentsOutput() {
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const { data: comments } =
    useGetCommentsByCollectionItemQuery(collectionItemId);

  return (
    <div>
      {comments && comments.length
        ? comments.map((commentEntity) => {
            return (
              <div className="mb-2" key={commentEntity.id}>
                <Comment data={commentEntity} />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default CommentsOutput;