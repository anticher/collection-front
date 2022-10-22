import { Dispatch, MutableRefObject, SetStateAction } from "react";
import Select, { OnChangeValue } from "react-select";
import { IOption } from "../../../models/IOption";

type CustomMultiSelectProps = {
  selectRef: MutableRefObject<null>;
  options: { value: string; label: string }[];
  setValue: (newSelectedOption: string[]) => void;
  selectedOption: string[];
  setSelectedOption: Dispatch<SetStateAction<string[]>>;
};

function CustomMultiSelect(props: CustomMultiSelectProps) {
  const getValue = () => {
    return props.selectedOption
      ? props.options.filter(
          (option) => props.selectedOption.indexOf(option.value) >= 0
        )
      : [];
  };

  const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
    const newSelectedOption = (newValue as IOption[]).map(
      (option) => option.value
    );
    props.setSelectedOption(newSelectedOption);
    props.setValue(newSelectedOption);
  };
  return (
    <>
      <Select
        ref={props.selectRef}
        classNamePrefix="custom-select"
        value={getValue()}
        onChange={onChange}
        options={props.options}
        placeholder="Enter collection tags"
        isMulti
      />
    </>
  );
}

export default CustomMultiSelect;
