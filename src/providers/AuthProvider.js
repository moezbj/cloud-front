import { createContext, useMemo, memo, useState } from "react";
import useStartUp from "hooks/useStartUp";

export const AuthContext = createContext({
  user: null,
  setUser: () => {
    throw new Error("Component must be wrapped in AuthProvider");
  },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const startupEnded = useStartUp({ setUser });
  const value = useMemo(() => ({ user, setUser }), [user]);
  if (!startupEnded) return <div />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default memo(AuthProvider);
