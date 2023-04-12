import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./theme";

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ChakraProvider>
);
