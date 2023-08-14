import React, { useEffect, useContext } from 'react';  // Added useContext
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';  // Added Navigate
import Login from './components/Login.js';
import Welcome from './components/Welcome'; 
import ManagerPage from './components/ManagerPage';
import LogoutUser from './components/LogoutUser';
import AuthProvider from './components/AuthProvider';
import AuthContext from './components/AuthContext';  

import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

// App.js
function App() {
  const { token } = useContext(AuthContext);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to={!token ? "/login" : "/welcome"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutUser />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/managerPage" element={<ManagerPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </I18nextProvider>
  );
}

export default App;
