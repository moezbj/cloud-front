import React from "react";
import { Routes, Route } from "react-router-dom";

import Page from "./Page";
import { Protected } from "providers/Protected";
import Reclamation from "views/advisor/Reclamation";
import Factures from "views/client/Factures";
import Demandes from "views/client/Demande";
import Abonnement from "views/advisor/Abonnements";
import Service from "views/client/Services";

import { ROLE } from "../utils/role";

const Client = () => {
  return (
    <Protected roles={[ROLE.CLIENT]}>
      <Page>
        <Routes>
          <Route path="/" exact element={<Factures />} />
          <Route path="/reclamations" exact element={<Reclamation />} />
          <Route path="/abonnements" exact element={<Abonnement />} />
          <Route path="/services" exact element={<Service />} />
          <Route path="/demande" exact element={<Demandes />} />
        </Routes>
      </Page>
    </Protected>
  );
};

export default Client;
