import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionImageMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonDanger, buttonVariant } from "../../../../../constants/bootstrap-constants";
import { transformImageToFormdata } from "../../../../../app/image-upload/transform-image-to-formdata";
import { useSendImageMutation } from "../../../../../app/image-upload/image-upload.api-slice";

function UpdateImageGroup() {
  const pathname = useLocation().pathname;
  const collectionsOwner = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionId = useAppSelector(
    (state) => state.collections.updatedCollectionId
  );
  const {
    data: collections,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionsByUserQuery(collectionsOwner);
  const collection = collections?.find(
    (collection) => collection.id === collectionId
  );

  const auth = useAppSelector((state) => state.auth);

  const [sendNewImage, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionImageMutation();

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

  if (!collection) {
    return null;
  }

  const onChangeHandler = (e: ChangeEvent) => {
    const imageFile = (e.target as HTMLInputElement).files?.[0];
    imageFile ? setImage(imageFile) : setImage(null);
  };

  const submitHandler = async () => {
    if (image) {
      const imageUrl = (
        await getImageUrl(transformImageToFormdata(image)).unwrap()
      ).secure_url;
      await sendNewImage({
        id: collection.id,
        image: imageUrl,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  const deleteHandler = async() => {
    await sendNewImage({
      id: collection.id,
      image: '',
      ownerName: collection.ownerName,
      username: auth.username,
    });
    refetch();
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Colection image</Form.Label>
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

export default UpdateImageGroup;
