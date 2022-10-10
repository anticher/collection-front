import styles from "./Create-collection-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CreateCollectionCustomInput from "../create-collection-custom-input/Create-collection-custom-input";
import { CreateCollectionFormInput } from "../models/create-collection-form-input";
import { useGetThemesQuery } from "../../../../app/api-slices/themes.api-slice";
import { useCreateCollectionMutation } from "../../../../app/api-slices/collections.api-slice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";

function CreateCollectionForm() {
  const pathname = useLocation().pathname;
  const ownerName = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [customInputs, setCustomInputs] = useState([] as string[]);
  console.log(ownerName);
  const {
    data: themes = [],
    isLoading: isThemesLoading,
    isSuccess,
    isError,
  } = useGetThemesQuery("");

  const auth = useAppSelector((state) => state.auth);
  const creatorName = auth?.username;
  const creatorRole = auth?.role;

  const [
    sendCollectionCredentials,
    { isLoading: isCollectionSendLoading, error },
  ] = useCreateCollectionMutation();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionFormInput>();
  const onSubmit: SubmitHandler<CreateCollectionFormInput> = async (data) => {
    console.log(data);
    const canSend =
      [data.name, data.description, data.theme, data.image].every(Boolean) &&
      !isThemesLoading &&
      !isCollectionSendLoading &&
      ownerName &&
      creatorName &&
      (creatorRole === "admin" ||
        (ownerName === creatorName && creatorRole === "user"));
    console.log("owner-creator");
    console.log(ownerName);
    console.log(creatorName);
    if (canSend) {
      console.log("can send");
      const newCollection = {
        ...data,
        ownerName,
        creatorName,
      }
      await sendCollectionCredentials(newCollection).unwrap();
      // dispatch(setAuthData(result));
      // navigate(`/collections/${result.username}`);
    }
  };

  const onAddFieldClickHandler = () => {
    setCustomInputs([...customInputs, ""]);
  };

  const onRemoveFieldClickHandler = () => {
    if (!customInputs.length) return;
    const removeIndex = customInputs.length - 1;
    // const newCustomInputs = removeIndex ? customInputs.slice(0, removeIndex) : [];
    const newCustomInputs = customInputs.slice(0, removeIndex);
    unregister(`custom.${removeIndex}`);
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
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Label>Colection image url</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection image url"
          {...register("image", {
            required: true,
          })}
        />
      </Form.Group>

      {customInputs.length ? createCustomInputs() : null}

      {(errors.custom ||
        errors.description ||
        errors.image ||
        errors.theme ||
        errors.name) && <Form.Text>all fields are required</Form.Text>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="primary" type="button" onClick={onAddFieldClickHandler}>
        Add field
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={onRemoveFieldClickHandler}
      >
        Remove field
      </Button>
    </Form>
  );
}

export default CreateCollectionForm;
