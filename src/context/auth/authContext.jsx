import AuthService from '@/service/authService';
import OrganizationService from '@/service/organizationService';
import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE_TYPES } from '@/constants/routePath.js';
import { useAuth } from '@/hooks/contextStates.jsx';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }) => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthData = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const result = await AuthService.validateToken(token);
          if (result.success) {
            return await OrganizationService.getOrgList().then((result) => {
              const orgs = result.data;
              if (result.success && orgs.length > 0) {
                auth.setAppState({
                  selectedOrg: orgs[0],
                  email: result.data.email,
                  organizations: orgs,
                });
              }
            });
          } else {
            auth.setAppState({ isAuthenticated: false });
          }
        } catch (error) {
          auth.setAppState({ isAuthenticated: false });
        }
      } else {
        navigate('/login', { replace: true });
      }
    };

    if (auth.isAuthenticated == null) {
      fetchAuthData();
    }
  }, [navigate, auth]);

  return auth?.isAuthenticated == null ? <></> : children;
};

export const LoginHandler = ({ children }) => {
  const { organizations } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('jwt') && organizations.length > 0)
      navigate(DASHBOARD_ROUTE_TYPES.CHANNELS);
  }, [organizations]);
  return children;
};
