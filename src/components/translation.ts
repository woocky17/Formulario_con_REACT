import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/cuestionario-en.json";
import es from "../assets/cuestionario-es.json";


/**
 * 📌 Configuración de `i18n`
 * Inicializa la internacionalización en la aplicación utilizando `react-i18next`.
 * - Carga los archivos de traducción desde `cuestionario-en.json` y `cuestionario-es.json`.
 * - Establece el idioma predeterminado en español (`es`).
 * - Define un idioma de reserva (`en`) en caso de que una traducción no esté disponible.
 */
i18n.use(initReactI18next).init({
  resources: {
    en: {
      // 📌 Carga las traducciones en inglés desde el primer elemento del array `cuestionario-en.json`.
      // Si `globals` no existe en el archivo, se asigna un objeto vacío para evitar errores.
      translation: en[0].globals || {},
    },
    es: {
       // 📌 Carga las traducciones en español desde el primer elemento del array `cuestionario-es.json`.
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
