import React from 'react';
import './Tutorial.css';
import {useTranslation} from "react-i18next";

function Tutorial() {
    const { t, i18n } = useTranslation();
  return (
    <div className="tutorial-container">
      <h2 className="tutorial-title">{t('tutorial.tutoriel')}</h2>
      <ol className="tutorial-list">
        <li>{t('tutorial.li1')}</li>
        <li>
            {t('tutorial.li2')}
          <span className="scanner-icon"> ☐ </span>
        </li>
        <li>{t('tutorial.li3')}</li>
      </ol>
      <p className="tutorial-end">Bonne culture !</p>
    </div>
  );
}

export default Tutorial;
