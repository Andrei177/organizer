import { ICalendarEvent } from "../../../models/ICalendarEvent";
import { compareDatesWithoutTime } from "./compareDates";
import styles from "../../../assets/styles/Calendar.module.css"

export function renderTile(
  date: Date, 
  view: string, 
  events: ICalendarEvent[], 
  showInfoEvent?: (event: ICalendarEvent) => void, 
  setIsEditing?: (bool: boolean) => void
): JSX.Element;

export function renderTile(
  date: Date, 
  view: string, 
  events: ICalendarEvent[], 
  mini: boolean
): JSX.Element;

export function renderTile(
  date: Date, 
  view: string, 
  events: ICalendarEvent[], 
  showInfoEventOrMini?: ((event: ICalendarEvent) => void) | boolean, 
  setIsEditing?: (bool: boolean) => void, 
  mini: boolean = false
): JSX.Element {
  if (typeof showInfoEventOrMini === 'boolean') {
    mini = showInfoEventOrMini;
  }
  
  if (view === 'month') {
    const arrEvents: ICalendarEvent[] = events.filter(event => {
      const startDate = new Date(String(event.startDate));
      const endDate = new Date(String(event.endDate));
      return ((date >= startDate || compareDatesWithoutTime(startDate, date)) && date <= endDate);
    });

    return (
      <ul>
        {arrEvents.map(event => {
          if (event.id !== null) {
            const idRGB = +event.id;
            const red = 128 + (idRGB % 128);
            const green = 128 + ((idRGB + 42) % 128);
            const blue = 128 + ((idRGB + 84) % 128);
            return (
              <li
                onClick={() => {
                  if (typeof showInfoEventOrMini === 'function') {
                    showInfoEventOrMini(event);
                  }
                  if (setIsEditing) {
                    setIsEditing(true);
                  }
                }}
                key={event.id}
                className={styles['calendar-tile-content']}
                style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
              >
                {mini ? " ! " : event.title.length > 10 ? event.title.slice(0, 9) + "..." : event.title}
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  }
  
  return <></>;
}