import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles/index.tsx";
import CardProvider from "./context/Cards/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles>
      <CardProvider>
        <App/>
      </CardProvider>
    </GlobalStyles>
  </React.StrictMode>
);
