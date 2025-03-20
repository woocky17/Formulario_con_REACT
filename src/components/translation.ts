import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/cuestionario-en.json";
import es from "../assets/cuestionario-es.json";

const resources = {
  en: {
    translation: en[0],
  },
  es: {
    translation: es[0],
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma predeterminado
  fallbackLng: "en", // Idioma de reserva
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
