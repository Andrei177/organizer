import { createEvent, createStore } from "effector";
import { IUser } from "../models/IUser";

export const setAvatar = createEvent<File>();
export const setSurname = createEvent<string>();
export const setName = createEvent<string>();
export const setPatronymic = createEvent<string>();
export const setDate = createEvent<string>();
export const setAge = createEvent<string | number | readonly string[] | undefined>();

export const $userStore = createStore<IUser>({
    avatar: null,
    surname: "",
    name: "",
    patronymic: "",
    birthday: "",
    age: ""
})
.on(setAvatar, (state, newAvatar) => ({...state, avatar: newAvatar}))
.on(setSurname, (state, newSurname) => ({...state, surname: newSurname}))
.on(setName, (state, newName) => ({...state, name: newName}))
.on(setPatronymic, (state, newPatronymic) => ({...state, patronymic: newPatronymic}))
.on(setDate, (state, newBirthday) => ({...state, birthday: newBirthday}))
.on(setAge, (state, newAge) => ({...state, age: newAge}))