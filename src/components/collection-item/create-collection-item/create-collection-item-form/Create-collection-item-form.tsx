import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCreateCollectionItemMutation } from "../../../../app/collection-items/collection-items.api-slice";
import { checkItemCreateData } from "./utils/check-item-create-data";
import { transformImageToFormdata } from "../../../../app/image-upload/transform-image-to-formdata";
import { useSendImageMutation } from "../../../../app/image-upload/image-upload.api-slice";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { ICollectionItemCreate } from "../../../../app/models/collection-item/create.model";
import { useLocation } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../../../../app/collections/collections.api-slice";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { setCollectionItemCreateModalVisibility } from "../../../../app/collection-items/collection-items.slice";
import { useTranslation } from "react-i18next";
import { useErrorSnack } from "../../../../utils/useErrorSnack";
import ItemNameGroup from "./groups/Item-name-group";
import ItemTagsGroup from "./groups/tags/Item-tags-group";
import ItemImageGroup from "./groups/Item-image-group";
import CustomGroups from "./groups/custom/Custom-groups";
import { CreateCollectionItemFormInput } from "./models/create-collection-item-form-input.model";

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

  const customFieldsTitles = collection?.customFieldTitles || [];
  const ownerName = collection?.ownerName || "";
  const { username, role } = useAppSelector((state) => state.auth);

  const [
    sendImage,
    { isLoading: isSendImageLoading, isError: isSendImageError },
  ] = useSendImageMutation();

  const dispatch = useAppDispatch();

  useErrorSnack(
    isSendImageError || isCollectionItemSendError || isDataError,
    t("common:server-error")
  );

  const isLoading =
    isSendImageLoading ||
    isCollectionItemSendLoading ||
    isDataLoading;

  const methods = useForm<CreateCollectionItemFormInput>();

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
      checkItemCreateData(newCollectionItem, isCollectionItemSendLoading, role)
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
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <ItemNameGroup />
        <ItemTagsGroup />
        <ItemImageGroup />
        <CustomGroups
          customFieldsTitles={customFieldsTitles}
        />
        <Button disabled={isLoading} variant={buttonVariant} type="submit">
          {t("collections:create")}
        </Button>
      </Form>
    </FormProvider>
  );
}

export default CreateCollectionItemForm;
