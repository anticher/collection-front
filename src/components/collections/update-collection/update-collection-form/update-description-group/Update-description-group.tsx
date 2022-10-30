import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionDescriptionMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";

function UpdateDescriptionGroup() {
  const { t } = useTranslation();
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

  const [sendNewDescription, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionDescriptionMutation();

  const [descriptionValue, setDescriptionValue] = useState(
    collection?.description || ""
  );

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading]);

  useEffect(() => {
    if (isDataError || isSendError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isDataError, isSendError]);

  if (!collection) {
    return null;
  }

  const submitHandler = async () => {
    const { description } = collection;
    if (description !== descriptionValue && descriptionValue.length) {
      await sendNewDescription({
        id: collection.id,
        description: descriptionValue,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-description")}</Form.Label>
      <Form.Control
        className="mb-1"
        as="textarea"
        rows={3}
        type="text"
        placeholder={t("collections:enter-collection-description")}
        value={descriptionValue}
        onChange={(e) => {
          setDescriptionValue(e.target.value);
        }}
      />
      <div className="d-flex flex-row-reverse">
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
        {t("collections:apply")}
        </Button>
      </div>
    </Form.Group>
  );
}

export default UpdateDescriptionGroup;
