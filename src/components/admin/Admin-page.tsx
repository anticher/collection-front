import { Container, Tab, Tabs } from "react-bootstrap";
import AdminUsers from "./Admin-users";

function AdminPage() {
  return (
    <Container>
      <Tabs defaultActiveKey="users" className="mb-3 w-100">
        <Tab eventKey="users" title="Users">
          <AdminUsers />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPage;
