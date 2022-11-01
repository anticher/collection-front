import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const changeHandle = (e: ChangeEvent) => {
    const eventValue = (e.target as HTMLInputElement).value;
    setValue(eventValue);
    if (eventValue) {
      navigate("/search/" + eventValue);
    }
  };

  return (
    <Form.Control
      placeholder={t("header:search")}
      aria-label="Search"
      value={pathname.startsWith("/search/") ? value : ""}
      onChange={(e) => changeHandle(e)}
    />
  );
}

export default SearchInput;
