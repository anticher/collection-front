import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type CustomStringGroupProps = {
  id: string;
  fieldName: string;
};

function CustomStringGroup({ id, fieldName }: CustomStringGroupProps) {
  const { register } = useFormContext();

  return (
    <InputGroup key={id} className="mb-3">
      <Form.Control disabled value={fieldName} />
      <Form.Control
        type="text"
        autoComplete="off"
        {...register(`customFields.${id}`, {})}
      />
    </InputGroup>
  );
}

export default CustomStringGroup;
