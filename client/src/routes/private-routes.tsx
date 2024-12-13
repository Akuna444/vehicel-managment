import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  return token ? children : <Navigate to="/admin/signin" replace />;
};

export default PrivateRoute;
