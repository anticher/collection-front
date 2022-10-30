import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setCollectionFilterValue } from "../../../app/collections/collections.slice";

function CollectionFilterInput() {
  const { t } = useTranslation();
  const filterValue = useAppSelector(
    (state) => state.collections.collectionFilterValue
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLSelectElement).value;
    dispatch(setCollectionFilterValue(value));
  };

  return (
    <Form.Control
      placeholder={t("collections:filter-by-name")}
      value={filterValue}
      onChange={(e) => handleChange(e)}
    />
  );
}

export default CollectionFilterInput;
