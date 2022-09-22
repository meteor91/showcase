import { http } from 'core/http';
import { IPaginatedData } from 'core/models';
import { defaultPageSize } from 'core/consts';
import { IQuestion, ITheme } from './models';

export const getQuestionsList = () => http.get<IPaginatedData<IQuestion>>("/questions/questions/");

export const getThemesList = (page: number = 0) => http.get<IPaginatedData<IQuestion>>(
    `/questions/themes/?limit=${defaultPageSize}${page ? `&offset=${defaultPageSize*(page-1)}`: ''}`
);

//TODO: разобраться с типизацией
export const createTheme = (theme: any) => http.post<IPaginatedData<IQuestion>>("/questions/themes/", theme);

export const getTheme = (id: any) => http.get<ITheme>(`/questions/themes/${id}/`);