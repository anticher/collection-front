import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionNameMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";

function UpdateNameGroup() {
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

  const [sendNewName, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionNameMutation();

  const [nameValue, setNameValue] = useState(collection?.name || "");

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
    console.log("d");
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
      <Form.Label>Colection title</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter collection title"
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

export default UpdateNameGroup;
