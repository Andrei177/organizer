import { createEvent, createStore } from "effector";
import { ITodo } from "../../../models/ITodo";

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