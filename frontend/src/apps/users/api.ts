import { post, get } from 'core/http';
import { ILoggedUser, ILoginForm, IUserState } from './models';

export const loginUser = (loginForm: ILoginForm) => post<ILoginForm, IUserState>(
    '/users/login/',
    loginForm,
);

export const getCurrentUser = () => get<ILoggedUser>('/users/current-user/');

export const logoutUser = () => post('/users/logout/');