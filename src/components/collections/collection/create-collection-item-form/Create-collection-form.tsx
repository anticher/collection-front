// import styles from "./Create-collection-item-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction } from "react";


type CreateCollectionItemFormProps = {
  setCreateModalVisibility: Dispatch<SetStateAction<boolean>>
  // refetch: () => void
};

function CreateCollectionItemForm(props: CreateCollectionItemFormProps) {

  return (
    <Form onSubmit={() => {}}>
      <Form.Group className="mb-3">
        <Form.Label>Item title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Item description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection description"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
 
    </Form>
  );
}

export default CreateCollectionItemForm;
