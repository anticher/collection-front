import { Card } from "react-bootstrap";
import { IComment } from "../../../app/models/comment/comment.model";
import { format } from 'date-fns'

type CommentProps = {
  data: IComment;
};

function Comment({ data }: CommentProps) {
  return (
    <Card className="overflow-hidden">
      <Card.Body>
        <Card.Title className="mb-2">{data.user.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {format(new Date(+data.createDate), 'HH:mm:ss yyyy-MM-dd')}
        </Card.Subtitle>
        <pre>{data.message}</pre>
      </Card.Body>
    </Card>
  );
}

export default Comment;
