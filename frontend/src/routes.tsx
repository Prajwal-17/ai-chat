import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Chat } from "./pages/Chat";
import { Demo } from "./pages/Demo";
import { Home } from "./pages/Home";
import { Response } from "./pages/Response";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/response-demo",
        element: <Response />,
      },
    ],
  },
]);
