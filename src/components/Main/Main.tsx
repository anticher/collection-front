// import styles from "./Main.module.css";

import { Container, Row, Col } from "react-bootstrap";
import LargestCollectionsSection from "../largest-collections/Largest-collections-section";
import LatestCollectionItemsSection from "../latest-collection-items/Latest-collection-items-section";
import TagCloudSection from "../tag-cloud/Tag-cloud-section";

function Main() {
  return (
    <Container>
      <Row>
        <Col className="px-1 mb-3" lg={6}>
          <LatestCollectionItemsSection />
        </Col>
        <Col className="px-1 mb-3" lg={6}>
          <LargestCollectionsSection />
        </Col>
      </Row>
      <Row>
        <Col>
          <TagCloudSection />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
