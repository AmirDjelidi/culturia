import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import axios from 'axios';
import i18n from './i18n';

async function initializeApp() {
    try {
        const storedLang = localStorage.getItem('langue');

        const res = await axios.get('https://culturia.onrender.com/api/langue');
        const lang = res.data.langue || storedLang || 'en';
        await i18n.changeLanguage(lang);

    } catch (e) {
        console.error("Erreur chargement langue :", e);
        await i18n.changeLanguage('en'); // fallback
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

initializeApp();
