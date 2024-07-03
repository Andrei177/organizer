import { ICalendarEvent } from "../models/ICalendarEvent";
import { compareDatesWithoutTime } from "./compareDates";

export const renderTile = (
  date: Date, 
  view: string, 
  events: ICalendarEvent[], 
  showInfoEvent: (event: ICalendarEvent) => void,
  setIsEditing: (bool: boolean) => void
) => {
  if (view === 'month') {
    const arrEvents: ICalendarEvent[] = events.filter(event => {
      const startDate = new Date(String(event.startDate));
      const endDate = new Date(String(event.endDate));
      return ((date >= startDate || compareDatesWithoutTime(startDate, date)) && date <= endDate)
    })
    return <ul>
      {
        arrEvents.map(event => {
          if (event.id !== null) {
            const idRGB = event.id;
            const red = 128 + (idRGB % 128);
            const green = 128 + ((idRGB + 42) % 128);
            const blue = 128 + ((idRGB + 84) % 128);
            return <li
              onClick={() => {
                showInfoEvent(event)
                setIsEditing(true);
              }}
              key={event.id}
              style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}>
              {event.title}
            </li>
          }
        })
      }
    </ul>
  }
}