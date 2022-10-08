import styles from "./Set-localization-button.module.css";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function SetLocalizationButton() {
  // const [checked, setChecked] = useState(false);
  const [localRadioValue, setLocalRadioValue] = useState("1");

  const localRadios = [
    { name: "En", value: "1" },
    { name: "Ru", value: "2" },
  ];
  return (
    <>
      <ButtonGroup>
        {localRadios.map((radio, idx) => (
          <ToggleButton
            className={styles.button}
            key={idx}
            id={`local-radio-${idx}`}
            type="radio"
            variant="primary"
            name="local-radio"
            value={radio.value}
            checked={localRadioValue === radio.value}
            onChange={(e) => setLocalRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default SetLocalizationButton;
