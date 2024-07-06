import { createEffect, createEvent, createStore } from "effector";
import { ITodo } from "../../../models/ITodo";
import { addTodoOnServer, getTodos, removeTodoOnServer, updateTodoOnServer } from "../api/api"

interface TypeTodoListStore{
    todos: ITodo[],
    showTodoForm: boolean,
}

const addTodoFunc = (todos: ITodo[], newTodo: ITodo) => {
    return [...todos, newTodo]
}
const removeTodoFunc = (todos: ITodo[], removeTodo: ITodo) => {
    return todos.filter(todo => todo.id !== removeTodo.id)
}
const updateTodoFunc = (todos: ITodo[], updateTodo: ITodo) => {
    return todos.map(todo => {
        if(updateTodo.id === todo.id){
            return updateTodo; 
        }
        return todo
    })
}

export const addTodo = createEvent<ITodo>();
export const updateTodo = createEvent<ITodo>();
export const removeTodo = createEvent<ITodo>();
export const setShowTodoForm = createEvent<boolean>();

export const addTodoServer = createEffect(addTodoOnServer)
export const updateTodoServer = createEffect(updateTodoOnServer)
export const removeTodoServer = createEffect(removeTodoOnServer)
export const fetchTodos = createEffect(getTodos)

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