import { createEffect, createEvent, createStore } from "effector";
import { IUser } from "../../../models/IUser";
import { getUserInfo, saveUserInfo } from "../api/api";

export const setSurname = createEvent<string>();
export const setName = createEvent<string>();
export const setPatronymic = createEvent<string>();
export const setDate = createEvent<string>();
export const setAge = createEvent<string | number | readonly string[] | undefined>();

export const fetchUserInfo = createEffect<void, IUser>(getUserInfo)
export const saveUserInfoServer = createEffect<IUser, IUser>(saveUserInfo)

export const $userStore = createStore<IUser>({
    id: "1",
    surname: "",
    name: "",
    patronymic: "",
    birthday: "",
    age: ""
})
.on(setSurname, (state, newSurname) => ({...state, surname: newSurname}))
.on(setName, (state, newName) => ({...state, name: newName}))
.on(setPatronymic, (state, newPatronymic) => ({...state, patronymic: newPatronymic}))
.on(setDate, (state, newBirthday) => ({...state, birthday: newBirthday}))
.on(setAge, (state, newAge) => ({...state, age: newAge}))
.on(fetchUserInfo.doneData, (state, newUserInfo) => ({...state, ...newUserInfo}))
.on(saveUserInfoServer.doneData, (state, newUserInfo) => ({...state, ...newUserInfo}))