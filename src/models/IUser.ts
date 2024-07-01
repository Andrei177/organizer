export interface IUser{
    avatar: File | null,
    surname: string,
    name: string,
    patronymic: string,
    birthday: string | number | readonly string[] | undefined,
    age: string | number | readonly string[] | undefined
}