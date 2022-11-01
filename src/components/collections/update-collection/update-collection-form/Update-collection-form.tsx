import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
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
import { useErrorSnack } from "../../../../utils/useErrorSnack";
import styles from "./Update-collection-form.module.css";
import UpdateCustomFieldGroup from "./update-custom-field-group/Update-custom-field-group";
import UpdateDescriptionGroup from "./update-description-group/Update-description-group";
import UpdateImageGroup from "./update-image-group/Update-image-group";
import UpdateNameGroup from "./update-name-group/Update-name-group";
import UpdateTopicGroup from "./update-topic-group/Update-topic-group";

function UpdateCollectionForm() {
  const { t } = useTranslation();

  const { ownerName } = useParams();

  const auth = useAppSelector((state) => state.auth);

  const collectionId = useAppSelector(
    (state) => state.collections.updatedCollectionId
  );
  const {
    data: collections,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionsByUserQuery(ownerName!);
  const collection = collections?.find(
    (collection) => collection.id === collectionId
  );

  const [
    deleteCollection,
    { isLoading: isDeleteLoading, error: isDeleteError },
  ] = useDeleteCollectionMutation();

  const dispatch = useAppDispatch();

  useErrorSnack(
    Boolean(isDataError || isDeleteError),
    "common:server-error"
  );

  useEffect(() => {
    if (isDataLoading || isDeleteLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isDeleteLoading]);

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
        <Form.Label>{t("collections:custom-inputs")}</Form.Label>
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
        <Form.Label>{t("collections:delete-collection")}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder={t("collections:enter-collection-name")}
            {...register("collectionName", {
              required: true,
            })}
          />
          <Button variant={buttonDanger} type="submit">
            {t("collections:delete-collection")}
          </Button>
        </InputGroup>
      </Form>
    </div>
  ) : null;

  return content;
}

export default UpdateCollectionForm;
