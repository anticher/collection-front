import styles from "./Update-custom-field.module.css";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../app/app-hooks";
import { useGetCollectionByIdQuery } from "../../../../../../../app/collections/collections.api-slice";
import { customFieldTypeEnum } from "../../../../../../../app/enum/custom-field-type.enum";
import { buttonVariant } from "../../../../../../../constants/bootstrap-constants";
import { useUpdateCollectionItemCustomFieldMutation } from "../../../../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemModalSpinnerVisibility } from "../../../../../../../app/collection-items/collection-items.slice";
import { useTranslation } from "react-i18next";

function UpdateCollectionItemCustomField({ index }: { index: number }) {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const auth = useAppSelector((state) => state.auth);

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  const [sendNewValue, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionItemCustomFieldMutation();

  const customField = collectionItem?.customFieldValues.find(
    (field) => field.customFieldTitle.fieldIndex === index
  );

  const [value, setValue] = useState(customField?.fieldValue || "");

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading) {
      dispatch(setCollectionItemModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionItemModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading]);

  useEffect(() => {
    if (isDataError || isSendError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isDataError, isSendError]);

  if (!collectionItem) {
    return null;
  }

  if (!collectionItem || !customField) return null;

  let control;

  switch (customField.customFieldTitle.fieldType) {
    case customFieldTypeEnum.integer:
      control = (
        <Form.Control
          type="number"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
      break;
    case customFieldTypeEnum.date:
      control = (
        <Form.Control
          type="date"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
      break;
    case customFieldTypeEnum.textarea:
      control = (
        <Form.Control
          as="textarea"
          rows={1}
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
      break;
    case customFieldTypeEnum.checkbox:
      control = (
        <Form.Check
          className={styles.checkWrapper}
          type="checkbox"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
      break;
    default:
      control = (
        <Form.Control
          type="text"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
  }

  const submitHandler = async () => {
    if (customField.fieldValue !== value && value.length) {
      await sendNewValue({
        id: customField.id,
        customFieldValue: value,
        ownerName: collectionItem.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };
  return (
    <Form.Group className="mb-3">
      <InputGroup className="mb-1">
        <Form.Control
          defaultValue={customField.customFieldTitle.fieldName}
          disabled
        ></Form.Control>
        {control}
      </InputGroup>
      <div className="d-flex flex-row-reverse">
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
          {t("collections:apply")}
        </Button>
      </div>
    </Form.Group>
  );
}

export default UpdateCollectionItemCustomField;
