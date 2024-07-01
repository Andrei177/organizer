export interface ICalendarEvent{
    id: number,
    title: string,
    startDate: string | number | readonly string[] | undefined,
    endDate: string | number | readonly string[] | undefined,
    fullDay: boolean,
}