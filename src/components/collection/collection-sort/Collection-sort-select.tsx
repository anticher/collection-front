import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setCollectionSortValue } from "../../../app/collections/collections.slice";
import {
  arrowDownChar,
  arrowUpChar,
} from "../../../constants/char-code-constants";

function CollectionSortSelect() {
  const sortValue = useAppSelector(
    (state) => state.collections.collectionSortValue
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLSelectElement).value;
    dispatch(setCollectionSortValue(value));
  };

  return (
    <Form.Select value={sortValue} onChange={(e) => handleChange(e)}>
      <option value="create-date-down">Create date {arrowDownChar}</option>
      <option value="create-date-up">Create date {arrowUpChar}</option>
      <option value="name-down">Name {arrowDownChar}</option>
      <option value="name-up">Name {arrowUpChar}</option>
      <option value="likes-down">Likes {arrowDownChar}</option>
      <option value="likes-up">Likes {arrowUpChar}</option>
    </Form.Select>
  );
}

export default CollectionSortSelect;
