import localforage from "localforage";
import { setAuthorizationBearer } from "../request/http";
import { AuthContext } from "../providers/AuthProvider";

async function usePersistUser() {
  const { setUser } = useContext(AuthContext);
  setAuthorizationBearer(loginState.data.token);
  setUser(loginState.data);
  localforage.setItem("auth", JSON.stringify(loginState.data));
}
export default usePersistUser;
