import { createEvent, createStore } from "effector";
import { ICoords } from "../types/ICoords";

interface IHomeStore{
    positionCalendar: ICoords,
    positionTodoList: ICoords
}

export const setPositionCalendar = createEvent<ICoords>();
export const setPositionTodoList = createEvent<ICoords>();

export const $homeStore = createStore<IHomeStore>({
    positionCalendar: {
        x: 0,
        y: 0
    },
    positionTodoList: {
        x: 100,
        y: 100
    }
})
.on(setPositionCalendar, (state, newPosition) => ({...state, positionCalendar: newPosition}))
.on(setPositionTodoList, (state, newPosition) => ({...state, positionTodoList: newPosition}))