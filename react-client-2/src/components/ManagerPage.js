import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import AuthContext from './AuthContext.js';
import { useTranslation } from 'react-i18next';
import { VerifyManagerPageAccess } from '../services/apiService.js';
import { useCallback } from 'react'; // <-- Import useCallback

const ManagerPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const checkTokenIsValid = useCallback(async() => { 
    try {
      const res = await VerifyManagerPageAccess();
      if(res.status !== 200){
        navigate('/Login');
      }
      else if(user.role === "user"){
        navigate('/Welcome');
      }
    } catch (error) {
      navigate('/Login');
    }
  }, [navigate, user]); // 

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    } else {
      checkTokenIsValid();
    }
  }, [token, navigate, checkTokenIsValid]);

  return (
    <div>
      <p>{t('ManagerPageText')}</p>
      <br />
      <Link to="/Logout">{t('Logout')}</Link>
    </div>
  );
};
export default ManagerPage;