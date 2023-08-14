import {useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';
import { useTranslation } from 'react-i18next';

const Welcome = () => {

  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>{t('Hi')}, {user && user.name}!</h1>
      <p>{t('Username')}: {user && user.username}</p>
      <p>{t('Role')}: {user && user.role}</p>
      <br />
      <Link to="/Logout">{t('Logout')}</Link>
      <br />
      <br />
      {user && user.role === "manager" && <Link to="/managerPage">{t('ManagerPage')}</Link>}
    </div>
  );
};

export default Welcome;
