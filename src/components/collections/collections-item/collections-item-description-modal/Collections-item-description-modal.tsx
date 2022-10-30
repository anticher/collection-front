import { Dispatch, SetStateAction } from "react";
import ReactMarkdown from 'react-markdown'
import Modal from "react-bootstrap/Modal";
import { ICollection } from "../../../../app/models/collection/collection.model";

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
      size="xl"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {props.data.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactMarkdown>{props.data.description}</ReactMarkdown>
      </Modal.Body>
    </Modal>
  );
}

export default CollectionsItemDescriptionModal;
