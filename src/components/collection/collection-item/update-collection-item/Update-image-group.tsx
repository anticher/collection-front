import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { useUpdateCollectionItemImageMutation } from "../../../../app/collection-items/collection-items.api-slice";
import {
  useGetCollectionByIdQuery,
} from "../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../app/collections/collections.slice";
import { useSendImageMutation } from "../../../../app/image-upload/image-upload.api-slice";
import { transformImageToFormdata } from "../../../../app/image-upload/transform-image-to-formdata";
import { buttonDanger, buttonVariant } from "../../../../constants/bootstrap-constants";

function UpdateCollectionItemImageGroup() {
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  const auth = useAppSelector((state) => state.auth);

  const [sendNewImage, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionItemImageMutation();

  const [
    getImageUrl,
    { isLoading: isGetImageUrlLoading, error: isGetImageUrlError },
  ] = useSendImageMutation();

  const [image, setImage] = useState<File | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading || isGetImageUrlLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading, isGetImageUrlLoading]);

  useEffect(() => {
    if (isDataError || isSendError || isGetImageUrlError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isDataError, isSendError, isGetImageUrlError]);

  if (!collectionItem) {
    return null;
  }

  const onChangeHandler = (e: ChangeEvent) => {
    const imageFile = (e.target as HTMLInputElement).files?.[0];
    imageFile ? setImage(imageFile) : setImage(null);
  };

  const submitHandler = async () => {
    if (image) {
      console.log(image);
      const imageUrl = (
        await getImageUrl(transformImageToFormdata(image)).unwrap()
      ).secure_url;
      await sendNewImage({
        id: collectionItem.id,
        image: imageUrl,
        ownerName: collectionItem.ownerName,
        username: auth.username,
      });
      console.log(imageUrl)
      refetch();
    }
  };

  const deleteHandler = async () => {
    await sendNewImage({
      id: collectionItem.id,
      image: "",
      ownerName: collectionItem.ownerName,
      username: auth.username,
    });
    refetch();
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Item image</Form.Label>
      <Form.Control
        className="mb-1"
        type="file"
        title=""
        accept="image/png, image/jpeg"
        onChange={onChangeHandler}
      />
      <div className="d-flex flex-row-reverse gap-1">
        <Button variant={buttonDanger} type="button" onClick={deleteHandler}>
          Delete image
        </Button>
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </Form.Group>
  );
}

export default UpdateCollectionItemImageGroup;
