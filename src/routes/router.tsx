import { createBrowserRouter } from "react-router";
import AdminLayout from "../components/layout/AdminLayout";
import Messages from "../pages/Message";
import Teams from "../pages/Teams";
import AddTeam from "../pages/AddTeams";
import OurServices from "../pages/OurServices";
import RecentlyWorking from "../pages/RecentlyWorking";
import Partnership from "../pages/Partnership";
import Blog from "../pages/Blog";
import AddService from "../pages/AddService";
import AddProject from "../pages/AddProject";
import AddPartnership from "../pages/AddPartnership";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AddBlog from "../pages/AddBlog";
import SocialLink from "../pages/SocialLink";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      (
        <ProtectedRoute>{(<AdminLayout />)}</ProtectedRoute>
      ),
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "messages",
        element: <Messages />
      },
      {
        path: "teams",
        element: <Teams />
      },
      {
        path: "add-teams",
        element: <AddTeam />
      },
      {
        path: "services",
        element: <OurServices />
      },
      {
        path: "add-service",
        element: <AddService />
      },
      {
        path: "add-project",
        element: <AddProject />
      },
      {
        path: "recently-working",
        element: <RecentlyWorking />
      },
      {
        path: "partnership",
        element: <Partnership />
      },
      {
        path: "add-partner",
        element: <AddPartnership />
      },
      {
        path: "blogs",
        element: <Blog />
      },
      {
        path: "add-blog",
        element: <AddBlog />
      },
      {
        path: "social-link",
        element: <SocialLink />
      }
     
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export default router;
