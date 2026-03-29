import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Board from "../pages/Board";
import Dashboard from "../pages/Dashboard";



export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/board',
        element: <Board />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/board/:id',
        element: <Board />,
    }



])