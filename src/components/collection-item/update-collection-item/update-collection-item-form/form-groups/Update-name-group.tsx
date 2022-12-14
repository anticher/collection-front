import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import { useUpdateCollectionItemNameMutation } from "../../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemModalSpinnerVisibility } from "../../../../../app/collection-items/collection-items.slice";
import { useGetCollectionByIdQuery } from "../../../../../app/collections/collections.api-slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../../../utils/useErrorSnack";

function UpdateCollectionItemNameGroup() {
  const { t } = useTranslation();

  const { collectionId } = useParams();

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId!);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  const auth = useAppSelector((state) => state.auth);

  const [sendNewName, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionItemNameMutation();

  const [nameValue, setNameValue] = useState(collectionItem?.name || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading) {
      dispatch(setCollectionItemModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionItemModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading]);

  useErrorSnack(
    Boolean(isDataError || isSendError),
    "common:server-error"
  );

  if (!collectionItem) {
    return null;
  }

  const submitHandler = async () => {
    const { name } = collectionItem;
    if (name !== nameValue && nameValue.length) {
      await sendNewName({
        id: collectionItem.id,
        name: nameValue,
        ownerName: collectionItem.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:item-name")}</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={t("collections:enter-item-name")}
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

export default UpdateCollectionItemNameGroup;
