import { Badge, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/app-hooks";
import { useGetCollectionItemByIdQuery } from "../../../app/collection-items/collection-items.api-slice";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
} from "../../../app/likes/likes.api-slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../utils/useErrorSnack";

function LikesBlock() {
  const { t } = useTranslation();

  const { collectionItemId } = useParams();

  const {
    data: collectionItem,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionItemByIdQuery(collectionItemId!);

  const auth = useAppSelector((state) => state.auth);

  const [addLike, { isLoading: isSendLoading, error: isSendError }] =
    useCreateLikeMutation();

  const [removeLike, { isLoading: isDeleteLoading, error: isDeleteError }] =
    useDeleteLikeMutation();

  useErrorSnack(
    Boolean(isDataError || isSendError || isDeleteError),
    "common:server-error"
  );

  if (!collectionItem) return null;

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
      {t("collections:like")} <Badge bg="secondary">{collectionItem.likes.length}</Badge>
      <span className="visually-hidden">{t("collections:likes-counter")}</span>
    </Button>
  );
}

export default LikesBlock;
