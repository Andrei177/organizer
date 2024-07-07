import { ICalendarEvent } from "../../../models/ICalendarEvent";

export const addEventFn = (events: ICalendarEvent[], newEvent: ICalendarEvent) => [...events, newEvent];
export const updateEventFn = (events: ICalendarEvent[], event: ICalendarEvent) => {
    return events.map(e => {
        if(e.id === event.id){
            return event;
        }
        return e
    })
}
export const removeEventFn = (events: ICalendarEvent[], event: ICalendarEvent) => {
    return events.filter(e => e.id !== event.id);
}