import i18n from "i18next";
import { initReactI18next  } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import translationEN from '../src/locales/en/translation.json';
import translationDE from '../src/locales/es/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationDE
  }
};

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;