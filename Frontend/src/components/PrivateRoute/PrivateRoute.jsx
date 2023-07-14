import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
  // console.log(token);
  return token && token !== "undefined" ? children : <Navigate to="/" />;
}

export default PrivateRoute;
