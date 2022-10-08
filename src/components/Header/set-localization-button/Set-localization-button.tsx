import styles from "./Set-localization-button.module.css";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useTranslation } from 'react-i18next'
import { setLocalization } from "../../../app/slices/settings.slice";
import { useBeforeunload } from 'react-beforeunload';

function SetLocalizationButton() {
  const dispatch = useAppDispatch();
  const appLocalization = useAppSelector((state) => state.settings.localization);
  const { i18n } = useTranslation()
  const [localRadioValue, setLocalRadioValue] = useState(appLocalization);
  
  const localRadios = [
    { name: "en", value: "en" },
    { name: "ru", value: "ru" },
  ];

  useBeforeunload(() => localStorage.setItem("localization", appLocalization))

  const onClickHandler = (e: React.ChangeEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    i18n.changeLanguage(target.value)
    dispatch(setLocalization(target.value));
    setLocalRadioValue(target.value);
  };

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
