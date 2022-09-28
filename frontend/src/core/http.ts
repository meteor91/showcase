import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { notification } from 'antd';
import { adaptFromApi, adaptToApi } from './utils';

export const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.response.use(
    (response: AxiosResponse) => {
        //TODO: нежелательная мутация
        response.data = adaptFromApi(response.data);
        // debugger
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            error.response.data = adaptFromApi(error.response.data);
        }
        return Promise.reject(error);
    }
);

http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        //TODO: нежелательная мутация
        config.data = adaptToApi(config.data);
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

/**
 * POST-запрос, возвращает ответ с бекенда.
 * (Убрал метаданные Axios, они избыточны для работы на уровне бизнес логики)
 * 
 * @param url URL реста.
 * @param data Тело запроса.
 */
export const post = <T>(url: string, data: T): Promise<T> => {
    return http.post(url, data).then(
        (result: AxiosResponse<T>) => result.data,
        (result: AxiosError<T>) => {
            if (result.response) {
                return Promise.reject(result.response.data);
            } else {
                notification.open({message: 'Что то пошло не так, попробуйте еще раз'});
                return Promise.reject([]);
            }
        }
    );
}
