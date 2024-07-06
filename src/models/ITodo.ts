import { ICalendarEvent } from "./ICalendarEvent";

export interface ITodo{
    id: string | number | null;
    name: string;
    event: ICalendarEvent;
    description: string;
    status: boolean;
}