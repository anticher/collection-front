import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import ItemTagMultiSelect from "./Tag-multi-select";
import { useGetTagsQuery } from "../../../../../../app/tags/tags.api-slice";


function ItemTagsGroup() {
  const { t } = useTranslation();

  const { register, setValue } = useFormContext();

  const { data: tags = [] } = useGetTagsQuery();
  const options = tags.length
    ? tags.map((tag) => {
        return { value: tag.name, label: tag.name };
      })
    : [];

  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const selectRef = useRef(null);

  return (
    <>
      <Form.Group style={{ height: "0", margin: "0", overflow: "hidden" }}>
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
        <Form.Label>{t("collections:item-tags")}</Form.Label>
        <ItemTagMultiSelect
          selectRef={selectRef}
          options={options}
          setValue={(newSelectedOption: string[]) =>
            setValue("tagNames", newSelectedOption)
          }
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Form.Group>
    </>
  );
}

export default ItemTagsGroup;
