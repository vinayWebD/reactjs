import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const params = useParams();
  const userInfo = useSelector((state) => state.authentication.userInfo);
  if (userInfo) {
    return <> {children}</>;
  }
  return <Navigate to={`/login/${params.page}`} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export { PrivateRoute };
