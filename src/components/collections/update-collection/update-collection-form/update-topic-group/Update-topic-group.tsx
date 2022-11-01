import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import {
  useGetCollectionsByUserQuery,
  useUpdateCollectionTopicMutation,
} from "../../../../../app/collections/collections.api-slice";
import { setCollectionModalSpinnerVisibility } from "../../../../../app/collections/collections.slice";
import { useGetTopicsQuery } from "../../../../../app/topics/topics.api-slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../../../utils/useErrorSnack";

function UpdateTopicGroup() {
  const { t } = useTranslation();

  const { ownerName } = useParams();

  const collectionId = useAppSelector(
    (state) => state.collections.updatedCollectionId
  );
  const { data: collections, refetch } = useGetCollectionsByUserQuery(
    ownerName!
  );
  const collection = collections?.find(
    (collection) => collection.id === collectionId
  );

  const auth = useAppSelector((state) => state.auth);

  const {
    data: topics = [],
    isLoading: isTopicsLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery();

  const [sendNewTopicId, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionTopicMutation();

  const [topicValue, setTopicValue] = useState(collection?.topic.name || "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTopicsLoading || isSendLoading) {
      dispatch(setCollectionModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionModalSpinnerVisibility(false));
    }
  }, [dispatch, isTopicsLoading, isSendLoading]);

  useErrorSnack(Boolean(isTopicsError || isSendError), "common:server-error");

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
        <Form.Select onChange={(e) => setTopicValue(e.target.value)}>
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
