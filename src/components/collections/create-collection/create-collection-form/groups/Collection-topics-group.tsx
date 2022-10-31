import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetTopicsQuery } from "../../../../../app/topics/topics.api-slice";

function CollectionTopisGroup() {
  const { t } = useTranslation();

  const { register } = useFormContext();

  const {
    data: topics = [],
  } = useGetTopicsQuery();

  return (
    <Form.Group className="mb-3">
      <Form.Label> {t("collections:collection-topic")}</Form.Label>
      <Form.Select
        className="mb-3"
        aria-label="Collection topic select"
        {...register("topic", {
          required: true,
        })}
      >
        <option value="">{t("collections:choose-collection-topic")}</option>
        {topics.length
          ? topics.map((topic) => {
              return (
                <option key={topic.id} value={topic.name}>
                  {topic.name}
                </option>
              );
            })
          : null}
      </Form.Select>
    </Form.Group>
  );
}

export default CollectionTopisGroup;
