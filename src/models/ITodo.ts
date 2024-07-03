import { ICalendarEvent } from "./ICalendarEvent";

export interface ITodo{
    id: number | null;
    name: string;
    event: ICalendarEvent;
    description: string;
    status: boolean;
}