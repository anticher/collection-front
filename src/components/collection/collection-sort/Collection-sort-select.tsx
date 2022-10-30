import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setCollectionSortValue } from "../../../app/collections/collections.slice";
import {
  arrowDownChar,
  arrowUpChar,
} from "../../../constants/char-code-constants";

function CollectionSortSelect() {
  const { t } = useTranslation();
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
      <option value="create-date-down">{t("collections:create-date")} {arrowDownChar}</option>
      <option value="create-date-up">{t("collections:create-date")} {arrowUpChar}</option>
      <option value="name-down">{t("collections:name")} {arrowDownChar}</option>
      <option value="name-up">{t("collections:name")} {arrowUpChar}</option>
      <option value="likes-down">{t("collections:likes")} {arrowDownChar}</option>
      <option value="likes-up">{t("collections:likes")} {arrowUpChar}</option>
    </Form.Select>
  );
}

export default CollectionSortSelect;
