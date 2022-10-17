import { post, get, put, del } from 'core/http';
import { IPaginatedData } from 'core/models';
import { defaultPageSize } from 'core/consts';
import { IUser } from './models';

const apiPath = '/users/users';

export const getUsersList = (page: number = 0) => get<IPaginatedData<IUser>>(
    `${apiPath}/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const createUser = (user: IUser) => post<IUser>(apiPath, user);

export const deleteUser = (user: IUser) => del<IUser>(`${apiPath}/${user.id}/`,);

export const editUser = (user: IUser, id: string) => put<IUser>(`${apiPath}/${id}/`, user);

export const getUser = (id: any) => get<IUser>(`${apiPath}/${id}/`);
