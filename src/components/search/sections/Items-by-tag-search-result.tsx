import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useGetTagByNameQuery } from "../../../app/tags/tags.api-slice";

type ItemsByTagSearchProps = {
  isDebounce: boolean;
};

function ItemsByTagSearchResult({ isDebounce }: ItemsByTagSearchProps) {
  const navigate = useNavigate();
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(
    searchString || "",
    isDebounce ? 500 : 0
  );

  const { data: tag } = useGetTagByNameQuery(debouncedValue);

  return (
    <>
      {tag &&
        tag.collectionItems.map((item) => {
          return (
            <Card key={item.id}>
              <Card.Body
                onClick={() =>
                  navigate(
                    `/collections/${item.ownerName}/${item.collectionId}/${item.id}`
                  )
                }
              >
                {item.name}
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}

export default ItemsByTagSearchResult;
