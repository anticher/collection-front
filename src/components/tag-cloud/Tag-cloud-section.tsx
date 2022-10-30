import styles from "./Tag-cloud-section.module.css";
import { TagCloud } from "react-tagcloud";
import { useGetTagsQuery } from "../../app/tags/tags.api-slice";
import { useNavigate } from "react-router-dom";

type Tag = {
  value: string;
  key: string;
};

const options = {
  luminosity: "light",
  hue: "purple",
};

function TagCloudSection() {
  const navigate = useNavigate();

  const { data: tags = [] } = useGetTagsQuery();

  const data = tags.map((tag) => ({
    value: tag.name,
    key: tag.id,
  }));

  return (
    <>
      {tags && tags.length ? (
        <TagCloud
          className={styles.tagCloud}
          minSize={24}
          maxSize={24}
          colorOptions={options}
          tags={data}
          onClick={(tag: Tag) => navigate("/search-by-tag/" + tag.value)}
        />
      ) : null}
    </>
  );
}

export default TagCloudSection;
