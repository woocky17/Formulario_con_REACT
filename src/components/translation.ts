import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/cuestionario-en.json";
import es from "../assets/cuestionario-es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en[0].globals || {},
    },
    es: {
      translation: es[0].globals || {},
    },
  },
  lng: "es", // Idioma predeterminado
  fallbackLng: "en", // Idioma de reserva
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
