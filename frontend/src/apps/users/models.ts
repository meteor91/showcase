export interface ILoggedUser {
    username: string;
}

export interface IUserState {
    user: ILoggedUser;
}

export interface ILoginForm {
    username: string;
    password: string;
}
