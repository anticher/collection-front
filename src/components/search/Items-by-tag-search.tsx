import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useGetTagByNameQuery } from "../../app/tags/tags.api-slice";


function ItemsByTagSearch() {
  const navigate = useNavigate();
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);

  const { data: tag } = useGetTagByNameQuery(debouncedValue);


  return (
    <>
      {tag
        ? tag.collectionItems.map((item) => {
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
          })
        : null}
    </>
  );
}

export default ItemsByTagSearch;
