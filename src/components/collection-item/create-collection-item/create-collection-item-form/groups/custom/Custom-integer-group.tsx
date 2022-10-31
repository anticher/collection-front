import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type CustomIntegerGroupProps = {
    id: string;
    fieldName: string;
}

function CustomIntegerGroup({id, fieldName}: CustomIntegerGroupProps) {
  const { register } = useFormContext();

  return (
    <InputGroup key={id} className="mb-3">
      <Form.Control disabled value={fieldName} />
      <Form.Control
        type="number"
        autoComplete="off"
        {...register(`customFields.${id}`, {})}
      />
    </InputGroup>
  );
}

export default CustomIntegerGroup;
