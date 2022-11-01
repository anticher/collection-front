import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../../app/app-hooks";
import { useGetCollectionByIdQuery } from "../../../../../../app/collections/collections.api-slice";
import UpdateCollectionItemCustomField from "./custom-field/Update-custom-field";

function UpdateCollectionItemCustomFields() {
  const { collectionId } = useParams();

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const { data: collection } = useGetCollectionByIdQuery(collectionId!);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  if (!collection || !collectionItem) {
    return null;
  }
  const customFieldValues = [...collectionItem.customFieldValues];

  const createCustomInputGroup = () => {
    return customFieldValues
      .sort(
        (a, b) => a.customFieldTitle.fieldIndex - b.customFieldTitle.fieldIndex
      )
      .map((customField) => {
        return (
          <UpdateCollectionItemCustomField
            key={customField.id}
            index={customField.customFieldTitle.fieldIndex}
          />
        );
      });
  };

  return <Form.Group className="mb-3">{createCustomInputGroup()}</Form.Group>;
}

export default UpdateCollectionItemCustomFields;
