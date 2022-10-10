import { Dispatch, SetStateAction } from "react";
import styles from "./Create-collection-modal.module.css";
import Modal from "react-bootstrap/Modal";
import CreateCollectionForm from "../create-collection-form/Create-collection-form";

type CreateCollectionModalProps = {
    isCreateModalVisible: boolean;
    setCreateModalVisibility: Dispatch<SetStateAction<boolean>>
  };
  

function CreateCollectionModal(props: CreateCollectionModalProps) {
  return (
    <Modal
      size="lg"
      show={props.isCreateModalVisible}
      onHide={() => props.setCreateModalVisibility(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Create new collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCollectionForm />
      </Modal.Body>
    </Modal>
  );
}

export default CreateCollectionModal;
