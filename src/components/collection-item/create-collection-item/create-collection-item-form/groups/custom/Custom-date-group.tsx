import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type CustomDateGroupProps = {
  id: string;
  fieldName: string;
};

function CustomDateGroup({ id, fieldName }: CustomDateGroupProps) {
  const { register } = useFormContext();

  return (
    <InputGroup key={id} className="mb-3">
      <Form.Control disabled value={fieldName} />
      <Form.Control
        type="date"
        autoComplete="off"
        {...register(`customFields.${id}`, {})}
      />
    </InputGroup>
  );
}

export default CustomDateGroup;
