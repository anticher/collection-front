import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useSearchCollectionQuery } from "../../../app/collections/collections.api-slice";

function CollectionsSearchResult() {
  const navigate = useNavigate();
  const { searchString } = useParams();

  const debouncedValue = useDebounce<string>(searchString || "", 500);
  const { data: searchCollectionResult } =
    useSearchCollectionQuery(debouncedValue);

  return (
    <>
      {searchCollectionResult && searchCollectionResult.length
        ? searchCollectionResult.map((collection) => {
            return (
              <Card key={collection.id}>
                <Card.Body
                  onClick={() =>
                    navigate(
                      `/collections/${collection.ownerName}/${collection.id}`
                    )
                  }
                >
                  {collection.name}
                </Card.Body>
              </Card>
            );
          })
        : null}
    </>
  );
}

export default CollectionsSearchResult;
