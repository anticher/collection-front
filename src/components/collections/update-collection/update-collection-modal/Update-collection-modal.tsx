import styles from "./Update-collection-modal.module.css";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import UpdateCollectionForm from "../update-collection-form/Update-collection-form";
import {
  setCollectionUpdateModalVisibility,
  setUpdatedCollectionId,
} from "../../../../app/collections/collections.slice";
import { Spinner } from "react-bootstrap";
import { buttonVariant } from "../../../../constants/bootstrap-constants";

function UpdateCollectionModal() {
  const isUpdateModalVisible = useAppSelector(
    (state) => state.collections.isUpdateModalVisible
  );

  const isModalSpinnerVisible = useAppSelector(
    (state) => state.collections.isModalSpinnerVisible
  );

  const dispatch = useAppDispatch();

  const onHideHandler = () => {
    dispatch(setCollectionUpdateModalVisibility(false));
    dispatch(setUpdatedCollectionId(""));
  };

  return (
    <Modal
      size="xl"
      show={isUpdateModalVisible}
      onHide={onHideHandler}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update collection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateCollectionForm />
      </Modal.Body>
      {isModalSpinnerVisible && (
        <Spinner
          className={styles.spinner}
          variant={buttonVariant}
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Modal>
  );
}

export default UpdateCollectionModal;
