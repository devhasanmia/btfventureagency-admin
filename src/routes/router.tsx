import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/layout/AdminLayout";
import Home from "../pages/Home";
import Messages from "../pages/Message";
import Teams from "../pages/Teams";
import AddTeam from "../pages/AddTeams";
import OurServices from "../pages/OurServices";
import RecentlyWorking from "../pages/RecentlyWorking";
import Partnership from "../pages/Partnership";
import Blog from "../pages/Blog";
import AddService from "../pages/AddService";
import AddProject from "../pages/AddProject";

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
        },
        {
          path:"services",
          element: <OurServices/>
        },
        {
          path: "add-service",
          element: <AddService/>
        },
        {
          path: "/add-project",
          element: <AddProject/>
        },
        {
          path:"recently-working",
          element: <RecentlyWorking/>
        },
        {
          path: "partnership",
          element: <Partnership/>
        },
        {
          path: "blogs",
          element: <Blog/>
        }
    ]
  },
]);

export default router;
