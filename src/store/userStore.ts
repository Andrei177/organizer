import { createEvent, createStore } from "effector";

interface IUserStore{
    avatar: File | null
}

export const setAvatar = createEvent<File>();

export const $userStore = createStore<IUserStore>({
    avatar: null
})
.on(setAvatar, (state, newAvatar) => ({...state, avatar: newAvatar}))

