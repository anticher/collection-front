import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/app-hooks";
import { useGetCollectionItemByIdQuery } from "../../../app/collection-items/collection-items.api-slice";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
} from "../../../app/likes/likes.api-slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function LikesBlock() {
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    data: collectionItem,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionItemByIdQuery(collectionItemId);

  const auth = useAppSelector((state) => state.auth);

  const [addLike, { isLoading: isSendLoading, error: isSendError }] =
    useCreateLikeMutation();

  const [removeLike, { isLoading: isDeleteLoading, error: isDeleteError }] =
    useDeleteLikeMutation();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isDataError || isSendError || isDeleteError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isDataError, isSendError, isDeleteError]);

  if (!collectionItem) return null;

  console.log(collectionItem);

  const userLikeEntity = collectionItem.likes.find(
    (like) => like.userId === auth.id
  );

  const disabled = isDataLoading || isSendLoading || isDeleteLoading;

  const onClickHandler = async () => {
    if (!auth.id) return;
    if (userLikeEntity) {
      removeLike(userLikeEntity.id);
    } else {
      addLike({ itemId: collectionItem.id, userId: auth.id });
    }
    refetch();
  };

  return (
    <Button
      disabled={disabled}
      variant={buttonVariant}
      onClick={onClickHandler}
    >
      Like <Badge bg="secondary">{collectionItem.likes.length}</Badge>
      <span className="visually-hidden">Likes counter</span>
    </Button>
  );
}

export default LikesBlock;
