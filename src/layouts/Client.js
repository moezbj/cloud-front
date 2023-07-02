import React from "react";
import { Routes, Route } from "react-router-dom";

import Page from "./Page";
import { Protected } from "providers/Protected";
import Dashboard from "views/admin/Dashboard";
import { ROLE } from "../utils/role";

const Client = () => {
  return (
    <Protected roles={[ROLE.CLIENT]}>
      <Page>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
        </Routes>
      </Page>
    </Protected>
  );
};

export default Client;
