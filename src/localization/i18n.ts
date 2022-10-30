import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import authDictionaryEn from "./locales/en/auth.dictionary.json";
import authDictionaryRu from "./locales/ru/auth.dictionary.json";
import mainPageDictionaryEn from "./locales/en/main-page.dictionary.json";
import mainPageDictionaryRu from "./locales/ru/main-page.dictionary.json";
import collectionsDictionaryEn from "./locales/en/collections.dictionary.json";
import collectionsDictionaryRu from "./locales/ru/collections.dictionary.json";
import headerDictionaryEn from "./locales/en/header.dictionary.json";
import headerDictionaryRu from "./locales/ru/header.dictionary.json";
import adminDictionaryEn from "./locales/en/admin.dictionary.json";
import adminDictionaryRu from "./locales/ru/admin.dictionary.json";
import commonDictionaryEn from "./locales/en/common.dictionary.json";
import commonDictionaryRu from "./locales/ru/common.dictionary.json";

const resources = {
  en: {
    auth: authDictionaryEn,
    main: mainPageDictionaryEn,
    collections: collectionsDictionaryEn,
    header: headerDictionaryEn,
    admin: adminDictionaryEn,
    common: commonDictionaryEn,
  },
  ru: {
    auth: authDictionaryRu,
    main: mainPageDictionaryRu,
    collections: collectionsDictionaryRu,
    header: headerDictionaryRu,
    admin: adminDictionaryRu,
    common: commonDictionaryRu,
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
