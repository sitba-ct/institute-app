import { Navigate } from 'react-router-dom'
import isUserAuthenticated from '../../services/auth/AuthorizationService';

// we could receive the path navigate to from props, and reuse this component, for role based routing..
interface IProps {
    children: JSX.Element;
  }

const PrivateRoute = (props: IProps): any => {
    const isAuthenticated = isUserAuthenticated();
    return isAuthenticated ? props.children : <Navigate to='/login'/>;
}

export default PrivateRoute;