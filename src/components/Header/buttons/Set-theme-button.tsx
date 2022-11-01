import { useState, ChangeEvent } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setTheme } from "../../../app/settings/settings.slice";
import { useBeforeunload } from "react-beforeunload";
import { buttonOutlineVariant } from "../../../constants/bootstrap-constants";
import { moonChar, sunChar } from "../../../constants/char-code-constants";

function SetThemeButton() {
  const dispatch = useAppDispatch();
  const appTheme = useAppSelector((state) => state.settings.theme);
  const [themeRadioValue, setThemeRadioValue] = useState(appTheme);

  const themeRadios = [
    { name: sunChar, value: "light" },
    { name: moonChar, value: "dark" },
  ];

  useBeforeunload(() => localStorage.setItem("theme", appTheme));

  const onClickHandler = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    dispatch(setTheme(target.value));
    setThemeRadioValue(target.value);
  };

  return (
    <ButtonGroup>
      {themeRadios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`theme-radio-${idx}`}
          type="radio"
          variant={buttonOutlineVariant}
          name="theme-radio"
          value={radio.value}
          checked={themeRadioValue === radio.value}
          onChange={(e) => onClickHandler(e)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default SetThemeButton;
