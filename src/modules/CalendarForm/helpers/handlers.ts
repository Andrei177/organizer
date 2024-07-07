import { closeModal } from "../../../components/Modal/helpers/closeModal";
import { ICalendarEvent } from "../../../models/ICalendarEvent";
import { ICalendarEventStore } from "../store/calendarEventStore";

interface IArgSaveFn {
  calendarEventStore: ICalendarEventStore;
  onUpdateEventServer: (event: ICalendarEvent) => Promise<ICalendarEvent>;
  onSetNoticeMessage: (msg: string) => void;
  onSetShowNotice: (bool: boolean) => void;
  onAddEventServer: (event: ICalendarEvent) => Promise<ICalendarEvent>;
  onSetShowCalendarForm: (bool: boolean) => void;
  onSetIsEditing: (bool: boolean) => void;
  onSetEmptyEvent: () => void;
}
interface IArgRemoveFn {
  calendarEventStore: ICalendarEventStore;
  onRemoveEventServer: (event: ICalendarEvent) => Promise<ICalendarEvent>;
  onSetNoticeMessage: (msg: string) => void;
  onSetShowNotice: (bool: boolean) => void;
  onSetShowCalendarForm: (bool: boolean) => void;
  onSetIsEditing: (bool: boolean) => void;
  onSetEmptyEvent: () => void;
}

export const saveEvent = ({
  calendarEventStore,
  onUpdateEventServer,
  onSetNoticeMessage,
  onSetShowNotice,
  onAddEventServer,
  onSetShowCalendarForm,
  onSetIsEditing,
  onSetEmptyEvent,
}: IArgSaveFn) => {
  onSetShowCalendarForm(false);
  if (calendarEventStore.isEditing) {
    //onUpdateEvent(calendarEventStore.event);
    //onSetNoticeMessage("Событие успешно отредактировано")
    //onSetShowNotice(true)
    onUpdateEventServer(calendarEventStore.event)
      .then(() => {
        onSetNoticeMessage("Событие успешно отредактировано");
      })
      .catch(() => {
        onSetNoticeMessage("При редактировании произошла ошибка");
      })
      .finally(() => onSetShowNotice(true));

    onSetIsEditing(false);
  } else {
    const currentEvent: ICalendarEvent = {
      id: String(Date.now()),
      title: calendarEventStore.event.title,
      startDate: calendarEventStore.event.startDate,
      endDate: calendarEventStore.event.endDate,
      fullDay: calendarEventStore.event.fullDay,
    };
    //onAddEvent(currentEvent); раскомментировать если делать запускать без json-server, а строки ниже закомментировать
    //onSetNoticeMessage("Событие успешно создано")
    //onSetShowNotice(true)
    onAddEventServer(currentEvent)
      .then(() => {
        onSetNoticeMessage("Событие успешно создано");
      })
      .catch(() => {
        onSetNoticeMessage("При создании произошла ошибка");
      })
      .finally(() => onSetShowNotice(true));
  }
  onSetEmptyEvent();
};

export const handlerRemoveEvent = ({
  calendarEventStore,
  onRemoveEventServer,
  onSetNoticeMessage,
  onSetShowNotice,
  onSetShowCalendarForm,
  onSetIsEditing,
  onSetEmptyEvent,
}: IArgRemoveFn) => {
  // onSetNoticeMessage("Событие успешно удалено")
  // onSetShowNotice(true)
  // onRemoveEvent(calendarEventStore.event)
  onRemoveEventServer(calendarEventStore.event)
    .then(() => {
      onSetNoticeMessage("Событие успешно удалено");
    })
    .catch(() => {
      onSetNoticeMessage("При удалении произошла ошибка");
    })
    .finally(() => onSetShowNotice(true));
  closeModal(onSetShowCalendarForm, onSetIsEditing, onSetEmptyEvent);
};