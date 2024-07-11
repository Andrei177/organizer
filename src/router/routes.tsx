import React, { lazy } from "react";
import Home from "../pages/Home/components/Home";

const TodoList = lazy(() => import("../pages/TodoList/components/TodoList"));
const Lk = lazy(() => import("../pages/Lk/components/Lk"));
const Calendar = lazy(() => import("../pages/Calendar/components/Calendar"));

interface IRoutes{
    path: string;
    element: React.ReactNode
}

export const routes: IRoutes[] = [
    {path: "/", element: <Home/>},
    {path: "/calendar", element: <Calendar/>},
    {path: "/lk", element: <Lk/>},
    {path: "/todolist", element: <TodoList/>}
]