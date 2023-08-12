import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; 
import Login from './components/Login.js';
import Welcome from './components/Welcome'; 
import ManagerPage from './components/ManagerPage';
import LogoutUser from './components/LogoutUser';
import AuthProvider from './components/AuthProvider';

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

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RedirectToLogin />} /> {/* Redirect root to /login */}
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/managerPage" element={<ManagerPage />} />
            <Route path="/logout" element={<LogoutUser />} />
          </Routes>
        </AuthProvider>
      </Router>
    </I18nextProvider>
  );
}

function RedirectToLogin(){
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return null;
}


export default App;
