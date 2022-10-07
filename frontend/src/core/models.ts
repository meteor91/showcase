import { IUserState } from 'apps/users/models';

/**
 * Структура пагинированного списка.
 *
 * @prop total Общее количество элементов.
 * @prop offset Отступ от начала.
 * @prop result Текущий срез элементов.
 */
export interface IPaginatedData<T> {
    total: number;
    offset: number;
    results: T[];
}

export type ServerValidateErrors<T> = {
    [K in keyof Partial<T>]: string[];
} & {
    nonFieldErrors?: string[];
}

export interface IPath {
    path: string;
    name: string;
}

export type TRoutePaths<T extends string> = {
    [key in T]: IPath;
}