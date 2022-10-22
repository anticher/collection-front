import styles from "./Create-collection-item-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ICollection } from "../../../../../models/ICollection";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCollectionItemFormInput } from "../../../../collections/create-collection/models/create-collection-item-form-input";
import { useCreateCollectionItemMutation } from "../../../../../app/collection-items/collection-items.api-slice";

import CustomMultiSelect from "../../../../common/custom-select/Custom-multi-select";
import { useGetCredentialsForCreate } from "../../../../../app/hooks/use-get-creadentials-for-create";
import { createCustomInputs } from "./create-custom-inputs";
import { checkItemCreateData } from "./check-item-create-data";
import { useGetTagsQuery } from "../../../../../app/tags/tags.api-slice";
import { ICollectionItemCreate } from "../../../../../models/ICollectionItemCreate";
import { transformImageToFormdata } from "../../../../../app/image-upload/transform-image-to-formdata";
import { useSendImageMutation } from "../../../../../app/image-upload/image-upload.api-slice";
import { InputGroup } from "react-bootstrap";

type CreateCollectionItemFormProps = {
  setCreateModalVisibility: Dispatch<SetStateAction<boolean>>;
  collectionData: ICollection;
  refetch: () => void;
};

function CreateCollectionItemForm({
  collectionData,
  setCreateModalVisibility,
  refetch,
}: CreateCollectionItemFormProps) {
  const [
    sendCollectionItemCredentials,
    { isLoading: isCollectionItemSendLoading },
  ] = useCreateCollectionItemMutation();

  const { data: tags = [], isLoading } = useGetTagsQuery("");
  const options = tags.length
    ? tags.map((tag) => {
        return { value: tag.name, label: tag.name };
      })
    : [];

  const customFieldsTitles = collectionData.customFieldTitles;
  const ownerName = collectionData.ownerName;
  const [username, creatorRole] = useGetCredentialsForCreate();

  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const selectRef = useRef(null);

  const [sendImage] = useSendImageMutation();

  const { register, handleSubmit, setValue } =
    useForm<CreateCollectionItemFormInput>();

  const onSubmit: SubmitHandler<CreateCollectionItemFormInput> = async (
    data
  ) => {
    const newCollectionItem: ICollectionItemCreate = {
      ...data,
      image: null,
      tagNames: data.tagNames.join(","),
      ownerName,
      username,
      collectionId: collectionData.id,
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
      setCreateModalVisibility(false);
      refetch();
    }
  };

  const content = !isLoading ? (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Item name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection title"
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
        <Form.Label>Item tags</Form.Label>
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
        <Form.Label>Collection image</Form.Label>
        <Form.Control type="file" {...register("image")} />
      </Form.Group>

      {createCustomInputs({ customFieldsTitles, register })}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  ) : (
    <Form></Form>
  );

  return content;
}

export default CreateCollectionItemForm;
