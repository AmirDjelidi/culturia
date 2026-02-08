# 🏛️ Culturia

> **Application Mobile & IA** : Rendre l'art accessible et interactif.
> *Intégration de l'intelligence artificielle Google Gemini pour transformer l'expérience muséale.*

![Tech](https://img.shields.io/badge/Tech-React_Native-blue) ![Backend](https://img.shields.io/badge/Backend-Node.js-green) ![AI](https://img.shields.io/badge/AI-Google_Gemini-purple)

---

## 🎯 La Mission

**Culturia** répond à un défi moderne : comment reconnecter le jeune public européen avec le patrimoine culturel ?
L'application transforme la visite au musée en une expérience interactive. L'utilisateur peut "scanner" une œuvre et obtenir des explications instantanées, ludiques et adaptées grâce à l'IA.

## 🤖 Intelligence Artificielle (Gemini Vision)

Le projet utilise l'API **Google Gemini** pour :
1.  **Reconnaissance Visuelle :** Analyser une œuvre via la caméra.
2.  **Génération de Contenu :** Fournir une description contextuelle et historique en temps réel.

---

## ⚠️ Installation & Configuration (Important)

Le backend était précédemment hébergé sur **Render** (service cloud), mais cette instance n'est plus active.
**Pour faire fonctionner le projet, vous devez lancer le backend en local et rediriger le frontend.**

### Étape 1 : Préparer le Backend

1.  Allez dans le dossier backend :
    ```bash
    cd backend
    npm install
    ```
2.  **Configuration API (Obligatoire) :**
    Créez un fichier `.env` à la racine du dossier `backend` et ajoutez votre clé API Google Gemini :
    ```env
    GEMINI_API_KEY=votre_clé_api_google_ici
    PORT=3000
    ```
3.  Lancez le serveur :
    ```bash
    node server.js
    ```
    *(Le serveur doit tourner sur `http://localhost:3000`)*

### Étape 2 : Configurer le Frontend (Fix Render)

1.  Allez dans le dossier frontend :
    ```bash
    cd frontend
    npm install
    ```
2.  **Modification de l'URL API :**
    Par défaut, le frontend pointe vers l'ancienne adresse Render.
    * Ouvrez le fichier `src/main.jsx` (ou le fichier de configuration API correspondant).
    * Remplacez l'URL de production par l'URL locale :
    ```javascript
    // AVANT (Ne marche plus)
    // const API_URL = "https://culturia-backend.onrender.com";

    // APRÈS (Local)
    const API_URL = "http://localhost:3000";
    ```

3.  Lancez l'application :
    ```bash
    npm run dev
    ```

---

## 🛠️ Stack Technique

| Couche | Technologies | Usage |
| :--- | :--- | :--- |
| **Frontend** | **React Native / Vite** | Interface Mobile Cross-platform. |
| **Backend** | **Node.js / Express** | API REST & Gestion des clés IA. |
| **IA** | **Google Gemini API** | Analyse d'image & Génération de texte. |


## 👥 Auteur

**Amir Djelidi** et l'équipe derrière.
* **Projet :** Intégration IA & Développement Mobile
* [Mon Profil LinkedIn](https://www.linkedin.com/in/amir-djelidi/)
