import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Layout/Home/Home/Home";
import Register from "../Layout/Pages/Register/Register";
import Login from "../Layout/Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
           path: '/register',
           element: <Register></Register> 
        },
        {
          path: '/login',
          element: <Login></Login>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          
        }
      ]
    }
  ]);

export default router;