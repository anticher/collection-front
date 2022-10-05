import React, { useState } from "react";
import styles from "./styles.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SetLocalizationButton from "../SetLocalizationButton/SetLocalizationButton";
import LoginButton from "../LoginButton/LoginButton";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
import SetThemeButton from "../SetThemeButton/SetThemeButton";
import SearchInput from "../SearchInput/SearchInput";

function Header() {
  return (
    <header className={styles.header}>
      {/* <Container className={styles.container}> */}
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
      {/* </Container> */}
    </header>
  );
}

export default Header;
