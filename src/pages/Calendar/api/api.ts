import { $host } from "../../../api/api";
import { ICalendarEvent } from "../../../models/ICalendarEvent";

export const addEventOnServer = async (event: ICalendarEvent) => {
    const {data} = await $host.post<ICalendarEvent>("/events", {
        ...event
    })
    
    return data
}

export const updateEventOnServer = async (event: ICalendarEvent) => {
    const {data} = await $host.put<ICalendarEvent>(`/events/${event.id}`, {
        ...event
    })
    return data
}

export const removeEventOnServer = async (event: ICalendarEvent) => {
    const {data} = await $host.delete<ICalendarEvent>(`/events/${event.id}`)

    return data
}

export const getEvents = async () => {
    const {data} = await $host.get("/events");
    return data
}