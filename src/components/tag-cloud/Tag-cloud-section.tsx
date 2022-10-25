import styles from "./Tag-cloud-section.module.css";
import { TagCloud } from "react-tagcloud";
import { useGetTagsQuery } from "../../app/tags/tags.api-slice";
import randomInteger from "random-int";
import { useNavigate } from "react-router-dom";

type Tag = {
  value: string;
  count: number;
  key: string;
};

const min = 14;
const max = 20;

const options = {
  luminosity: "bright",
  hue: "purple",
};

function TagCloudSection() {
  const navigate = useNavigate();
  const { data: tags = [] } = useGetTagsQuery();  

  const data = tags.map((tag) => ({
    value: tag.name,
    count: randomInteger(min, max),
    key: tag.id,
  }));

  return (
    <>
      {tags && tags.length ? (
        <TagCloud
          className={styles.tagCloud}
          minSize={14}
          maxSize={20}
          colorOptions={options}
          shuffle={true}
          tags={data}
          onClick={(tag: Tag) => navigate("/search-by-tag/" + tag.value)}
        />
      ) : null}
    </>
  );
}

export default TagCloudSection;
