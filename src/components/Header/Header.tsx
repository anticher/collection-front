import styles from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "./buttons/Set-localization-button";
import LoginButton from "./buttons/Login-button";
import RegistrationButton from "./buttons/Registration-button";
import SetThemeButton from "./buttons/Set-theme-button";
import SearchInput from "./inputs/Search-input";
import { useAppSelector } from "../../app/app-hooks";
import LogoutButton from "./buttons/Logout-button";
import { Link } from "react-router-dom";
import RouteButton from "../common/route-button/Route-button";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  const auth = useAppSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <Row className={styles.row}>
        <Col className={`${styles.column} ${styles.logo}`} lg={1} xs={2}>
          <Link className={styles.logoLink} to={"/"}></Link>
        </Col>
        <Col
          className={styles.column}
          lg={{ span: 5, offset: 0 }}
          xs={{ span: 10, offset: 2, order: "last" }}
        >
          <SearchInput />
          {auth.role === "admin" && (
            <RouteButton text={t("admin:admin-menu")} route="/admin-menu" />
          )}
        </Col>
        <Col
          className={`${styles.column} ${styles.buttons}`}
          lg={{ span: 6, offset: 0, order: "last" }}
          xs={{ span: 10, offset: 2 }}
        >
          <SetThemeButton />
          <SetLocalizationButton />
          {auth.username ? (
            <>
              <RouteButton
                text={t("header:home")}
                route={`/collections/${auth.username}`}
              />
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
