import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import UpdateCollectionForm from "../update-collection-form/Update-collection-form";
import {
  setCollectionUpdateModalVisibility,
  setUpdatedCollectionId,
} from "../../../../app/collections/collections.slice";
import ModalSpinner from "../../../common/spinners/Modal-spinner";

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
      {isModalSpinnerVisible && <ModalSpinner />}
    </Modal>
  );
}

export default UpdateCollectionModal;
