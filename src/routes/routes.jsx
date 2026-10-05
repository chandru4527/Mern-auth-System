import { createBrowserRouter } from "react-router-dom";

// layouts
import IndexLayout from "../layout/userLayout/IndexLayout";
import AdminLayout from '../layout/adminLayout/AdminLayout';

// auth pages
import Login from '../pages/auth/Login';
import Register from "../pages/auth/Register";

// producted routers
import AdminRoute from './AdminRoute';
import PublicRoute from "./PublicRoute";

// pages
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import Profile from '../pages/Profile'

// 404 not found  &  error
import NotFound from '../components/pages/NotFound';
import ErrorPage from '../components/pages/ErrorPage';

const Routers = createBrowserRouter([
  // Main website
  {
    element: <IndexLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ],
  },

  // Guest authentication
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
        handle: {
          title: "Login",
        },
      },
      {
        path: "/register",
        element: <Register />,
        handle: {
          title: "Register",
        },
        
      },
    ],
  },

  // Admin
  {
    element: <AdminRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [],
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFound />,
    handle: {
      title: "Page Not Found",
    },
  },
]);

export default Routers;