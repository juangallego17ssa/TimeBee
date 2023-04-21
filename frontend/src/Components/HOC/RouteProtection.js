import { Navigate } from "react-router-dom";

function RouteProtection(props) {
  return localStorage.getItem("access") ? props.route : <Navigate to="/home" />;
}

export default RouteProtection;