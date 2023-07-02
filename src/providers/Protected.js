/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "providers/AuthProvider";
import { isUserAuthenticated } from "../utils/role";

export const Protected = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user || !isUserAuthenticated(user, roles)) {
    return (
      <Navigate
        replace
        to={{
          pathname: user ? `/${user.role.libelle.toLowerCase()}` : "/login",
          search: user
            ? ""
            : `?${new URLSearchParams({ from: location.pathname })}`,
        }}
      />
    );
  }

  return (
    <React.Fragment>
      {typeof children === "function" ? children(user) : children}
    </React.Fragment>
  );
};
