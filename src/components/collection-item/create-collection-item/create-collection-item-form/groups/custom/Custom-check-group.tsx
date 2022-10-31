import styles from "./Custom-check-group.module.css";
import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type CustomCheckGroupProps = {
  id: string;
  fieldName: string;
};

function CustomCheckGroup({ id, fieldName }: CustomCheckGroupProps) {
  const { register } = useFormContext();

  return (
    <InputGroup key={id} className="mb-3">
      <Form.Control defaultValue={fieldName} disabled />
      <div className={styles.checkWrapper}>
        <Form.Check type="checkbox" {...register(`customFields.${id}`, {})} />
      </div>
    </InputGroup>
  );
}

export default CustomCheckGroup;
