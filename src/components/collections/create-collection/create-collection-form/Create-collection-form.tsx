import styles from "./Create-collection-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CreateCollectionCustomInput from "../create-collection-custom-input/Create-collection-custom-input";
import { CreateCollectionFormInput } from "../models/create-collection-form-input";
import { useGetThemesQuery } from "../../../../app/themes/themes.api-slice";
import {
  useCreateCollectionMutation,
  useGetCollectionsByUserQuery,
} from "../../../../app/collections/collections.api-slice";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hooks";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useSendImageMutation } from "../../../../app/image-upload/image-upload.api-slice";
import { transformImageToFormdata } from "../../../../app/image-upload/transform-image-to-formdata";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";
import { useSnackbar } from "notistack";

function CreateCollectionForm() {
  const pathname = useLocation().pathname;
  const ownerName = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [customInputs, setCustomInputs] = useState([] as string[]);

  const {
    data: themes = [],
    isLoading: isThemesLoading,
    isError: isThemesError,
  } = useGetThemesQuery("");

  const { refetch } = useGetCollectionsByUserQuery(ownerName);

  const auth = useAppSelector((state) => state.auth);
  const username = auth?.username;
  const creatorRole = auth?.role;

  const dispatch = useAppDispatch();

  const [
    createCollection,
    { isLoading: isCollectionCreateLoading, isError: isCollectionCreateError },
  ] = useCreateCollectionMutation();

  const [sendImage, { isLoading: isSendImageLoading, isError: isSendImageError }] = useSendImageMutation();


  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isThemesError || isSendImageError || isCollectionCreateError) {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  }, [enqueueSnackbar, isThemesError, isCollectionCreateError, isSendImageError]);

  const isLoading = isCollectionCreateLoading || isSendImageLoading || isThemesLoading;

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionFormInput>();
  const onSubmit: SubmitHandler<CreateCollectionFormInput> = async (data) => {
    const canSend =
      [data.name, data.description, data.theme].every(Boolean) &&
      !isThemesLoading &&
      !isCollectionCreateLoading &&
      ownerName &&
      username &&
      (creatorRole === "admin" ||
        (ownerName === username && creatorRole === "user"));
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
    unregister(`customFields.${removeIndex}`);
    setCustomInputs([...newCustomInputs]);
  };

  const createCustomInputs = () => {
    return customInputs.map((customInput, index) => {
      return (
        <CreateCollectionCustomInput
          key={index}
          index={index}
          register={register}
          errors={errors}
        />
      );
    });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Colection title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection title"
          {...register("name", {
            required: true,
          })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Colection description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          placeholder="Enter collection description"
          {...register("description", {
            required: true,
          })}
        />
      </Form.Group>

      {isThemesLoading ? (
        "loading"
      ) : (
        <Form.Group className="mb-3">
          <Form.Label>Colection theme</Form.Label>
          <Form.Select
            className="mb-3"
            aria-label="Collection theme select"
            {...register("theme", {
              required: true,
            })}
          >
            <option value="">Choose collection theme</option>
            {themes.length
              ? themes.map((theme) => {
                  return (
                    <option key={theme.id} value={theme.name}>
                      {theme.name}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Collection image</Form.Label>
        <Form.Control type="file" {...register("image")} />
      </Form.Group>

      {customInputs.length ? createCustomInputs() : null}

      {(errors.customFields ||
        errors.description ||
        errors.image ||
        errors.theme ||
        errors.name) && <Form.Text>all fields are required</Form.Text>}

      <div className={styles.buttons}>
        <Button
          disabled={isLoading}
          variant={buttonVariant}
          type="submit"
        >
          Submit
        </Button>
        <Button
          disabled={isLoading}
          variant={buttonVariant}
          type="button"
          onClick={onAddFieldClickHandler}
        >
          Add field
        </Button>
        <Button
          disabled={isLoading}
          variant={buttonVariant}
          type="button"
          onClick={onRemoveFieldClickHandler}
        >
          Remove field
        </Button>
      </div>
    </Form>
  );
}

export default CreateCollectionForm;
