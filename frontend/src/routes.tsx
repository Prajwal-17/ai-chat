import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Chat } from "./pages/Chat";
import { Demo } from "./pages/Demo";
import { Home } from "./pages/Home";

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
    ],
  },
]);
