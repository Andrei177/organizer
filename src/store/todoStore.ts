import { createEvent, createStore } from "effector";
import { ITodo } from "../models/ITodo";

export const setName = createEvent<string>();
export const setDescription = createEvent<string>();
export const setEvent = createEvent<string>();
export const setStatus = createEvent<boolean>();

export const $todoStore = createStore<ITodo>({
    id: null,
    name: "",
    event: "",
    description: "",
    status: false
})
.on(setName, (state, newName) => ({...state, name: newName}))
.on(setDescription, (state, newDescription) => ({...state, description: newDescription}))
.on(setEvent, (state, newEvent) => ({...state, event: newEvent}))
.on(setStatus, (state, newStatus) => ({...state, status: newStatus}))