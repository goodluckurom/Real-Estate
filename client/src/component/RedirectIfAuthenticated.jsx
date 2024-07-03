/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ element: Element, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return isAuth ? <Navigate to="/" /> : <Element {...rest} />;
};

export default RedirectIfAuthenticated;
