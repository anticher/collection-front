import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionThemeMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { useGetThemesQuery } from "../../../../../app/themes/themes.api-slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";

function UpdateThemeGroup() {
  const pathname = useLocation().pathname;
  const collectionsOwner = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionId = useAppSelector(
    (state) => state.collections.updatedCollectionId
  );
  const { data: collections, refetch } =
    useGetCollectionsByUserQuery(collectionsOwner);
  const collection = collections?.find(
    (collection) => collection.id === collectionId
  );

  const auth = useAppSelector((state) => state.auth);

  const {
    data: themes = [],
    isLoading: isThemesLoading,
    isError: isThemesError,
  } = useGetThemesQuery("");

  const [sendNewThemeId, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionThemeMutation();

  const [themeValue, setThemeValue] = useState(collection?.theme.name || "");

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isThemesLoading || isSendLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isThemesLoading, isSendLoading]);

  useEffect(() => {
    if (isThemesError || isSendError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isSendError, isThemesError]);

  if (!collection) {
    return null;
  }

  const options = themes.length
    ? themes.map((theme) => {
        return theme.name;
      })
    : [];

  const submitHandler = async () => {
    const { name } = collection.theme;
    console.log(themeValue);
    if (name !== themeValue && themeValue.length) {
      await sendNewThemeId({
        id: collection.id,
        themeName: themeValue,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Select
          onChange={(e) => setThemeValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Select>
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
            Submit
          </Button>
      </InputGroup>
    </>
  );
}

export default UpdateThemeGroup;
