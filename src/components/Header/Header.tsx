import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "./setLocalizationButton/SetLocalizationButton";
import LoginButton from "./loginButton/LoginButton";
import RegistrationButton from "./registrationButton/RegistrationButton";
import SetThemeButton from "./setThemeButton/SetThemeButton";
import SearchInput from "./searchInput/SearchInput";
import { useAppSelector } from "../../app/hooks";
import LogoutButton from "./logoutButton/LogoutButton";
import MyCollectionsButton from "./my-collections-button/My-collections-button";
import { Link } from "react-router-dom";

function Header() {
  const auth = useAppSelector((state) => state.auth);
  console.log('header')
  console.log(auth)
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
