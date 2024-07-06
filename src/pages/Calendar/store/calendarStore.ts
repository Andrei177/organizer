import { createEffect, createEvent, createStore } from "effector";
import { ICalendarEvent } from "../../../models/ICalendarEvent";
import { addEventOnServer, getEvents, removeEventOnServer, updateEventOnServer } from "../api/api";

export interface ICalendar{
    events: ICalendarEvent[],
    showCalendarForm: boolean
}

const addEventFn = (events: ICalendarEvent[], newEvent: ICalendarEvent) => [...events, newEvent];
const updateEventFn = (events: ICalendarEvent[], event: ICalendarEvent) => {
    return events.map(e => {
        if(e.id === event.id){
            return event;
        }
        return e
    })
}
const removeEventFn = (events: ICalendarEvent[], event: ICalendarEvent) => {
    return events.filter(e => e.id !== event.id);
}

export const addEvent = createEvent<ICalendarEvent>();
export const updateEvent = createEvent<ICalendarEvent>();
export const removeEvent = createEvent<ICalendarEvent>();
export const setShowCalendarForm = createEvent<boolean>();

export const addEventServer = createEffect(addEventOnServer)
export const updateEventServer = createEffect(updateEventOnServer)
export const removeEventServer = createEffect(removeEventOnServer)
export const fetchEvents = createEffect(getEvents)

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