import { Container, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UsersTab from "./users-tab/Users-tab";

function AdminPage() {
  const { t } = useTranslation();
  
  return (
    <Container>
      <Tabs defaultActiveKey="users" className="mb-3 w-100">
        <Tab eventKey="users" title={t("admin:users")}>
          <UsersTab />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPage;
