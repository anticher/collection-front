import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "./setLocalizationButton/SetLocalizationButton";
import LoginButton from "./loginButton/LoginButton";
import RegistrationButton from "./registrationButton/RegistrationButton";
import SetThemeButton from "./setThemeButton/SetThemeButton";
import SearchInput from "./searchInput/SearchInput";

function Header() {
  return (
    <header className={styles.header}>
      <Row className={styles.row}>
        <Col className={`${styles.column} ${styles.logo}`} md={1}></Col>
        <Col className={styles.column} md={5}>
          <SearchInput />
        </Col>
        <Col className={`${styles.column} ${styles.buttons}`} md={6}>
          <SetThemeButton />
          <SetLocalizationButton />
          <RegistrationButton />
          <LoginButton />
        </Col>
      </Row>
    </header>
  );
}

export default Header;
