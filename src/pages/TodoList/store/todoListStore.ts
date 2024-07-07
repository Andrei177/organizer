import { createEffect, createEvent, createStore } from "effector";
import { ITodo } from "../../../models/ITodo";
import { addTodoOnServer, getTodos, removeTodoOnServer, updateTodoOnServer } from "../api/api"
import { addTodoFunc, removeTodoFunc, updateTodoFunc } from "../helpers/fnsForStore";

interface TypeTodoListStore{
    todos: ITodo[],
    showTodoForm: boolean,
}

export const addTodo = createEvent<ITodo>();
export const updateTodo = createEvent<ITodo>();
export const removeTodo = createEvent<ITodo>();
export const setShowTodoForm = createEvent<boolean>();

export const addTodoServer = createEffect<ITodo, ITodo>(addTodoOnServer)
export const updateTodoServer = createEffect<ITodo, ITodo>(updateTodoOnServer)
export const removeTodoServer = createEffect<ITodo, ITodo>(removeTodoOnServer)
export const fetchTodos = createEffect<void, ITodo[]>(getTodos)

export const $todoListStore = createStore<TypeTodoListStore>({
    todos: [],
    showTodoForm: false,
})
.on(addTodo, (state, newTodo) => ({
    ...state,
    todos: addTodoFunc(state.todos, newTodo)
}))
.on(updateTodo, (state, updateTodo) => ({
    ...state,
    todos: updateTodoFunc(state.todos, updateTodo)
}))
.on(removeTodo, (state, remTodo) => ({
    ...state,
    todos: removeTodoFunc(state.todos, remTodo)
}))
.on(setShowTodoForm, (state, bool) => ({
    ...state,
    showTodoForm: bool
}))
.on(addTodoServer.doneData, (state, newTodo) => ({...state, todos: addTodoFunc(state.todos, newTodo)}))
.on(updateTodoServer.doneData, (state, todo) => ({...state, todos: updateTodoFunc(state.todos, todo)}))
.on(removeTodoServer.doneData, (state, todo) => ({...state, todos: removeTodoFunc(state.todos, todo)}))
.on(fetchTodos.doneData, (state, newTodos) => ({...state, todos: [...newTodos]}))