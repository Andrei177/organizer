import React from "react";
import Calendar from "../pages/Calendar/components/Calendar";
import Home from "../pages/Home/components/Home";
import Lk from "../pages/Lk/components/Lk";
import TodoList from "../pages/TodoList/components/TodoList";

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