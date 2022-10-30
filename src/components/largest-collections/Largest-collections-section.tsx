import { Badge, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetLargestCollectionsQuery } from "../../app/collections/collections.api-slice";
import { badgeVariant } from "../../constants/bootstrap-constants";

function LargestCollectionsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: collections = [] } = useGetLargestCollectionsQuery(5);
  if (!collections || !collections.length) return null;
  return (
    <>
      <h4>{t("main:largest-collections")}</h4>
      <ListGroup as="ol" numbered>
        {collections.map((collection) => (
          <ListGroup.Item
            key={collection.id}
            as="li"
            className="d-flex justify-content-between align-items-start cursor-pointer"
            onClick={() => navigate(`/collections/${collection.ownerName}/${collection.id}`)}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{collection.name}</div>
              {collection.ownerName}
            </div>
            <span className="me-1 pt-1">Items</span>
            <Badge bg={badgeVariant} pill>
              {+collection.itemsCount}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default LargestCollectionsSection;
