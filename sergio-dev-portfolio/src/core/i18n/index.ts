import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'es-ES',
    fallbackLng: 'es-ES',
    supportedLngs: ['es-ES', 'en-GB'],
    backend: {
      loadPath: '/src/assets/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
