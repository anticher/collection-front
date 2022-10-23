import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/app-hooks";
import {
  useCreateCommentMutation,
  useGetCommentsByCollectionItemQuery,
} from "../../../app/comments/comments.api-slice";

function CommentInput() {
  const pathname = useLocation().pathname;
  const collectionItemId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const auth = useAppSelector((state) => state.auth);

  const {
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCommentsByCollectionItemQuery(collectionItemId);

  const [sendNewComment, { isLoading: isSendLoading, error: isSendError }] =
    useCreateCommentMutation();

  const [inputText, setInputText] = useState("");

  const onSendHandler = async () => {
    if (inputText && auth.id) {
      await sendNewComment({
        itemId: collectionItemId,
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
        as="textarea"
        rows={3}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {isDataLoading || isSendLoading ? (
        <div>loading</div>
      ) : (
        <Button onClick={onSendHandler}>Send</Button>
      )}
    </>
  );
}

export default CommentInput;
