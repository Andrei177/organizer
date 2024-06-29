import React from "react";
import Calendar from "../pages/Calendar";
import Home from "../pages/Home";
import Lk from "../pages/Lk";
import TodoList from "../pages/TodoList";

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