import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "./set-localization-button/Set-localization-button";
import LoginButton from "./login-button/Login-button";
import RegistrationButton from "./registration-button/Registration-button";
import SetThemeButton from "./set-theme-button/Set-theme-button";
import SearchInput from "./search-input/Search-input";
import { useAppSelector } from "../../app/hooks";
import LogoutButton from "./logout-button/Logout-button";
import MyCollectionsButton from "./my-collections-button/My-collections-button";
import { Link } from "react-router-dom";

function Header() {
  const username = useAppSelector((state) => state.auth.username);
  return (
    <header className={styles.header}>
      <Row className={styles.row}>
        <Col className={`${styles.column} ${styles.logo}`} md={1}><Link className={styles.logoLink} to={"/"}></Link></Col>
        <Col className={styles.column} md={5}>
          <SearchInput />
        </Col>
        <Col className={`${styles.column} ${styles.buttons}`} md={6}>
          <SetThemeButton />
          <SetLocalizationButton />
          {username ? (
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
