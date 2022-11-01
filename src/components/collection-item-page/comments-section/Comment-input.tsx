import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/app-hooks";
import {
  useCreateCommentMutation,
  useGetCommentsByCollectionItemQuery,
} from "../../../app/comments/comments.api-slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function CommentInput() {
  const { t } = useTranslation();

  const { collectionItemId } = useParams();

  const auth = useAppSelector((state) => state.auth);

  const {
    isLoading: isDataLoading,
    refetch,
  } = useGetCommentsByCollectionItemQuery(collectionItemId!);

  const [sendNewComment, { isLoading: isSendLoading }] =
    useCreateCommentMutation();

  const [inputText, setInputText] = useState("");

  const onSendHandler = async () => {
    if (inputText && auth.id) {
      await sendNewComment({
        itemId: collectionItemId!,
        userId: auth.id,
        message: inputText,
      });
      setInputText("");
      refetch();
    }
  };

  if (!auth.username) return null;

  return (
    <>
      <Form.Control
        className="mb-2"
        as="textarea"
        rows={3}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button
        disabled={isDataLoading || isSendLoading ? true : false}
        variant={buttonVariant}
        onClick={onSendHandler}
      >
        {t("collections:send")}
      </Button>
    </>
  );
}

export default CommentInput;
