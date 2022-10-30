import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionTopicMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { useGetTopicsQuery } from "../../../../../app/topics/topics.api-slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";

function UpdateTopicGroup() {
  const { t } = useTranslation();
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
    data: topics = [],
    isLoading: isTopicsLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery("");

  const [sendNewTopicId, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionTopicMutation();

  const [topicValue, setTopicValue] = useState(collection?.topic.name || "");

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTopicsLoading || isSendLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isTopicsLoading, isSendLoading]);

  useEffect(() => {
    if (isTopicsError || isSendError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isSendError, isTopicsError]);

  if (!collection) {
    return null;
  }

  const options = topics.length
    ? topics.map((topic) => {
        return topic.name;
      })
    : [];

  const submitHandler = async () => {
    const { name } = collection.topic;
    console.log(topicValue);
    if (name !== topicValue && topicValue.length) {
      await sendNewTopicId({
        id: collection.id,
        topicName: topicValue,
        ownerName: collection.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:collection-topic")}</Form.Label>
      <InputGroup className="mb-3">
        <Form.Select
          onChange={(e) => setTopicValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Select>
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
            {t("collections:apply")}
          </Button>
      </InputGroup>
    </Form.Group>
  );
}

export default UpdateTopicGroup;
