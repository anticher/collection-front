import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type CustomTextGroupProps = {
  id: string;
  fieldName: string;
};

function CustomTextGroup({ id, fieldName }: CustomTextGroupProps) {
  const { register } = useFormContext();

  return (
    <InputGroup key={id} className="mb-3">
    <Form.Control disabled value={fieldName} />
    <Form.Control
      as="textarea"
      rows={1}
      autoComplete="off"
      {...register(`customFields.${id}`, {})}
    />
  </InputGroup>
  );
}

export default CustomTextGroup;
