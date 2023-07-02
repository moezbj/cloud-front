import localforage from "localforage";
import { useContext, useEffect } from "react";
import { setAuthorizationBearer } from "../request/http";
import { AuthContext } from "../providers/AuthProvider";

function useAuth(login) {
  const { setUser } = useContext(AuthContext);

  function persistUser(data) {
    const result = { ...data };
    const stayConnected = true;
    if (!stayConnected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result.token.refreshToken;
    }
    localforage.setItem("auth", JSON.stringify(result));
  }

  const [call, state] = login();

  useEffect(() => {
    if (state.data) {
      console.log("state", state.data);
      setAuthorizationBearer(state.data.token);
      persistUser(state.data);
      setUser(state.data.user);
    }
  }, [state.data]);

  return [call, state];
}

export default useAuth;
