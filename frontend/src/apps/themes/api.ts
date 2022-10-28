import { http, post, get, put, del } from 'core/http';
import { IPaginatedData } from 'core/models';
import { defaultPageSize } from 'core/consts';
import { EThemeStatus, IQuestion, ITheme } from './models';

export const getQuestionsList = (page: number = 0) => http.get<IPaginatedData<IQuestion>>(
    `/themes/questions/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const getThemesList = (page: number = 0) => http.get<IPaginatedData<ITheme>>(
    `/themes/themes/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const createTheme = (theme: ITheme) => post<ITheme>('/themes/themes/', theme);

export const deleteTheme = (theme: ITheme) => del<ITheme>(`/themes/themes/${theme.id}/`,);

export const editTheme = (theme: ITheme, id: string) => put<ITheme>(`/themes/themes/${id}/`, theme);

//TODO: разобраться с типизацией
export const getTheme = (id: any) => get<ITheme>(`/themes/themes/${id}/`);

export const changeThemeStatus = (id: string, nextStatus: EThemeStatus) => post(`/themes/change-theme-status/${id}/${nextStatus}/`, {nextStatus});
