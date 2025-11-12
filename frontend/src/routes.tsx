import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Chat } from "./pages/Chat";
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
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);
