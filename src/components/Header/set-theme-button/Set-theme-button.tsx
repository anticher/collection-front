import styles from "./Set-theme-button.module.css";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setTheme } from "../../../app/slices/settings.slice";
import { useBeforeunload } from 'react-beforeunload';

function SetThemeButton() {
  const dispatch = useAppDispatch();
  const appTheme = useAppSelector((state) => state.settings.theme);
  const [themeRadioValue, setThemeRadioValue] = useState(appTheme);

  const themeRadios = [
    { name: "light", value: "light" },
    { name: "dark", value: "dark" },
  ];

  useBeforeunload(() => localStorage.setItem("theme", appTheme))

  const onClickHandler = (e: React.ChangeEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    dispatch(setTheme(target.value));
    setThemeRadioValue(target.value);
  };

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
            onChange={(e) => onClickHandler(e)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default SetThemeButton;
