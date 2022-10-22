import { Dispatch, SetStateAction } from "react";
// import styles from "./Create-collection-modal.module.css";
import Modal from "react-bootstrap/Modal";
import { ICollection } from "../../../../../models/ICollection";
import CreateCollectionItemForm from "../create-collection-item-form/Create-collection-item-form";

type CreateCollectionItemModalProps = {
    isCreateModalVisible: boolean;
    setCreateModalVisibility: Dispatch<SetStateAction<boolean>>
    collectionData: ICollection
    refetch: () => void
  };
  

function CreateCollectionItemModal(props: CreateCollectionItemModalProps) {
  return (
    <Modal
      size="lg"
      show={props.isCreateModalVisible}
      onHide={() => props.setCreateModalVisibility(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Create new collection item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCollectionItemForm setCreateModalVisibility={props.setCreateModalVisibility} collectionData={props.collectionData} refetch={props.refetch} />
      </Modal.Body>
    </Modal>
  );
}

export default CreateCollectionItemModal;
