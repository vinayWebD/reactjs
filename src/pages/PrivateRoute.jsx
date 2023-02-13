import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const userInfo = useSelector((state) => state.userInfo);
  if (userInfo) {
    return <> {children}</>;
  }
  return <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export { PrivateRoute };
