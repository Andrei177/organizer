export interface ICalendarEvent{
    id: string | number | null,
    title: string,
    startDate: string | number | readonly string[] | undefined,
    endDate: string | number | readonly string[] | undefined,
    fullDay: boolean,
}