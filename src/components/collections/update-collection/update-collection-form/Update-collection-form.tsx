import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import {
  useDeleteCollectionMutation,
  useGetCollectionsByUserQuery,
} from "../../../../app/collections/collections.api-slice";
import {
  setCollectionModalSpinnerVisibility,
  setCollectionUpdateModalVisibility,
} from "../../../../app/collections/collections.slice";
import { buttonDanger } from "../../../../constants/bootstrap-constants";
import styles from "./Update-collection-form.module.css";
import UpdateCustomFieldGroup from "./update-custom-field-group/Update-custom-field-group";
import UpdateDescriptionGroup from "./update-description-group/Update-description-group";
import UpdateImageGroup from "./update-image-group/Update-image-group";
import UpdateNameGroup from "./update-name-group/Update-name-group";
import UpdateTopicGroup from "./update-topic-group/Update-topic-group";

function UpdateCollectionForm() {
  const pathname = useLocation().pathname;
  const collectionsOwner = pathname.substring(pathname.lastIndexOf("/") + 1);

  const auth = useAppSelector((state) => state.auth);

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

  const [
    deleteCollection,
    { isLoading: isDeleteLoading, error: isDeleteError },
  ] = useDeleteCollectionMutation();

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

  const { register, handleSubmit } = useForm<{ collectionName: string }>();
  const onDeleteSubmit: SubmitHandler<{ collectionName: string }> = async (
    data
  ) => {
    if (collection && data.collectionName === collection.name) {
      await deleteCollection({
        id: collection.id,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
      dispatch(setCollectionUpdateModalVisibility(false));
    }
  };

  const createCustomInputs = () => {
    if (!collection || collection.customFieldTitles.length === 0) return null;
    return (
      <>
        <Form.Label>Colection custom fields</Form.Label>
        {collection.customFieldTitles.map((customField, index) => {
          return <UpdateCustomFieldGroup key={customField.id} index={index} />;
        })}
      </>
    );
  };

  if (!collection) return null;

  const content = collection ? (
    <div className={styles.form}>
      <UpdateNameGroup />

      <UpdateDescriptionGroup />

      <UpdateTopicGroup />

      <UpdateImageGroup />

      {createCustomInputs()}

      <Form onSubmit={handleSubmit(onDeleteSubmit)}>
        <Form.Label>Delete collection</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Type collection name to confirm"
            {...register("collectionName", {
              required: true,
            })}
          />
          <Button variant={buttonDanger} type="submit">
            Delete collection
          </Button>
        </InputGroup>
      </Form>
    </div>
  ) : null;

  return content;
}

export default UpdateCollectionForm;
