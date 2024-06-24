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
          loader: ({params})=>fetch(`http://localhost:5000/tasks/${params.id}`),
          element: <UpdateTask></UpdateTask>
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
          loader: ({params})=>fetch(`http://localhost:5000/tasks/${params.id}`),
          element: <Taskdetails></Taskdetails>
        },
        {
          path: 'mySubmissions',
          element: <MySubmissions></MySubmissions>
        }
      ]
    }
  ]);

export default router;