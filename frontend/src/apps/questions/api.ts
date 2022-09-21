import { http } from 'core/http';
import { IPaginatedData } from 'core/models';
import { IQuestion } from './models';

export const getQuestionsList = () => http.get<IPaginatedData<IQuestion>>("/questions/questions/");

export const getThemesList = () => http.get<IPaginatedData<IQuestion>>("/questions/themes/");