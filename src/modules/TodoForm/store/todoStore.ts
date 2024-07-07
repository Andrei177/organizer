import { createEvent, createStore } from "effector";
import { ITodo } from "../../../models/ITodo";

export const setName = createEvent<string>();
export const setDescription = createEvent<string>();
export const setEventId = createEvent<number | string>();
export const setStatus = createEvent<boolean>();
export const setEmptyTodo = createEvent();
export const setTodo = createEvent<ITodo>();
export const setIsEditing = createEvent<boolean>();

export interface ITodoStore{
    todo: ITodo,
    isEditing: boolean
}

export const $todoStore = createStore<ITodoStore>({
    todo: {
        id: null,
        name: "",
        eventId: "",
        description: "",
        status: false
    },
    isEditing: false
})
.on(setName, (state, newName) => ({...state, todo: {...state.todo, name: newName}}))
.on(setDescription, (state, newDescription) => ({...state, todo: {...state.todo, description: newDescription}}))
.on(setEventId, (state, newEventId) => ({...state, todo: {...state.todo, eventId: newEventId}}))
.on(setStatus, (state, newStatus) => ({...state, todo: {...state.todo, status: newStatus}}))
.on(setEmptyTodo, (state) => ({
    ...state,
    todo: {
        id: null,
        name: "",
        eventId: "",
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