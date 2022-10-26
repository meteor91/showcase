export interface IUser {
    username: string;
    id: string;
    role: string;
}

export interface ILoginForm {
    username: string;
    password: string;
}

export interface IUserDetails extends IUser {
    themesCount: {
        accepted: number;
        onModeration: number;
        declined: number;
    }
}
