import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/app-hooks";
import { useGetCommentsByCollectionItemQuery } from "../../../app/comments/comments.api-slice";
import Comment from "./Comment";

function CommentsOutput() {
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const auth = useAppSelector((state) => state.auth);

  const {
    data: comments,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCommentsByCollectionItemQuery(collectionItemId);

  return (
    <div>
      {comments && comments.length
        ? comments.map((commentEntity) => {
            return <Comment key={commentEntity.id} data={commentEntity} />;
          })
        : null}
    </div>
  );
}

export default CommentsOutput;
