import styles from "./Create-collection-item-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCollectionItemFormInput } from "../../../collections/create-collection/models/create-collection-item-form-input";
import { useCreateCollectionItemMutation } from "../../../../app/collection-items/collection-items.api-slice";
import CustomMultiSelect from "./Tag-multi-select";
import { useGetCredentialsForCreate } from "../../../../app/hooks/use-get-creadentials-for-create";
import { checkItemCreateData } from "./check-item-create-data";
import { useGetTagsQuery } from "../../../../app/tags/tags.api-slice";
import { transformImageToFormdata } from "../../../../app/image-upload/transform-image-to-formdata";
import { useSendImageMutation } from "../../../../app/image-upload/image-upload.api-slice";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useSnackbar } from "notistack";
import { ICollectionItemCreate } from "../../../../app/models/collection-item/create.model";
import { useLocation } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../../../../app/collections/collections.api-slice";
import { useAppDispatch } from "../../../../app/app-hooks";
import { setCollectionItemCreateModalVisibility } from "../../../../app/collection-items/collection-items.slice";
import { useTranslation } from "react-i18next";
import CustomInputs from "./Custom-inputs";

function CreateCollectionItemForm() {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  const collectionId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    data: collection,
    isLoading: isDataLoading,
    isError: isDataError,
    refetch,
  } = useGetCollectionByIdQuery(collectionId);

  const [
    sendCollectionItemCredentials,
    {
      isLoading: isCollectionItemSendLoading,
      isError: isCollectionItemSendError,
    },
  ] = useCreateCollectionItemMutation();

  const {
    data: tags = [],
    isLoading: isTagsLodaing,
    isError: isTagsError,
  } = useGetTagsQuery();
  const options = tags.length
    ? tags.map((tag) => {
        return { value: tag.name, label: tag.name };
      })
    : [];

  const customFieldsTitles = collection?.customFieldTitles || [];
  const ownerName = collection?.ownerName || "";
  const [username, creatorRole] = useGetCredentialsForCreate();

  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const selectRef = useRef(null);

  const [
    sendImage,
    { isLoading: isSendImageLoading, isError: isSendImageError },
  ] = useSendImageMutation();

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      isTagsError ||
      isSendImageError ||
      isCollectionItemSendError ||
      isDataError
    ) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [
    enqueueSnackbar,
    isTagsError,
    isCollectionItemSendError,
    isSendImageError,
    isDataError,
  ]);

  const isLoading =
    isTagsLodaing ||
    isSendImageLoading ||
    isCollectionItemSendLoading ||
    isDataLoading;

  const { register, handleSubmit, setValue } =
    useForm<CreateCollectionItemFormInput>();

  if (!collection) return null;

  const onSubmit: SubmitHandler<CreateCollectionItemFormInput> = async (
    data
  ) => {
    const newCollectionItem: ICollectionItemCreate = {
      ...data,
      image: null,
      tagNames: data.tagNames.join(","),
      ownerName,
      username,
      collectionId: collection.id,
    };
    if (
      checkItemCreateData(
        newCollectionItem,
        isCollectionItemSendLoading,
        creatorRole
      )
    ) {
      const imageUrl = data.image.length
        ? (await sendImage(transformImageToFormdata(data.image["0"])).unwrap())
            .secure_url
        : null;
      newCollectionItem.image = imageUrl;
      await sendCollectionItemCredentials(newCollectionItem).unwrap();
      dispatch(setCollectionItemCreateModalVisibility(false));
      refetch();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>{t("collections:item-name")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("collections:enter-item-name")}
          autoComplete="off"
          {...register("name", {
            required: true,
          })}
        />
      </Form.Group>

      <Form.Group className={styles.tagNamesInputGroup}>
        <Form.Control
          type="text"
          value={selectedOption}
          autoComplete="off"
          {...register("tagNames", {
            required: true,
          })}
          onFocus={() => {
            if (selectRef && selectRef.current) {
              (selectRef.current as HTMLSelectElement).focus();
            }
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("collections:item-tags")}</Form.Label>
        <CustomMultiSelect
          selectRef={selectRef}
          options={options}
          setValue={(newSelectedOption: string[]) =>
            setValue("tagNames", newSelectedOption)
          }
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("collections:item-image")}</Form.Label>
        <Form.Control type="file" {...register("image")} />
      </Form.Group>

      <CustomInputs customFieldsTitles={customFieldsTitles} register={register} />

      <Button disabled={isLoading} variant={buttonVariant} type="submit">
        {t("collections:create")}
      </Button>
    </Form>
  );
}

export default CreateCollectionItemForm;
