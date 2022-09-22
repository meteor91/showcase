import { http } from 'core/http';
import { IPaginatedData } from 'core/models';
import { IQuestion, ITheme } from './models';

export const getQuestionsList = () => http.get<IPaginatedData<IQuestion>>("/questions/questions/");

export const getThemesList = (path?: string) => http.get<IPaginatedData<IQuestion>>(path ? path : "/questions/themes/");

//TODO: разобраться с типизацией
export const createTheme = (theme: any) => http.post<IPaginatedData<IQuestion>>("/questions/themes/", theme);

export const getTheme = (id: any) => http.get<ITheme>(`/questions/themes/${id}/`);