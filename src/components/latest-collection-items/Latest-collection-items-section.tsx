import { ListGroup } from "react-bootstrap";
import { useGetLatestCollectionItemsQuery } from "../../app/collection-items/collection-items.api-slice";

function LatestCollectionItemsSection() {
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
            className="d-flex justify-content-between align-items-start"
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
