import  { useEffect, useContext} from 'react';
import { logoutUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';

const LogoutUser = () => {
  const navigate = useNavigate();
  const {  updateAuthOnLogout, user } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await logoutUser(user.userId);
        if (response.status === 200) {
          updateAuthOnLogout();
          alert('Logged out successfully');
          navigate('/login'); // Redirect to login after logout
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    handleLogout();
  }, [navigate,updateAuthOnLogout, user]);

  return null; // This component doesn't render anything
};

export default LogoutUser;
