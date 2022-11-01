import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { CreateCollectionFormInput } from "./models/create-collection-form-input.model";
import {
  useCreateCollectionMutation,
  useGetCollectionsByUserQuery,
} from "../../../../app/collections/collections.api-slice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useSendImageMutation } from "../../../../app/image-upload/image-upload.api-slice";
import { transformImageToFormdata } from "../../../../app/image-upload/transform-image-to-formdata";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";
import { useTranslation } from "react-i18next";
import { useErrorSnack } from "../../../../utils/useErrorSnack";
import CollectionNameGroup from "./groups/Collection-name-group";
import CollectionDescriptionGroup from "./groups/Collection-description-group";
import CollectionTopisGroup from "./groups/Collection-topics-group";
import CollectionImageGroup from "./groups/Collection-image-group";
import CollectionCustomGroups from "./groups/custom/Collection-custom-groups";

function CreateCollectionForm() {
  const { t } = useTranslation();
  
  const { ownerName } = useParams();

  const [customInputs, setCustomInputs] = useState([] as string[]);

  const { refetch } = useGetCollectionsByUserQuery(ownerName!);

  const { username, role } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [
    createCollection,
    { isLoading: isCollectionCreateLoading, isError: isCollectionCreateError },
  ] = useCreateCollectionMutation();

  const [
    sendImage,
    { isLoading: isSendImageLoading, isError: isSendImageError },
  ] = useSendImageMutation();

  useErrorSnack(
    Boolean(isSendImageError || isCollectionCreateError),
    "common:server-error"
  );

  const isLoading = isCollectionCreateLoading || isSendImageLoading;

  const methods = useForm<CreateCollectionFormInput>();
  const onSubmit: SubmitHandler<CreateCollectionFormInput> = async (data) => {
    const canSend =
      [data.name, data.description, data.topic].every(Boolean) &&
      !isCollectionCreateLoading &&
      ownerName &&
      username &&
      (role === "admin" || (ownerName === username && role === "user"));
    if (!data.customFields) data.customFields = [];
    if (canSend) {
      const imageUrl = data.image.length
        ? (await sendImage(transformImageToFormdata(data.image["0"])).unwrap())
            .secure_url
        : null;
      const newCollection = {
        ...data,
        image: imageUrl,
        ownerName,
        username,
      };
      await createCollection(newCollection).unwrap();
      dispatch(setCollectionModalVisibility(false));
      refetch();
    }
  };

  const onAddFieldClickHandler = () => {
    setCustomInputs([...customInputs, ""]);
  };

  const onRemoveFieldClickHandler = () => {
    if (!customInputs.length) return;
    const removeIndex = customInputs.length - 1;
    const newCustomInputs = customInputs.slice(0, removeIndex);
    methods.unregister(`customFields.${removeIndex}`);
    setCustomInputs([...newCustomInputs]);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <CollectionNameGroup />
        <CollectionDescriptionGroup />
        <CollectionTopisGroup />
        <CollectionImageGroup />
        {customInputs.length ? (
          <CollectionCustomGroups customInputs={customInputs} />
        ) : null}

        <div className="d-flex gap-2">
          <Button disabled={isLoading} variant={buttonVariant} type="submit">
            {t("collections:create")}
          </Button>
          <Button
            disabled={isLoading}
            variant={buttonVariant}
            type="button"
            onClick={onAddFieldClickHandler}
          >
            {t("collections:add-field")}
          </Button>
          <Button
            disabled={isLoading}
            variant={buttonVariant}
            type="button"
            onClick={onRemoveFieldClickHandler}
          >
            {t("collections:remove-field")}
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}

export default CreateCollectionForm;
