import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import { useSettings } from "./contexts/settings-context";

const resources = {
    en: {
        translation: en
    },
    pl: {
        translation: pl
    }
};

function Translations18() {
    const { settings } = useSettings();
    i18n.use(initReactI18next).init({
        resources,
        lng: settings?.language == "" ? "en" : settings?.language == 1 ? "en" : "pl",
        fallbackLng: settings?.language == "" ? "en" : settings?.language == 1 ? "en" : "pl",
        compatibilityJSON: "v3",
        interpolation: {
            escapeValue: false
        }
    });
}

export default Translations18;
