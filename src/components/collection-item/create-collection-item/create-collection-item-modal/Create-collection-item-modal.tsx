import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { setCollectionItemCreateModalVisibility } from "../../../../app/collection-items/collection-items.slice";
import ModalSpinner from "../../../common/spinners/Modal-spinner";
import CreateCollectionItemForm from "../create-collection-item-form/Create-collection-item-form";

function CreateCollectionItemModal() {
  const { t } = useTranslation();
  const isCreateModalVisible = useAppSelector(
    (state) => state.collectionItems.isCreateModalVisible
  );
  const isModalSpinnerVisible = useAppSelector(
    (state) => state.collectionItems.isModalSpinnerVisible
  );
  
  const dispatch = useAppDispatch();
  
  const onHideHandler = () => {
    dispatch(setCollectionItemCreateModalVisibility(false));
  };

  return (
    <Modal
      size="lg"
      show={isCreateModalVisible}
      onHide={onHideHandler}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("collections:create-new-item")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCollectionItemForm />
      </Modal.Body>
      {isModalSpinnerVisible && <ModalSpinner />}
    </Modal>
  );
}

export default CreateCollectionItemModal;
