import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { setLocalization } from "../../../app/settings/settings.slice";
import { useBeforeunload } from 'react-beforeunload';
import { buttonOutlineVariant } from "../../../constants/bootstrap-constants";

function SetLocalizationButton() {
  const dispatch = useAppDispatch();
  const appLocalization = useAppSelector((state) => state.settings.localization);
  const [localRadioValue, setLocalRadioValue] = useState(appLocalization);
  
  const localRadios = [
    { name: "en", value: "en" },
    { name: "рус", value: "ru" },
  ];

  useBeforeunload(() => localStorage.setItem("localization", appLocalization))

  const onClickHandler = (e: React.ChangeEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    dispatch(setLocalization(target.value));
    setLocalRadioValue(target.value);
  };

  return (
    <>
      <ButtonGroup>
        {localRadios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`local-radio-${idx}`}
            type="radio"
            variant={buttonOutlineVariant}
            name="local-radio"
            value={radio.value}
            checked={localRadioValue === radio.value}
            onChange={(e) => onClickHandler(e)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default SetLocalizationButton;
