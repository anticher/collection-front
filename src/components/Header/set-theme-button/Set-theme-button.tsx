import styles from "./Set-theme-button.module.css";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function SetThemeButton() {
  // const [checked, setChecked] = useState(false);
  const [themeRadioValue, setThemeRadioValue] = useState("1");

  const themeRadios = [
    { name: "light", value: "1" },
    { name: "dark", value: "2" },
  ];
  return (
    <>
      <ButtonGroup>
        {themeRadios.map((radio, idx) => (
          <ToggleButton
            className={styles.button}
            key={idx}
            id={`theme-radio-${idx}`}
            type="radio"
            variant="primary"
            name="theme-radio"
            value={radio.value}
            checked={themeRadioValue === radio.value}
            onChange={(e) => setThemeRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default SetThemeButton;
