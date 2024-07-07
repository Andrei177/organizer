import { createEffect, createEvent, createStore } from "effector";
import { ICalendarEvent } from "../../../models/ICalendarEvent";
import { addEventOnServer, getEvents, removeEventOnServer, updateEventOnServer } from "../api/api";
import { addEventFn, removeEventFn, updateEventFn } from "../helpers/fnsForStore";

export interface ICalendar{
    events: ICalendarEvent[],
    showCalendarForm: boolean
}

export const addEvent = createEvent<ICalendarEvent>();
export const updateEvent = createEvent<ICalendarEvent>();
export const removeEvent = createEvent<ICalendarEvent>();
export const setShowCalendarForm = createEvent<boolean>();

export const addEventServer = createEffect<ICalendarEvent, ICalendarEvent>(addEventOnServer)
export const updateEventServer = createEffect<ICalendarEvent, ICalendarEvent>(updateEventOnServer)
export const removeEventServer = createEffect<ICalendarEvent, ICalendarEvent>(removeEventOnServer)
export const fetchEvents = createEffect<void, ICalendarEvent[]>(getEvents)

export const $calendarStore = createStore<ICalendar>({
    events: [],
    showCalendarForm: false
})
.on(addEvent, (state, newEvent) => ({...state, events: addEventFn(state.events, newEvent)}))
.on(updateEvent, (state, event) => ({...state, events: updateEventFn(state.events, event)}))
.on(removeEvent, (state, event) => ({...state, events: removeEventFn(state.events, event)}))
.on(setShowCalendarForm, (state, bool) => ({...state, showCalendarForm: bool}))
.on(addEventServer.doneData, (state, newEvent) => ({...state, events: addEventFn(state.events, newEvent)}))
.on(updateEventServer.doneData, (state, event) => ({...state, events: updateEventFn(state.events, event)}))
.on(removeEventServer.doneData, (state, event) => ({...state, events: removeEventFn(state.events, event)}))
.on(fetchEvents.doneData, (state, newEvents) => ({...state, events: [...newEvents]}))