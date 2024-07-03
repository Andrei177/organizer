import { createEvent, createStore } from "effector";

interface IWidgetsStore{
    offsetTop: number,
    offsetLeft: number
}

export const setOffsetTop = createEvent<number>();
export const setOffsetLeft = createEvent<number>();

export const $widgetsStore = createStore<IWidgetsStore>({
    offsetTop: 0,
    offsetLeft: 0
})
.on(setOffsetTop, (state, value) => ({...state, offsetTop: value}))
.on(setOffsetLeft, (state, value) => ({...state, offsetLeft: value}))