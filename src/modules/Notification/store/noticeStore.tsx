import { createEvent, createStore } from "effector";

interface INoticeStore{
    showNotice: boolean;
    noticeMessage: string;
}

export const setNoticeMessage = createEvent<string>();
export const setShowNotice = createEvent<boolean>(); 

export const $noticeStore = createStore<INoticeStore>({
    showNotice: false,
    noticeMessage: ""
})
.on(setNoticeMessage, (state, message) => ({...state, noticeMessage: message}))
.on(setShowNotice, (state, bool) => ({...state, showNotice: bool}))