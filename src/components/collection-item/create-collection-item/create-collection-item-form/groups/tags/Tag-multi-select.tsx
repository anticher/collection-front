import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Select, { OnChangeValue } from "react-select";
import { IOption } from "../../../../../../app/models/tag/option.model";

type ItemTagMultiSelectProps = {
  selectRef: MutableRefObject<null>;
  options: { value: string; label: string }[];
  setValue: (newSelectedOption: string[]) => void;
  selectedOption: string[];
  setSelectedOption: Dispatch<SetStateAction<string[]>>;
};

function ItemTagMultiSelect(props: ItemTagMultiSelectProps) {
  const { t } = useTranslation();
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
        placeholder={t("collections:enter-item-tags")}
        isMulti
      />
    </>
  );
}

export default ItemTagMultiSelect;
