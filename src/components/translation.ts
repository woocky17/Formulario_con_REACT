import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/cuestionario-en.json";
import es from "../assets/cuestionario-es.json";

// Definir las traducciones
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma predeterminado
  fallbackLng: "en", // Idioma de reserva
});

export default i18n;
