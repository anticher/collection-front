import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ItemsByTagSearchResult from "../sections/Items-by-tag-search-result";

function TagSearchResultsPage() {
  const { searchString } = useParams();
  
  return (
    <Container>
      <h3>Items with {searchString} tag</h3>
      <ItemsByTagSearchResult isDebounce={false} isVoid={false}/>
    </Container>
  );
}

export default TagSearchResultsPage;
