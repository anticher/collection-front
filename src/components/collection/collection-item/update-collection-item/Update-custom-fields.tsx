import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { useUpdateCollectionItemCustomFieldMutation } from "../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemModalSpinnerVisibility } from "../../../../app/collection-items/collection-items.slice";
import { useGetCollectionByIdQuery } from "../../../../app/collections/collections.api-slice";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { ICustomFieldValue } from "../../../../models/ICustomFieldValue";
import { customFieldTypeEnum } from "../../../collections/create-collection/enum/custom-field-type.enum";
import UpdateCustomFieldInteger from "./Update-custom-field-integer";
import UpdateCollectionItemCustomFieldString from "./Update-custom-field-string";

function UpdateCollectionItemCustomFields() {
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  if (!collection || !collectionItem) {
    return null;
  }

  const createCustomInputGroup = () => {
    return collectionItem.customFieldValues.map((customField, index) => {
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
