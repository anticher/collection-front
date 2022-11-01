import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionNameMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../../../utils/useErrorSnack";

function UpdateNameGroup() {
  const { t } = useTranslation();

  const { ownerName } = useParams();

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

  const auth = useAppSelector((state) => state.auth);

  const [sendNewName, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionNameMutation();

  const [nameValue, setNameValue] = useState(collection?.name || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading]);

  useErrorSnack(
    Boolean(isDataError || isSendError),
    "common:server-error"
  );

  if (!collection) {
    return null;
  }

  const submitHandler = async () => {
    const { name } = collection;
    if (name !== nameValue && nameValue.length) {
      await sendNewName({
        id: collection.id,
        name: nameValue,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-name")}</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={t("collections:enter-collection-name")}
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
          {t("collections:apply")}
        </Button>
      </InputGroup>
    </Form.Group>
  );
}

export default UpdateNameGroup;
