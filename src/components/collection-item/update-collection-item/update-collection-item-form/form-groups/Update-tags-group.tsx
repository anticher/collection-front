import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Select, { OnChangeValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../../../../app/app-hooks";
import { useUpdateCollectionItemTagsMutation } from "../../../../../app/collection-items/collection-items.api-slice";
import { setCollectionItemModalSpinnerVisibility } from "../../../../../app/collection-items/collection-items.slice";
import { useGetCollectionByIdQuery } from "../../../../../app/collections/collections.api-slice";
import { IOption } from "../../../../../app/models/tag/option.model";
import { useGetTagsQuery } from "../../../../../app/tags/tags.api-slice";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useErrorSnack } from "../../../../../utils/useErrorSnack";

function UpdateCollectionItemTagsGroup() {
  const { t } = useTranslation();

  const { collectionId } = useParams();

  const collectionItemId = useAppSelector(
    (state) => state.collectionItems.updatedCollectionItemId
  );

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId!);

  const collectionItem = collection?.items.find(
    (collectionItem) => collectionItem.id === collectionItemId
  );

  const auth = useAppSelector((state) => state.auth);

  const [sendNewTags, { isLoading: isSendLoading, error: isSendError }] =
    useUpdateCollectionItemTagsMutation();

  const {
    data: tags = [],
    isLoading: isTagsDataLoading,
    isError: isTagsDataDataError,
  } = useGetTagsQuery();
  const options = tags.length
    ? tags.map((tag) => {
        return { value: tag.name, label: tag.name };
      })
    : [];

  const SelectedOptionDefaultValue = collectionItem?.tagNames.map(
    (tagData) => tagData.name
  );

  const [selectedOption, setSelectedOption] = useState<string[]>(
    SelectedOptionDefaultValue || []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDataLoading || isSendLoading || isTagsDataLoading) {
      dispatch(setCollectionItemModalSpinnerVisibility(true));
    } else {
      dispatch(setCollectionItemModalSpinnerVisibility(false));
    }
  }, [dispatch, isDataLoading, isSendLoading, isTagsDataLoading]);

  useErrorSnack(
    Boolean(isDataError || isSendError || isTagsDataDataError),
    "common:server-error"
  );

  if (!collectionItem) {
    return null;
  }

  const getValue = () => {
    return selectedOption
      ? options.filter((option) => selectedOption.indexOf(option.value) >= 0)
      : [];
  };

  const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
    const newSelectedOption = (newValue as IOption[]).map(
      (option) => option.value
    );
    setSelectedOption(newSelectedOption);
  };

  const submitHandler = async () => {
    if (selectedOption.length) {
      await sendNewTags({
        id: collectionItem.id,
        tags: selectedOption,
        ownerName: collectionItem.ownerName,
        username: auth.username,
      });
      refetch();
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t("collections:item-tags")}</Form.Label>
      <Select
        className="mb-1"
        classNamePrefix="custom-select"
        value={getValue()}
        onChange={onChange}
        options={options}
        placeholder={t("collections:item-tags")}
        isMulti
      />
      <div className="d-flex flex-row-reverse">
        <Button variant={buttonVariant} type="button" onClick={submitHandler}>
        {t("collections:apply")}
        </Button>
      </div>
    </Form.Group>
  );
}

export default UpdateCollectionItemTagsGroup;
