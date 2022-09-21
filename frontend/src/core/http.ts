import axios from "axios";
import { adaptFromApi, adaptToApi } from './utils';

export const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.response.use(function (response) {
    //TODO нужно настроить
    return adaptFromApi(response);
}, function (error) {
    return Promise.reject(error);
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
