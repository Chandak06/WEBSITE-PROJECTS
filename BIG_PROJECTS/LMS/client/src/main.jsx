import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { BrowerRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowerRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowerRouter>
);
