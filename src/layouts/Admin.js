import React from "react";
import { Routes, Route } from "react-router-dom";

import { Protected } from "providers/Protected";
import Page from "./Page";
import { ROLE } from "../utils/role";

// views
import Users from "views/admin/GestionUtilisateur";
import Services from "views/admin/GestionService";
import Demandes from "views/admin/GestionnDemande";
import Machines from "views/admin/GestionMachine";
import Rams from "views/admin/GestionRam";
import Stockage from "views/admin/GestionStockage";
import Cpu from "views/admin/GestionCpu";
import Application from "views/admin/GestionApplication";
import Platform from "views/admin/GestionPlatform";

export default function Admin() {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <Page>
        <Routes>
          <Route index path="/" exact element={<Users />} />
          <Route path="/demande" exact element={<Demandes />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/services/machine" exact element={<Machines />} />
          <Route path="/services/application" exact element={<Application />} />
          <Route path="/services/platforme" exact element={<Platform />} />
          <Route path="/resources/ram" exact element={<Rams />} />
          <Route path="/resources/stockage" exact element={<Stockage />} />
          <Route path="/resources/cpu" exact element={<Cpu />} />
          <Route element={<div>404 not found</div>} />
        </Routes>
      </Page>
    </Protected>
  );
}
