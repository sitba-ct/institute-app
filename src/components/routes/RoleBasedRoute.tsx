import { Navigate } from "react-router-dom";
import getSessionFromStorage from "../../services/auth/SessionService";

interface IProps {
  children: JSX.Element;
  role: string;
}

const RoleBasedRoute = (props: IProps): any => {
  let session = getSessionFromStorage();
  let hasUserRequiredRole = false;
  if (session) {
    let sessionAsObject = JSON.parse(session);
    hasUserRequiredRole =
      sessionAsObject.user.user_metadata.demo_app_role === props.role;
  }

  return hasUserRequiredRole ? props.children : <Navigate to="/" />;
};

export default RoleBasedRoute;
