import "@/style/scss/style.scss"; // 글로벌 스타일 적용
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
