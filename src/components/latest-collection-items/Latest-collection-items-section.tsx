import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetLatestCollectionItemsQuery } from "../../app/collection-items/collection-items.api-slice";

function LatestCollectionItemsSection() {
  const navigate = useNavigate();
  const { data: items = [] } = useGetLatestCollectionItemsQuery(5);
  if (!items || !items.length) return null;
  return (
    <>
      <h4>Latest items</h4>
      <ListGroup as="ol" numbered>
        {items.map((item) => (
          <ListGroup.Item
            key={item.id}
            as="li"
            className="d-flex justify-content-between align-items-start cursor-pointer"
            onClick={() => navigate(`/collections/${item.ownerName}/${item.collectionId}/${item.id}`)}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.ownerName}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default LatestCollectionItemsSection;
