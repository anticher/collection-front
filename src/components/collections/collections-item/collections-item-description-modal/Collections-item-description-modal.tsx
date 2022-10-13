import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-bootstrap/Modal";
import { ICollection } from "../../../../models/ICollection";

interface CollectionsItemDescriptionModalProps {
  showDescription: boolean;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
  data: ICollection;
}

function CollectionsItemDescriptionModal(
  props: CollectionsItemDescriptionModalProps
) {
  return (
    <Modal
      show={props.showDescription}
      onHide={() => props.setShowDescription(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {props.data.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.data.description}</p>
      </Modal.Body>
    </Modal>
  );
}

export default CollectionsItemDescriptionModal;
