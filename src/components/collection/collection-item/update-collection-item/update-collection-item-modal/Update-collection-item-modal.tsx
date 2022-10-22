import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import { setCollectionItemUpdateModalVisibility, setUpdatedCollectionItemId } from "../../../../../app/collection-items/collection-items.slice";
import ModalSpinner from "../../../../common/spinners/Modal-spinner";
import UpdateCollectionItemForm from "../update-collection-item-form/Update-collection-item-form";

function UpdateCollectionItemModal() {
  const isUpdateModalVisible = useAppSelector(
    (state) => state.collectionItems.isUpdateModalVisible
  );
  const isModalSpinnerVisible = useAppSelector(
    (state) => state.collectionItems.isModalSpinnerVisible
  );
  
  const dispatch = useAppDispatch();
  
  const onHideHandler = () => {
    dispatch(setCollectionItemUpdateModalVisibility(false));
    dispatch(setUpdatedCollectionItemId(""));
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
        <UpdateCollectionItemForm />
      </Modal.Body>
      {isModalSpinnerVisible && <ModalSpinner />}
    </Modal>
  );
}

export default UpdateCollectionItemModal;
