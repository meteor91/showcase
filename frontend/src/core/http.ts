import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { adaptFromApi, adaptToApi } from './utils';
import { store } from './store';
import { clearAuthorized } from './auth/slices';

export const http = axios.create({
    baseURL: "/api",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
});

const serverNotRespondingErrorNotification = 'Что то пошло не так, попробуйте еще раз';

http.interceptors.response.use(
    (response: AxiosResponse) => {
        //TODO: нежелательная мутация
        response.data = adaptFromApi(response.data);
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            store.dispatch(clearAuthorized());
        }

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
 * @param [data] Тело запроса.
 */
export const post = <T, R = T>(url: string, data?: T): Promise<R> => {
    return http.post(url, data).then(
        (result: AxiosResponse<R>) => result.data,
        (result: AxiosError<R>) => {
            if (result.response) {
                return Promise.reject(result.response.data);
            } else {
                notification.open({message: serverNotRespondingErrorNotification});
                return Promise.reject([]);
            }
        }
    );
};

export const put = <T, R = T>(url: string, data?: T): Promise<R> => {
    return http.put(url, data).then(
        (result: AxiosResponse<R>) => result.data,
        (result: AxiosError<R>) => {
            if (result.response) {
                return Promise.reject(result.response.data);
            } else {
                notification.open({message: serverNotRespondingErrorNotification});
                return Promise.reject([]);
            }
        }
    );
};

export const get = <R>(url: string): Promise<R> => {
    return http.get(url).then(
        (result: AxiosResponse<R>) => result.data,
        (result: AxiosError<R>) => {
            if (result.response) {
                return Promise.reject(result.response.data);
            } else {
                notification.open({message: serverNotRespondingErrorNotification});
                return Promise.reject([]);
            }
        }
    )
};

/**
 * DELETE-запрос, возвращает ответ с бекенда.
 * (Убрал метаданные Axios, они избыточны для работы на уровне бизнес логики)
 * 
 * @param url URL реста.
 */
 export const del = <T, R = T>(url: string): Promise<R> => {
    return http.delete(url).then(
        (result: AxiosResponse<R>) => result.data,
        (result: AxiosError<R>) => {
            if (result.response) {
                return Promise.reject(result.response.data);
            } else {
                notification.open({message: serverNotRespondingErrorNotification});
                return Promise.reject([]);
            }
        }
    );
};