import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

import "assets/styles/tailwind.css";
import "assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
