import axios from "axios";
import { adaptFromApi, adaptToApi } from './utils';

export const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.response.use(function (response) {
    //TODO: нежелательная мутация
    response.data = adaptFromApi(response.data)
    return response
}, function (error) {
    return Promise.reject(error);
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
    //TODO: нежелательная мутация
    config.data = adaptToApi(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});
