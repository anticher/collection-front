import { Container } from "react-bootstrap";
import ItemsByTagSearchResult from "../sections/Items-by-tag-search-result";

function TagSearchResultsPage() {
  return (
    <Container>
      <ItemsByTagSearchResult isDebounce={false}/>
    </Container>
  );
}

export default TagSearchResultsPage;
