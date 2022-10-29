import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../app/app-hooks";
import { useUpdateCollectionItemNameMutation } from "../../../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemModalSpinnerVisibility } from "../../../../../../app/collection-items/collection-items.slice";
import { useGetCollectionByIdQuery } from "../../../../../../app/collections/collections.api-slice";
import { buttonVariant } from "../../../../../../constants/bootstrap-constants";

function UpdateCollectionItemNameGroup() {
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

  const [sendNewName, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionItemNameMutation();

  const [nameValue, setNameValue] = useState(collectionItem?.name || "");

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
      <Form.Label>Item title</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
          Submit
        </Button>
      </InputGroup>
    </Form.Group>
  );
}

export default UpdateCollectionItemNameGroup;
