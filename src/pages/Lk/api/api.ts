import { $host } from "../../../api/api";
import { IUser } from "../../../models/IUser";

export const getUserInfo = async () => {
  const { data } = await $host.get<IUser[]>("/user");
  return data[0];
};

export const saveUserInfo = async (userInfo: IUser) => {
  try {
    const { data } = await $host.put<IUser>(`/user/${userInfo.id}`, {
      ...userInfo,
    });
    return data;
  } catch {
    const { data } = await $host.post<IUser>("/user", { ...userInfo });
    return data;
  }
};
