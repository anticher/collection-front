import { Container } from "react-bootstrap";
import CollectionsSearchResult from "../sections/Collections-search-result";
import CommentsSearchResult from "../sections/Comments-search-result";
import ItemsByTagSearchResult from "../sections/Items-by-tag-search-result";
import ItemsSearchResult from "../sections/Items-search-result";

function SearchResultsPage() {
  return (
    <Container>
      <ItemsSearchResult />
      <hr></hr>
      <CollectionsSearchResult />
      <hr></hr>
      <CommentsSearchResult />
      <hr></hr>
      <ItemsByTagSearchResult isDebounce={true} />
    </Container>
  );
}

export default SearchResultsPage;
