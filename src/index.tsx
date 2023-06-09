import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./contexts/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import "./config/axios";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    {/* <AppProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AppProvider> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
