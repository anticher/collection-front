import { Container } from "react-bootstrap";
import ItemsByTagSearch from "./Items-by-tag-search";
import SearchCollections from "./Search-collections";
import SearchComments from "./Search-comments";
import SearchItems from "./Search-items";

function SearchResultsPage() {
  return (
    <Container>
      <SearchItems />
      <hr></hr>
      <SearchCollections />
      <hr></hr>
      <SearchComments />
      <hr></hr>
      <ItemsByTagSearch />
    </Container>
  );
}

export default SearchResultsPage;
