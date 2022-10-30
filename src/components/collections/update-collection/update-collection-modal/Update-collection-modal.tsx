import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import UpdateCollectionForm from "../update-collection-form/Update-collection-form";
import {
  setCollectionUpdateModalVisibility,
  setUpdatedCollectionId,
} from "../../../../app/collections/collections.slice";
import ModalSpinner from "../../../common/spinners/Modal-spinner";
import { useTranslation } from "react-i18next";

function UpdateCollectionModal() {
  const { t } = useTranslation();

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
    >
      <Modal.Header closeButton>
        <Modal.Title>
        {t("collections:update-collection")}
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
