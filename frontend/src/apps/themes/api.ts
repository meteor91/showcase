import { http, post, get, put, del } from 'core/http';
import { IPaginatedData } from 'core/models';
import { defaultPageSize } from 'core/consts';
import { IQuestion, ITheme } from './models';

export const getQuestionsList = (page: number = 0) => http.get<IPaginatedData<IQuestion>>(
    `/questions/questions/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const getThemesList = (page: number = 0) => http.get<IPaginatedData<ITheme>>(
    `/questions/themes/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

export const createTheme = (theme: ITheme) => post<ITheme>('/questions/themes/', theme);

export const deleteTheme = (theme: ITheme) => del<ITheme>(`/questions/themes/${theme.id}/`,);

export const editTheme = (theme: ITheme, id: string) => put<ITheme>(`/questions/themes/${id}/`, theme);

//TODO: разобраться с типизацией
export const getTheme = (id: any) => get<ITheme>(`/questions/themes/${id}/`);