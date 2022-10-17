import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import russian from './translations/russian.json';
import english from './translations/english.json';

const resources = {
    EN: {
        translation: english,
    },
    RU: {
        translation: russian,
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        //TODO: need to load from localStorage
        lng: "EN",
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;