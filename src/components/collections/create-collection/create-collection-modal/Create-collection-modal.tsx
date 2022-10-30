import Modal from "react-bootstrap/Modal";
import CreateCollectionForm from "../create-collection-form/Create-collection-form";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";
import { useTranslation } from "react-i18next";

function CreateCollectionModal() {
  const { t } = useTranslation();
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
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t("collections:create-new-collection")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCollectionForm />
      </Modal.Body>
    </Modal>
  );
}

export default CreateCollectionModal;
