// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import es from '../locales/es/translation.json';

// Definir las traducciones
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',  // Idioma predeterminado
  fallbackLng: 'en', // Idioma de reserva
  interpolation: {
    escapeValue: false,  // No es necesario escapar los valores
  },
});

export default i18n;
