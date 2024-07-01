import { createEvent, createStore } from "effector";
import { ICalendarEvent } from "../models/ICalendarEvent";

export const setTitle = createEvent<string>();
export const setStartDate = createEvent<string | number | readonly string[] | undefined>();
export const setEndDate = createEvent<string | number | readonly string[] | undefined>();
export const setFullDay = createEvent<boolean>();

export const $calendarEventStore = createStore<ICalendarEvent>({
    title: "",
    startDate: "",
    endDate: "",
    fullDay: false
})
.on(setTitle, (state, newTitle) => ({...state, title: newTitle}))
.on(setStartDate, (state, newDate) => ({...state, startDate: newDate}))
.on(setEndDate, (state, newDate) => ({...state, endDate: newDate}))
.on(setFullDay, (state, newFullDay) => ({...state, fullDay: newFullDay}))