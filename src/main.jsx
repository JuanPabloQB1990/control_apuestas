import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import ApuestaProvider from "./context/ApuestaProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApuestaProvider>
      <App />
    </ApuestaProvider>
  </AuthProvider>
);
