import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useDeleteCollectionCustomFieldMutation,
  useGetCollectionsByUserQuery,
  useUpdateCollectionCustomFieldTitleMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonDanger, buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../../../utils/useErrorSnack";

type UpdateCustomFieldGroupProps = {
  index: number;
};

function UpdateCustomFieldGroup({ index }: UpdateCustomFieldGroupProps) {
  const { t } = useTranslation();

  const { ownerName } = useParams();

  const collectionId = useAppSelector(
    (state) => state.collections.updatedCollectionId
  );
  const { data: collections, refetch } =
    useGetCollectionsByUserQuery(ownerName!);
  const collection = collections?.find(
    (collection) => collection.id === collectionId
  );

  const auth = useAppSelector((state) => state.auth);

  const [sendNewName, { isLoading: isUpdateLoading, error: isUpdateError }] =
    useUpdateCollectionCustomFieldTitleMutation();

  const [deleteField, { isLoading: isDeleteLoading, error: isDeleteError }] =
    useDeleteCollectionCustomFieldMutation();

  const [nameValue, setNameValue] = useState(
    collection?.customFieldTitles[index].fieldName || ""
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUpdateLoading || isDeleteLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isUpdateLoading, isDeleteLoading]);
  
  useErrorSnack(
    Boolean(isUpdateError || isDeleteError),
    "common:server-error"
  );

  if (!collection) {
    return null;
  }

  const submitHandler = async () => {
    const { id, fieldName } = collection?.customFieldTitles[index];
    if (fieldName !== nameValue && nameValue.length) {
      await sendNewName({
        id,
        customFieldTitle: nameValue,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  const deleteHandler = () => {
    const { id } = collection?.customFieldTitles[index];
    deleteField({
      id,
      ownerName: collection.ownerName,
      username: auth.username,
    });
    refetch();
  };

  return (
    <Form.Group className="mb-3">
      <InputGroup className="mb-3">
        <Form.Control
          defaultValue={collection.customFieldTitles[index].fieldType}
          disabled
        ></Form.Control>
        <Form.Control
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </InputGroup>
      <div className="d-flex flex-row-reverse gap-1">
        <Button variant={buttonDanger} type="button" onClick={deleteHandler}>
        {t("collections:delete-field")}</Button>
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
        {t("collections:apply")}
        </Button>
      </div>
    </Form.Group>
  );
}

export default UpdateCustomFieldGroup;
