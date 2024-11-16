import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./bootstrap.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthenProvider } from "./context/AuthenContext.jsx";
import { Provider } from "react-redux";
import store from "./store/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthenProvider>
          <App />
        </AuthenProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
