import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "./set-localization-button/Set-localization-button";
import LoginButton from "./login-button/Login-button";
import RegistrationButton from "./registration-button/Registration-button";
import SetTopicButton from "./set-topic-button/Set-topic-button";
import SearchInput from "./search-input/Search-input";
import { useAppSelector } from "../../app/app-hooks";
import LogoutButton from "./logout-button/Logout-button";
import MyCollectionsButton from "./my-collections-button/My-collections-button";
import { Link } from "react-router-dom";
import RouteButton from "../common/route-button/Route-button";

function Header() {
  const auth = useAppSelector((state) => state.auth);
  return (
    <header className={styles.header}>
      <Row className={styles.row}>
        <Col className={`${styles.column} ${styles.logo}`} lg={1} xs={2}><Link className={styles.logoLink} to={"/"}></Link></Col>
        <Col className={styles.column} lg={{ span: 5, offset: 0 }} xs={{ span: 10, offset: 2, order: 'last' }}>
          <SearchInput />
          {auth.role === 'admin' && <RouteButton text="Admin" route="/admin-menu"/>}
        </Col>
        <Col className={`${styles.column} ${styles.buttons}`} lg={{ span: 6, offset: 0, order: 'last'}} xs={{ span: 10, offset: 2 }}>
          <SetTopicButton />
          <SetLocalizationButton />
          {auth.username ? (
            <>
              <MyCollectionsButton />
              <LogoutButton />
            </>
          ) : (
            <>
              <RegistrationButton />
              <LoginButton />
            </>
          )}
        </Col>
      </Row>
    </header>
  );
}

export default Header;
