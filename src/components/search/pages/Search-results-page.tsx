import { Container } from "react-bootstrap";
import CollectionsSearchResult from "../sections/Collections-search-result";
import CommentsSearchResult from "../sections/Comments-search-result";
import ItemsByTagSearchResult from "../sections/Items-by-tag-search-result";
import ItemsSearchResult from "../sections/Items-search-result";

function SearchResultsPage() {
  return (
    <Container>
      <h3>Search results</h3>
      <ItemsSearchResult />
      <ItemsByTagSearchResult isDebounce={true} />
      <CollectionsSearchResult />
      <CommentsSearchResult />
    </Container>
  );
}

export default SearchResultsPage;
