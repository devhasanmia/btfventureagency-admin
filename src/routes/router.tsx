import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/layout/AdminLayout";
import Home from "../pages/Home";
import ContactMessages from "../pages/Message";
import Messages from "../pages/Message";
import Teams from "../pages/Teams";
import AddTeam from "../pages/AddTeams";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout/>,
    children: [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "dashboard",
            element: <Home/>
        },
        {
            path: "messages",
            element: <Messages/>
        },
        {
          path: "teams",
          element: <Teams/>
        },
        {
          path: "add-teams",
          element: <AddTeam/>
        }
    ]
  },
]);

export default router;
