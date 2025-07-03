import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './i18n/fr.json';
import en from './i18n/en.json';
import de from './i18n/de.json';
import es from './i18n/es.json';
import ko from './i18n/ko.json';
import pt from './i18n/pt.json';
import zh from './i18n/zh.json';
import ru from './i18n/ru.json';


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            fr: { translation: fr },
            en: { translation: en },
            de: { translation: de },
            es: { translation: es },
            ko: { translation: ko },
            pt: { translation: pt },
            zh: { translation: zh },
            ru: { translation: ru }
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
