import { Container } from "react-bootstrap";
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
    </Container>
  );
}

export default SearchResultsPage;
