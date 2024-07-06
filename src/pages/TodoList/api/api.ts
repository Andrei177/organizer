import { $host } from "../../../api/api";
import { ITodo } from "../../../models/ITodo";

export const addTodoOnServer = async (todo: ITodo) => {
    const {data} = await $host.post("/todos", {
        ...todo
    })
    return data
}

export const updateTodoOnServer = async (todo: ITodo) => {
    const {data} = await $host.put(`/todos/${todo.id}`, {
        ...todo
    })
    return data
}

export const removeTodoOnServer = async (todo: ITodo) => {
    const {data} = await $host.delete(`/todos/${todo.id}`)
    return data
}

export const getTodos = async () => {
    const {data} = await $host.get("/todos");
    return data
}