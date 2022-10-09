import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global-styles/index.css";
import "./localization/i18n";
import { store } from "./app/store";
import App from "./App";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log(process.env.REACT_APP_API_URL)
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/collection-front/"> */}
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={1}>
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
