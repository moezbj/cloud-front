import { BrowserRouter } from "react-router-dom";

import Pages from "./routes/Routes";

export function App() {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;
