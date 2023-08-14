import React, { useState, useEffect, useContext } from 'react';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Login = () => {

  console.log("Login component rendered");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [attemptLogin, setAttemptLogin] = useState(false);

  const navigate = useNavigate();
  const {  updateTokenOnLogin, token } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Login useEffect (attemptLogin) triggered");
    if (!attemptLogin) return;  // Only proceed if attemptLogin is true
    const handleResponse = (status) => {
      const errorMessages = {
        401:  t('invalidCredentials'),
        500: t('loginFailedDueToServerErr'),
        default: t('loginFailedDueToServerErr')
      };
      setMessage(errorMessages[status] || errorMessages.default);
    };
  
    if (attemptLogin) {
      const handleLogin = async () => {
        try {
          const loginCredentials = { username, password };
          const response = await loginUser(loginCredentials);
          if (response.status === 200) {
              const userData = {
                name: response.data.name, 
                username: response.data.username, 
                role: response.data.role, 
                userId: response.data.userId 
            };
            // console.log(userData);
            // console.log('token : ' + response.data.token);
            updateTokenOnLogin(userData, response.data.token);  // Update useContext token & userdata

            console.log("Token after login:", token);
            alert('Login successful');
           // navigate('/welcome');
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
  }, [attemptLogin, navigate, username, password, updateTokenOnLogin, token,t]);

  useEffect(() => {
    console.log("Login useEffect (token) triggered");
    if (token) {
      console.log("Token present, navigating to /welcome");
      navigate('/welcome');
    }
  }, [token, navigate]);

  return (
    <div className="login-container">
      <input className="login-input" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="login-button" onClick={() => setAttemptLogin(true)}>{t('LogIn')}</button>
      <p className={[t('invalidCredentials'), t('loginFailedDueToServerErr')].includes(message) ? "error-message" : ""}>{message}</p>
      <div>
        <h1>{t('Language')}</h1>
        <button onClick={() => i18next.changeLanguage('en')}>{t('English')}</button>
        <button onClick={() => i18next.changeLanguage('zh')}>{t('Mandarin')}</button>
      </div>
    </div>
  );
};

export default Login;
