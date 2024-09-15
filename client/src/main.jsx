import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ymtltn84g8kje8v4.us.auth0.com" // Replace with your Auth0 domain
      clientId="XiZfh44L3tZEpu7p2JHzAocBWLjcijZM" // Replace with your Auth0 client ID
      authorizationParams={{
        redirect_uri: "https://real-estate-homyz-beige.vercel.app" // Ensure this is set in your Auth0 application settings
      }}
      audience="http://localhost:8000" // Ensure this matches your API identifier in Auth0                        //imp belongs to jwt i.e server running port
      scope="openid profile email" // Define the scopes you need
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
