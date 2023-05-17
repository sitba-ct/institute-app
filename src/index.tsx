import React from "react";
import "reflect-metadata"; // this must be one of the first things to import so DI works properly. Do not change order.
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInit from "./utils/axios";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import { configureLanguages } from "./utils/languages";
import { configureDependencyInjectionContainer } from "./utils/dependencyInjection";

axiosInit();
configureDependencyInjectionContainer();
const i18nextConfiguration = configureLanguages();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18nextConfiguration}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
