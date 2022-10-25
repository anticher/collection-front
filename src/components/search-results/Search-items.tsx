import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchCollectionItemQuery } from "../../app/collection-items/collection-items.api-slice";
import { useDebounce } from "usehooks-ts";


function SearchItems() {
  const navigate = useNavigate();
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchItemResult } =
    useSearchCollectionItemQuery(debouncedValue);

  return (
    <>
      {searchItemResult && searchItemResult.length
        ? searchItemResult.map((item) => {
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

export default SearchItems;
