// hocs/SecureRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from 'constant';
import { useAuth } from 'context';


const SecureRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default SecureRoute
