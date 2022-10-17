import { post, get } from 'core/http';
import { IUser, ILoginForm } from 'apps/users/models';

export const loginUser = (loginForm: ILoginForm) => post<ILoginForm, IUser>(
    '/users/login/',
    loginForm,
);

export const getCurrentUser = () => get<IUser>('/users/current-user/');

export const logoutUser = () => post('/users/logout/');