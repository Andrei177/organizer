import { createEvent, createStore } from "effector";
import { ITodo } from "../models/ITodo";
import { ICalendarEvent } from "../models/ICalendarEvent";

export const setName = createEvent<string>();
export const setDescription = createEvent<string>();
export const setEvent = createEvent<ICalendarEvent>();
export const setStatus = createEvent<boolean>();
export const setEmptyTodo = createEvent();
export const setTodo = createEvent<ITodo>();
export const setIsEditing = createEvent<boolean>();
export const setEmptyTodoEvent = createEvent();

interface ITodoStore{
    todo: ITodo,
    isEditing: boolean
}

export const $todoStore = createStore<ITodoStore>({
    todo: {
        id: null,
        name: "",
        event: {
            id: null,
            title: "",
            startDate: "", 
            endDate: "",
            fullDay: false
        },
        description: "",
        status: false
    },
    isEditing: false
})
.on(setName, (state, newName) => ({...state, todo: {...state.todo, name: newName}}))
.on(setDescription, (state, newDescription) => ({...state, todo: {...state.todo, description: newDescription}}))
.on(setEvent, (state, newEvent) => ({...state, todo: {...state.todo, event: newEvent}}))
.on(setStatus, (state, newStatus) => ({...state, todo: {...state.todo, status: newStatus}}))
.on(setEmptyTodo, (state) => ({
    ...state,
    todo: {
        id: null,
        name: "",
        event: {
            id: null,
            title: "",
            startDate: "", 
            endDate: "",
            fullDay: false
        },
        description: "",
        status: false
    }
}))
.on(setTodo, (state, newTodo) => ({
    ...state,
    todo: {...newTodo}
}))
.on(setIsEditing, (state, bool) => ({
    ...state,
    isEditing: bool
}))
.on(setEmptyTodoEvent, (state) => ({
    ...state,
    todo: {
        ...state.todo,
        event: {
            id: null,
            title: "",
            startDate: "", 
            endDate: "",
            fullDay: false
        }
    }
}))