import { Navigate } from "react-router-dom";

import { Protected } from "../providers/Protected";
import { ROLE } from "../utils/role";

export default function Home() {
  return (
    <Protected roles={["admin", "client", "responsable"]}>
      {(user) => {
        return <Navigate replace to={user.role.libelle} />;
      }}
    </Protected>
  );
}
