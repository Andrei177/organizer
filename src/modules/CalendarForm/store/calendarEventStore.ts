import { createEvent, createStore } from "effector";
import { ICalendarEvent } from "../../../models/ICalendarEvent";

export interface ICalendarEventStore{
    event: ICalendarEvent,
    isEditing: boolean,
    isReading: boolean
}

export const setTitle = createEvent<string>();
export const setStartDate = createEvent<string | number | readonly string[] | undefined>();
export const setEndDate = createEvent<string | number | readonly string[] | undefined>();
export const setFullDay = createEvent<boolean>();
export const setEvent = createEvent<ICalendarEvent>();
export const setEmptyEvent = createEvent();
export const setIsEditing = createEvent<boolean>();
export const setIsReading = createEvent<boolean>();

export const $calendarEventStore = createStore<ICalendarEventStore>({
    event: {
        id: null,
        title: "",
        startDate: "",
        endDate: "",
        fullDay: false
    },
    isEditing: false,
    isReading: false
})
.on(setTitle, (state, newTitle) => ({...state, event:{...state.event, title: newTitle}}))
.on(setStartDate, (state, newStartDate) => ({...state, event:{...state.event, startDate: newStartDate}}))
.on(setEndDate, (state, newEndDate) => ({...state, event:{...state.event, endDate: newEndDate}}))
.on(setFullDay, (state, newFullDay) => ({...state, event:{...state.event, fullDay: newFullDay}}))
.on(setEvent, (state, newEvent) => ({...state, event: {...newEvent}}))
.on(setEmptyEvent, (state) => ({
    ...state,
    event: {
        id: null,
        title: "",
        startDate: "",
        endDate: "",
        fullDay: false
    }
}))
.on(setIsEditing, (state, bool) => ({...state, isEditing: bool}))
.on(setIsReading, (state, bool) => ({...state, isReading: bool}))