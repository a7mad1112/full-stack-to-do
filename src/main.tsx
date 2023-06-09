import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter as Routers } from "react-router-dom";
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Routers>
//       <App />
//     </Routers>
//   </React.StrictMode>
// );
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Routers>
        <App />
      </Routers>
    </React.StrictMode>
  );
}
