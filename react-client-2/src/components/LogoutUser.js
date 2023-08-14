import  { useEffect, useContext} from 'react';
import { logoutUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';

const LogoutUser = () => {
  const navigate = useNavigate();
  const {  rmTokenOnLogout, user, token } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = async () => {

      if (!token) {
        navigate('/Login');
        return;
      }

      try {
        const response = await logoutUser(user.userId);
        if (response.status === 200) {
          rmTokenOnLogout();
          alert('Logged out successfully');
          // Redirect to login after logout success
          navigate('/login'); 
        }else if(response.status === 401){
          alert('Token is invalid/missing, user cannot be authenticated');
        }
        else if(response.status === 403){
          alert('Token is valid but blacklisted, cannot logout');
        }
      } catch (error) {
        alert('Server/Internet Connection Error');
      }
    };

    handleLogout();
  }, [navigate,rmTokenOnLogout, user,token ]);

  return null; // This component doesn't render anything
};

export default LogoutUser;
