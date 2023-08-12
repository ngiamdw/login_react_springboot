import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import AuthContext from './AuthContext.js';
import { useTranslation } from 'react-i18next';

const ManagerPage = () => {

  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }else {
      if(user.role === "user"){
        navigate('/Welcome');
      }
    }
  }, [isAuthenticated, navigate,user]);

  return (
    <div>
      <p>{t('ManagerPageText')}</p>
      <br />
      <Link to="/Logout">{t('Logout')}</Link>
    </div>
  );
};

export default ManagerPage;
