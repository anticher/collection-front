import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import loginComponentDictionaryEn from "./locales/en/loginComponentDictionary.json";
import loginComponentDictionaryRu from "./locales/ru/loginComponentDictionary.json";

const resources = {
  en: {
    login: loginComponentDictionaryEn,
  },
  ru: {
    login: loginComponentDictionaryRu,
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
