import React from "react";
import { Routes, Route } from "react-router-dom";

import Page from "./Page";
import { Protected } from "providers/Protected";
import { ROLE } from "../utils/role";
import Clients from "views/advisor/Clients";
import Recs from "views/advisor/Reclamation";
import Abonnement from "views/advisor/Abonnements";
import Factures from "views/client/Factures";

const Parent = () => {
  return (
    <Protected roles={[ROLE.RESPONSABLE]}>
      <Page>
        <Routes>
          <Route path="/" exact element={<Clients />} />
          <Route path="/reclamations" exact element={<Recs />} />
          <Route path="/abonnement" exact element={<Abonnement />} />
          <Route path="/factures" exact element={<Factures />} />
        </Routes>
      </Page>
    </Protected>
  );
};

export default Parent;
