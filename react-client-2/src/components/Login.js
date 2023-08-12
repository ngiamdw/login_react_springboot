import React, { useState, useEffect, useContext } from 'react';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [attemptLogin, setAttemptLogin] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, updateAuthOnLogin } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResponse = (status) => {
      const errorMessages = {
        401:  t('invalidCredentials'),
        500: t('loginFailedDueToServerErr'),
        default: t('logInError')
      };
      setMessage(errorMessages[status] || errorMessages.default);
    };
  
    if (attemptLogin) {
      const handleLogin = async () => {
        try {
          const user = { username, password };
          const response = await loginUser(user);
          if (response.status === 200) {
            updateAuthOnLogin(response.data);  // Update isAuth and userdata 
            alert('Login successful');
          } else {
            handleResponse(response.status);
          }
        } catch (error) {
          if (error.response && error.response.status) {
            handleResponse(error.response.status);
          } else {
            handleResponse(); // for other errors not related to HTTP/server such as network failure
          }
        }
      };

      handleLogin();
      setAttemptLogin(false); // Reset the flag after attempting login
    } 
  }, [attemptLogin, isAuthenticated, navigate, username, password, updateAuthOnLogin, t]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <input className="login-input" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="login-button" onClick={() => setAttemptLogin(true)}>{t('LogIn')}</button>
      <p className={[t('invalidCredentials'), t('loginFailedDueToServerErr'), t('logInError')].includes(message) ? "error-message" : ""}>{message}</p>
      <div>
        <h1>{t('Language')}</h1>
        <button onClick={() => i18next.changeLanguage('en')}>{t('English')}</button>
        <button onClick={() => i18next.changeLanguage('zh')}>{t('Mandarin')}</button>
      </div>
    </div>
  );
};

export default Login;
