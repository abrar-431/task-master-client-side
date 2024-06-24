import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Layout/Home/Home/Home";
import Register from "../Layout/Pages/Register/Register";
import Login from "../Layout/Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard/Dashboard";
import AddTask from "../Layout/Dashboard/Task Creator/AddTask";
import MyTask from "../Layout/Dashboard/Task Creator/MyTask";
import UpdateTask from "../Layout/Dashboard/Task Creator/UpdateTask";
import TaskList from "../Layout/Dashboard/Worker/TaskList";
import Taskdetails from "../Layout/Dashboard/Worker/Taskdetails";
import MySubmissions from "../Layout/Dashboard/Worker/MySubmissions";
import WorkerHome from "../Layout/Dashboard/Worker/WorkerHome";
import TaskCreatorHome from "../Layout/Dashboard/Task Creator/TaskCreatorHome";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Layout/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Layout/Dashboard/Admin/ManageTasks";
import WithDrawals from "../Layout/Dashboard/Worker/WithDrawals";
import AdminHome from "../Layout/Dashboard/Admin/AdminHome";
import ErrorElement from "../Components/ErrorElement";
import PurchaseHistory from "../Layout/Dashboard/Task Creator/PurchaseHistory";
import PurchaseCoin from "../Layout/Dashboard/Task Creator/PurchaseCoin";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorElement></ErrorElement>,
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
        // Admin Routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'manageUsers',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'manageTasks',
          element: <AdminRoute><ManageTasks></ManageTasks></AdminRoute>
        },
        // Task Creator Routes
        {
          path: 'creatorHome',
          element: <TaskCreatorHome></TaskCreatorHome>
        },
        {
          path: 'addTasks',
          element: <AddTask></AddTask>
        },
        {
          path: 'myTasks',
          element: <MyTask></MyTask>
        },
        {
          path: 'updateTasks/:id',
          loader: ({params})=>fetch(`https://b9a12-server-side-abrar-431.vercel.app/tasks/${params.id}`),
          element: <UpdateTask></UpdateTask>
        },
        {
          path: 'paymentHistory',
          element: <PurchaseHistory></PurchaseHistory>
        },
        {
          path: 'purchaseCoin',
          element: <PurchaseCoin></PurchaseCoin>
        },

        // Worker Routes
        {
          path: 'workerHome',
          element: <WorkerHome></WorkerHome>
        },
        {
          path: 'taskList',
          element: <TaskList></TaskList>
        },
        {
          path: 'tasks/:id',
          loader: ({params})=>fetch(`https://b9a12-server-side-abrar-431.vercel.app/tasks/${params.id}`),
          element: <Taskdetails></Taskdetails>
        },
        {
          path: 'mySubmissions',
          element: <MySubmissions></MySubmissions>
        },
        {
          path: 'withdrawals',
          element: <WithDrawals></WithDrawals>
        }
      ]
    }
  ]);

export default router;