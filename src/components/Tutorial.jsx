import React from 'react';
import './Tutorial.css';

function Tutorial() {
  return (
    <div className="tutorial-container">
      <h2 className="tutorial-title">Tutoriel</h2>
      <ol className="tutorial-list">
        <li>Allez sur l'accueil</li>
        <li>
          Scannez l'œuvre avec l'appareil photo en cadrant l'œuvre dans le rectangle
          <span className="scanner-icon"> ☐ </span>
        </li>
        <li>La description détaillée de l'œuvre apparaîtra</li>
      </ol>
      <p className="tutorial-end">Bonne culture !</p>
    </div>
  );
}

export default Tutorial;
