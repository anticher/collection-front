import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import { useDeleteCollectionItemMutation } from "../../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemUpdateModalVisibility } from "../../../../../app/collection-items/collection-items.slice";
import { useGetCollectionByIdQuery } from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonDanger } from "../../../../../constants/bootstrap-constants";
import UpdateCollectionItemCustomFields from "../Update-custom-fields";
import UpdateCollectionItemImageGroup from "../Update-image-group";
import UpdateCollectionItemNameGroup from "../Update-name-group";
import UpdateCollectionItemTagsGroup from "../Update-tags-group";

function UpdateCollectionItemForm() {
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


  const [
    deleteCollectionItem,
    { isLoading: isDeleteLoading, error: isDeleteError },
  ] = useDeleteCollectionItemMutation();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isDeleteLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isDeleteLoading]);

  useEffect(() => {
    if (isDataError || isDeleteError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isDataError, isDeleteError]);

  const { register, handleSubmit } = useForm<{ collectionItemName: string }>();
  const onDeleteSubmit: SubmitHandler<{ collectionItemName: string }> = async (
    data
  ) => {
    if (collectionItem && data.collectionItemName === collectionItem.name) {
      await deleteCollectionItem({
        id: collectionItem.id,
        ownerName: collectionItem.ownerName,
        username: auth.username,
      });
      refetch();
      dispatch(setCollectionItemUpdateModalVisibility(false));
    }
  };

  return (
    <>
      <UpdateCollectionItemNameGroup />
      <UpdateCollectionItemTagsGroup />
      <UpdateCollectionItemImageGroup />
      <UpdateCollectionItemCustomFields />
      <Form onSubmit={handleSubmit(onDeleteSubmit)}>
        <Form.Label>Delete collection</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Type item name to confirm"
            {...register("collectionItemName", {
              required: true,
            })}
          />
          <Button variant={buttonDanger} type="submit">
            Delete collection
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default UpdateCollectionItemForm;
