import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../../../app/app-hooks";
import { useGetCollectionByIdQuery } from "../../../../../../app/collections/collections.api-slice";
import UpdateCollectionItemCustomField from "./custom-field/Update-custom-field";

function UpdateCollectionItemCustomFields() {
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const { data: collection } = useGetCollectionByIdQuery(collectionId);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  if (!collection || !collectionItem) {
    return null;
  }
  const customFieldValues = [...collectionItem.customFieldValues];

  console.log(customFieldValues);

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
