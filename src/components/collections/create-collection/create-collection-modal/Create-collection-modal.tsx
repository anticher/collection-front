import styles from "./Create-collection-modal.module.css";
import Modal from "react-bootstrap/Modal";
import CreateCollectionForm from "../create-collection-form/Create-collection-form";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";

function CreateCollectionModal() {
  const isCreateModalVisible = useAppSelector(
    (state) => state.collections.isCreateModalVisible
  );

  const dispatch = useAppDispatch();

  const onHideHandler = () => {
    dispatch(setCollectionModalVisibility(false));
  };


  return (
    <Modal
      size="xl"
      show={isCreateModalVisible}
      onHide={onHideHandler}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new collection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCollectionForm />
      </Modal.Body>
    </Modal>
  );
}

export default CreateCollectionModal;
