import { QueryStatus } from 'react-query';

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

//TODO rename fields
export interface IPath {
    path: string;
    name: string;
    asyncLabel?: boolean;
}

export type TRoutePaths<T extends string> = {
    [key in T]: IPath;
}

export type TLoadingStatus = QueryStatus;

export enum ELoadingStatus {
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}

export interface IServerError {
    errorCode: string;
    detail: string;
}
