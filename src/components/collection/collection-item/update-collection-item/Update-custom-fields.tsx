import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../app/app-hooks";
import { useGetCollectionByIdQuery } from "../../../../app/collections/collections.api-slice";
import UpdateCollectionItemCustomFieldString from "./Update-custom-field-string";

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

  const createCustomInputGroup = () => {
    return customFieldValues
      .sort(
        (a, b) => a.customFieldTitle.fieldIndex - b.customFieldTitle.fieldIndex
      )
      .map((customField, index) => {
        return (
          <UpdateCollectionItemCustomFieldString
            key={customField.id}
            index={index}
          />
        );
      });
  };

  return <Form.Group className="mb-3">{createCustomInputGroup()}</Form.Group>;
}

export default UpdateCollectionItemCustomFields;
