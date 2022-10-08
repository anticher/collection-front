import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import loginComponentDictionaryEn from "./locales/en/login-component.dictionary.json";
import headerComponentDictionaryEn from "./locales/en/header-component.dictionary.json";
import headerComponentDictionaryRu from "./locales/ru/header-component.dictionary.json";
import loginComponentDictionaryRu from "./locales/ru/login-component.dictionary.json";

const resources = {
  en: {
    login: loginComponentDictionaryEn,
    header: headerComponentDictionaryEn
  },
  ru: {
    login: loginComponentDictionaryRu,
    header: headerComponentDictionaryRu
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
