// import styles from "./Create-collection-item-form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction } from "react";
import { ICollection } from "../../../../models/ICollection";
import { customFieldTypeEnum } from "../../create-collection/enum/custom-field-type.enum";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCollectionItemFormInput } from "../../create-collection/models/create-collection-item-form-input";
import { useCreateCollectionItemMutation } from "../../../../app/api-slices/collection-items.api-slice";
import { useAppSelector } from "../../../../app/hooks";

type CreateCollectionItemFormProps = {
  setCreateModalVisibility: Dispatch<SetStateAction<boolean>>;
  collectionData: ICollection;
  refetch: () => void
};

function CreateCollectionItemForm(props: CreateCollectionItemFormProps) {
  const customFieldsTitles = props.collectionData.customFieldTitles;
  const ownerName = props.collectionData.ownerName

  const auth = useAppSelector((state) => state.auth);
  const creatorName = auth?.username;
  const creatorRole = auth?.role;
  
  const [
    sendCollectionItemCredentials,
    { isLoading: isCollectionItemSendLoading, error },
  ] = useCreateCollectionItemMutation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionItemFormInput>();
  const onSubmit: SubmitHandler<CreateCollectionItemFormInput> = async (
    data
  ) => {
    console.log(data);
    console.log(ownerName)
    console.log(creatorName)
    const canSend =
      [data.name, data.tagNames, !isCollectionItemSendLoading, ownerName, creatorName].every(Boolean) &&
      (creatorRole === "admin" ||
        (ownerName === creatorName && creatorRole === "user"));
    if (canSend) {
      console.log('can send')
      const newCollectionItem = {
        ...data,
        ownerName,
        creatorName,
        collectionId: props.collectionData.id
      }
      console.log(newCollectionItem)
      await sendCollectionItemCredentials(newCollectionItem).unwrap();
      props.setCreateModalVisibility(false)
      props.refetch()
    }
  };

  const createCustomInputs = () => {
    if (!customFieldsTitles || customFieldsTitles.length === 0) {
      return null;
    }
    return customFieldsTitles.map(({ id, fieldName, fieldType }, index) => {
      return (
        <Form.Group className="mb-3" key={id}>
          <Form.Label>{fieldName}</Form.Label>
          <Form.Control
            type={fieldType === customFieldTypeEnum.string ? "text" : "number"}
            placeholder="Enter collection description"
            {...register(`customFields.${id}`, {
              required: true,
            })}
          />
        </Form.Group>
      );
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Item name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection title"
          {...register("name", {
            required: true,
          })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Item tags</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter collection description"
          {...register("tagNames", {
            required: true,
          })}
        />
      </Form.Group>

      {createCustomInputs()}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateCollectionItemForm;
