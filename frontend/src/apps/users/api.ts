import { post, get, put, del } from 'core/http';
import { IPaginatedData } from 'core/models';
import { defaultPageSize } from 'core/consts';
import { IUser, IUserDetails } from './models';
import { ITheme } from 'apps/themes/models';

const apiPath = '/users';

export const getUsersList = (page: number = 0) => get<IPaginatedData<IUser>>(
    `${apiPath}/users/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const createUser = (user: IUser) => post<IUser>(`${apiPath}/users/`, user);

export const deleteUser = (user: IUser) => del<IUser>(`${apiPath}/users/${user.id}/`,);

export const editUser = (user: IUser, id: string) => put<IUser>(`${apiPath}/users/${id}/`, user);

export const getUser = (id: any) => get<IUserDetails>(`${apiPath}/users/${id}/`);

export const getUserLastThemes = (userId: string) => get<ITheme[]>(
    `${apiPath}/user-last-themes/${userId}/`
);
