import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
