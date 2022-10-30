import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import loginPageDictionaryEn from "./locales/en/login-page.dictionary.json";
import loginPageDictionaryRu from "./locales/ru/login-page.dictionary.json";
import mainPageDictionaryEn from "./locales/en/main-page.dictionary.json";
import mainPageDictionaryRu from "./locales/ru/main-page.dictionary.json";
import collectionsDictionaryEn from "./locales/en/collections.dictionary.json";
import collectionsDictionaryRu from "./locales/ru/collections.dictionary.json";
import headerDictionaryEn from "./locales/en/header.dictionary.json";
import headerDictionaryRu from "./locales/ru/header.dictionary.json";
import adminDictionaryEn from "./locales/en/admin.dictionary.json";
import adminDictionaryRu from "./locales/ru/admin.dictionary.json";

const resources = {
  en: {
    login: loginPageDictionaryEn,
    main: mainPageDictionaryEn,
    collections: collectionsDictionaryEn,
    header: headerDictionaryEn,
    admin: adminDictionaryEn
  },
  ru: {
    login: loginPageDictionaryRu,
    main: mainPageDictionaryRu,
    collections: collectionsDictionaryRu,
    header: headerDictionaryRu,
    admin: adminDictionaryRu

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
